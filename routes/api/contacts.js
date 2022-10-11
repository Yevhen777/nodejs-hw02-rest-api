const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactsById,
  addContacts,
  apdateContacts,
  removeContacts,
} = require("../../src/controllers/controllers");

const {
  postValidation,
  putValidation,
} = require("../../src/validationMiddleware/middelware");

router.get("/", getContacts);
router.get("/:contactId", getContactsById);
router.post("/", postValidation, addContacts);
router.put("/:contactId", putValidation, apdateContacts);
router.delete("/:contactId", removeContacts);

module.exports = router;
