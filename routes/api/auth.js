const express = require("express");
const router = express.Router();
const validationBody = require("../../validationMiddleware/middleware");
const { asyncWrapper } = require("../../helpers/RequestError");
const { schemaRegister, schemaLogin } = require("../../models/users");
const register = require("../../controllers/register");
const login = require("../../controllers/login");
const authenticate = require("../../validationMiddleware/authenticate");
const getCurrent = require("../../controllers/getCurrent");
const logout = require("../../controllers/logout");
const { upload } = require("../../validationMiddleware/upload");

router.post("/signup", validationBody(schemaRegister), asyncWrapper(register));
router.post("/login", validationBody(schemaLogin), asyncWrapper(login));
router.get("/current", authenticate, asyncWrapper(getCurrent));
router.get("/logout", authenticate, asyncWrapper(logout));
router.patch("/avatars", authenticate, upload.single("avatar"));

module.exports = router;
