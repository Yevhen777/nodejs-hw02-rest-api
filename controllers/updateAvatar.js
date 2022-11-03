const { User } = require("../models/users");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(id, { avatarURL });

  req.status(200);
};

module.exports = updateAvatar;
