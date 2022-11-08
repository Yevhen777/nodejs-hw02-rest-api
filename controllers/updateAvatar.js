const path = require("path");

const { User } = require("../models/users");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const fileName = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, fileName);

  const avatarURL = path.join("avatars", fileName);

  Jimp.read(tempUpload, (err, chocolate) => {
    if (err) throw err;
    return chocolate.resize(250, 250).write(resultUpload);
  });

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
