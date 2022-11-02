const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contacts = [];

const tempDir = path.join(__dirname, "temp");

const multerConfigue = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfigue,
});

const avatarDir = path.join(__dirname, "public", "avatars");

router.post("/avatar", upload.single("avatar"), async (req, res) => {
  console.log(req.file);
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join(__dirname, "public", "avatars", originalname);
  const newContact = {
    id: nanoid(),
    ...req.dody,
    avatar,
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

router.get("/avatar", async (req, res) => {
  res.json(contacts);
});

module.exports = router;
