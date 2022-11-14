const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { boolean } = require("joi");

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userShema);

const schemaRegister = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});
const schemaLogin = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
});

const schemaVerify = Joi.object({
  email: Joi.string().email().required(),
});
module.exports = { User, schemaRegister, schemaLogin, schemaVerify };
