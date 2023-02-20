import Joi from "joi";

export const headerSchema = Joi.object({
  authorization: Joi.string().required(),
});