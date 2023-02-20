import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function postNewUser(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);
    await db.query(`INSERT INTO users (name, email, password) VALUES($1, $2, $3);`, [
      name,
      email,
      passwordHash,
    ]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getUserInfo(req, res) {
  try {
    const userId = res.locals.user.rows[0].id;
    const existsURL = await db.query(`SELECT * FROM urls WHERE "userId" = $1;`, [userId]);

    if (existsURL.rows[0] !== undefined) {
      await db.query(
        `SELECT users.id AS "id", users.name AS "name", SUM("viewCount") as "visitCount", ARRAY(SELECT JSON_BUILD_OBJECT('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."viewCount")
            FROM urls JOIN users ON urls."userId" = users.id WHERE "userId" = $1) AS "shortenedUrls" FROM urls JOIN users ON urls."userId" = users.id WHERE "userId" = $2 GROUP BY users.id;`,
        [userId, userId]
      );
      return res.status(200).send(result.rows[0]);
    } else {
      const userInfo = await db.query(`SELECT * FROM users WHERE id = $1;`, [userId]);
      const userData = {
        id: userId,
        name: userInfo.rows[0].name,
        visitCount: 0,
        shortenedUrls: [],
      };
      return res.status(200).send(userData);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getRanking(req, res) {
  try {
    await db.query(
      `SELECT users.id, users.name, COUNT("userId") AS "linksCount", COALESCE(SUM("viewCount"), 0) AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC NULLS LAST;`
    );
    return res.status(200).send(result.rows.slice(0, 10));
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
