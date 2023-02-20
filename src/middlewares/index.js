export function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    next();
    if (error) {
      const message = error.details[0].message;
      res.status(422).send(message);
    }
  };
}
