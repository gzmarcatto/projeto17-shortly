import Joi from "joi";

export const baseSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^\d+$/).min(10).max(11).required(),
  cpf: Joi.string().pattern(/^\d+$/).length(11).required(),
  birthday: Joi.string().required().pattern(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/),
});