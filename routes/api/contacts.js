const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactsById,
  addContacts,
  apdateContacts,
  removeContacts,
} = require("../../src/controllers/controllers");

const { bodyValidation } = require("../../src/validationMiddleware/middelware");

router.get("/", getContacts);
router.get("/:contactId", getContactsById);
router.post("/", bodyValidation, addContacts);
router.put("/:contactId", bodyValidation, apdateContacts);
router.delete("/:contactId", removeContacts);

module.exports = router;
