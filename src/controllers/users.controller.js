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
      const result = await db.query(
        `
        SELECT USERS.ID AS "id",
	              USERS.NAME AS "name",
	              SUM("viewCount") AS "visitCount",
	              ARRAY
	              (SELECT JSON_BUILD_OBJECT('id',
							                            URLS.ID,
							                            'shortUrl',
							                            URLS."shortUrl",
							                            'url',
							                            URLS.URL,
							                            'visitCount',
							                            URLS."viewCount")
		                    FROM URLS
		                    JOIN USERS ON URLS."userId" = USERS.ID
		                    WHERE "userId" = $1) AS "shortenedUrls"
        FROM URLS
        JOIN USERS ON URLS."userId" = USERS.ID
        WHERE "userId" = $2
        GROUP BY USERS.ID;
        `,
        [userId, userId]
      );
      console.log(result);
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
    const result = await db.query(`
    SELECT users.id, users.name,
    COUNT("shortUrl") AS "linksCount",
    SUM("viewCount") AS "viewCount"
    FROM urls
    JOIN users ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "viewCount" DESC
    LIMIT 10
    `);
    return res.status(200).send(result.rows);
  }catch (error) {
    return res.status(500).send(error.message);
  }
}
