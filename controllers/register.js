const { User } = require("../models/users");
const bcrypt = require("bcryptjs");
const { RequestError } = require("../helpers/RequestError");
const sendEmail = require("../helpers/sendEmail");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const addNewUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    text: `Click me for verify email ${BASE_URL}/api/users/verify/${user.verificationToken}</a>`,
    html: `<a target="_blank" href=${BASE_URL}/api/users/verify/${verificationToken}>Click me for verify email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    email: addNewUser.email,
    password: addNewUser.password,
    subscription: addNewUser.subscription,
  });
};

module.exports = register;
