const { Schema, model } = require("mongoose");
const { handleSaveError } = require("../helpers/handleSaveError");
const Joi = require("joi");
const { RequesError } = require("../helpers/index");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = { Contact };

module.exports = {
  bodyValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string(),
      phone: Joi.number(),
      favorite: Joi.boolean(),
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
