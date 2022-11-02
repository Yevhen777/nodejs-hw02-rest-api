const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
// const fs = require("fs/promises");

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

router.post("/avatar", upload.single("avatar"), async (req, res) => {
  // const { path: tempUpLoad, originalname } = req.file;
  // await fs.rename("./temp/cover.jpg", "./public/contact/cover.jpg");
  // console.log(req.file);
  console.log(req.body);
  console.log(req.file);
});

router.get("/avatar", async (req, res) => {
  res.json(contacts);
});

module.exports = router;
