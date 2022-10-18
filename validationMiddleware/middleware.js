const Joi = require("joi");

const { RequesError } = require("../helpers/index");

module.exports = {
  bodyValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),

      phone: Joi.number(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw RequesError(400, error.details);
    }

    next(error);
  },
  updateFavoriteSchema: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw RequesError(400, error.details);
    }

    next(error);
  },
};
