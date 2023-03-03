import { db } from "../database/database.connection.js";
import { customAlphabet } from "nanoid";

export async function postUrl(req, res) {
  try {
    const url = req.body.url;
    const { authorization: bearerToken } = req.headers;
    const token = bearerToken.slice(7);

    const getUser = await db.query(`SELECT "userId" FROM sessions WHERE token = $1;`, [
      token,
    ]);
    const userId = getUser.rows[0].userId;

    const nanoid = customAlphabet("1234567890abcdef", 10);
    let shortUrl = nanoid();

    await db.query(
      `INSERT INTO urls ("shortUrl", url, "userId", "viewCount") VALUES($1, $2, $3, $4);`,
      [shortUrl, url, userId, 0]
    );
    const id = await db.query(`SELECT id FROM urls WHERE "shortUrl" = $1`, [shortUrl])
    return res.status(201).send({id: id.rows[0].id, shortUrl: shortUrl });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getUrl(req, res) {
  try {
    const id = req.params.id;
    const existsId = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);

    if (existsId.rows[0] === undefined) return res.status(404).send("URL not found.");
    console.log(existsId.rows[0])
    const response = {
      id: existsId.rows[0].id,
      shortUrl: existsId.rows[0].shortUrl,
      url: existsId.rows[0].url,
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function openUrl(req, res) {
  try {
    const shortUrl = req.params.shortUrl;

    const existsShort = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
      shortUrl,
    ]);
    if (existsShort.rows[0] === undefined) return res.status(404).send("URL not found.");

    const viewCount = existsShort.rows[0].viewCount;
    const url = existsShort.rows[0].url;

    await db.query(`UPDATE urls SET "viewCount"=$1 WHERE "shortUrl"=$2;`, [
      viewCount + 1,
      shortUrl,
    ]);
    return res.redirect(302, url);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function deleteURL(req, res) {
  try {
    const id = req.params.id;
    await db.query(`DELETE FROM urls WHERE id = $1`, [id]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
