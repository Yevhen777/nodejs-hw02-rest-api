const { User } = require("../models/users");
const bcrypt = require("bcryptjs");
const { RequestError } = require("../helpers/RequestError");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const addNewUser = await User.create({ email, password: hashPassword });
  res.status(201).json({
    email: addNewUser.email,
    password: addNewUser.password,
  });
};

module.exports = register;
