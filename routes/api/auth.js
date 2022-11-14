const express = require("express");
const router = express.Router();
const validationBody = require("../../validationMiddleware/middleware");
const { asyncWrapper } = require("../../helpers/RequestError");
const {
  schemaRegister,
  schemaLogin,
  schemaVerify,
} = require("../../models/users");
const register = require("../../controllers/register");
const login = require("../../controllers/login");
const authenticate = require("../../validationMiddleware/authenticate");
const getCurrent = require("../../controllers/getCurrent");
const logout = require("../../controllers/logout");
const upload = require("../../validationMiddleware/upload");
const updateAvatar = require("../../controllers/updateAvatar");
const verify = require("../../controllers/verify");
const resendEmail = require("../../controllers/resendEmail");

router.post("/signup", validationBody(schemaRegister), asyncWrapper(register));
router.get("/verify/:verificationToken", asyncWrapper(verify));
router.post("/verify", validationBody(schemaVerify), asyncWrapper(resendEmail));
router.post("/login", validationBody(schemaLogin), asyncWrapper(login));
router.get("/current", authenticate, asyncWrapper(getCurrent));
router.get("/logout", authenticate, asyncWrapper(logout));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  asyncWrapper(updateAvatar)
);

module.exports = router;
