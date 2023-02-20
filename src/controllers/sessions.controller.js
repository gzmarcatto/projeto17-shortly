import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";

export async function postLogin(req, res) {
  try {
    const email = req.body.email;
    const token = uuid();
    const userId = await db.query(`SELECT id FROM users WHERE email = $1`, [email]);

    await db.query(`INSERT INTO sessions ("userId", token) VALUES($1, $2);`, [
      userId.rows[0].id,
      token,
    ]);
    return res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
