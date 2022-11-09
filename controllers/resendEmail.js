const { User } = require("../models/users");
const { RequestError, sendEmail } = require("../helpers/RequestError");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404);
  }
  const mail = {
    to: email,
    subject: "Verify email",
    text: `Click me for verify email ${BASE_URL}/api/users/verify/${user.verificationToken}</a>`,
    html: `<a target="_blank" href=${BASE_URL}/api/users/verify/${user.verificationToken}>Click me for verify email</a>`,
  };
  await sendEmail(mail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendEmail;
