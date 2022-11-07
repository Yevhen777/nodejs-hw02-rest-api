const path = require("path");

const { User } = require("../models/users");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  console.log(req.file.path);
  const extention = originalname.split(".").pop();
  const fileName = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, originalname);

  Jimp.read(tempUpload, (err, chocolate) => {
    if (err) throw err;
    chocolate.resize(250, 250).write(resultUpload);
  });
  const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
