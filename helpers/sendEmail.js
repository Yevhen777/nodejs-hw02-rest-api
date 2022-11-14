const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "Altukhov.E@ukr.net" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
