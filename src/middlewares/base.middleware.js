import { baseSchema } from "../schemas/base.schema.js";

export async function validateSchemaBase(req, res, next) {
  const info = req.body;
  const validate = baseSchema.validate(info);

  if (validate.error) {
    const errors = validate.error.details.map((error) => error.message);
    return res.status(400).send(errors);
  }

  next();
}
