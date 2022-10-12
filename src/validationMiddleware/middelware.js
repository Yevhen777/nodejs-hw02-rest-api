const Joi = require("joi");

const { RequesError } = require("../../helpers/index");

module.exports = {
  bodyValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email,
      phone: Joi.number(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw RequesError(400, error.message);
    }

    next(error);
  },
};
