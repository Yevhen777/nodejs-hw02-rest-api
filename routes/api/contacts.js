const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/RequestError");
const {
  getContacts,
  getContactsById,
  addContacts,
  apdateContacts,
  removeContacts,
} = require("../../controllers/controllers");

const { bodyValidation } = require("../../validationMiddleware/middelware");

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getContactsById));
router.post("/", bodyValidation, asyncWrapper(addContacts));
router.put("/:contactId", bodyValidation, asyncWrapper(apdateContacts));
router.delete("/:contactId", asyncWrapper(removeContacts));

module.exports = router;
