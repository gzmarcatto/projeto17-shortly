import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export async function signinValidation(req, res, next) {
  const { email: email, password: password } = req.body;

  const loginSchema = Joi.object({
    email: Joi.string().email().required().trim().min(1),
    password: Joi.string().required().trim().min(1),
  });

  const validation = loginSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return res.status(422).send(errors);
  }

  const existUser = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

  if (existUser.rows[0] === undefined) {
    return res.status(401).send("Wrong email address or user does not exist. Please try again.");
  }

  const checkPassword = bcrypt.compareSync(password, existUser.rows[0].password);

  if (!checkPassword) {
    return res.status(401).send("Wrong password. Please try again.");
  }

  const existSession = await db.query(`SELECT * FROM sessions WHERE "userId"=$1;`, [
    existUser.rows[0].id,
  ]);

  if (existSession.rows[0] !== undefined) {
    await db.query(`DELETE FROM sessions WHERE "userId"=$1;`, [existUser.rows[0].id]);
  }

  next();
}
