const { User } = require("../models/users");

const logoute = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  await res.status(204);
};

module.exports = logoute;
