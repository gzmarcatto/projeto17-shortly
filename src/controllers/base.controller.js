import { db } from "../database/database.connection.js";

export async function baseFunction(req, res) {
  try {
    const info = req.body;
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}