const Joi = require("joi");

module.exports = {
  postValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ca", "org", "uk"] },
        })
        .required(),
      phone: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: "missing required field",
      });
    }
    next();
  },

  putValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ca", "org", "uk"] },
        })
        .required(),
      phone: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: "missing fields",
      });
    }
    next();
  },
};
