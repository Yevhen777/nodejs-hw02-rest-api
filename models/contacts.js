const { Schema, model } = require("mongoose");
const Joi = require("joi");

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

const Contact = model("contact", contactSchema);

const schemaContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.number(),
  favorite: Joi.boolean(),
});

const schemaContactFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { Contact, schemaContact, schemaContactFavorite };
