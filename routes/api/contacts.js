const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/RequestError");
const {
  getContacts,
  getContactsById,
  addContacts,
  apdateContacts,
  removeContacts,
  updateStatusContact,
} = require("../../controllers/controllers");

const {
  schemaContact,
  schemaContactFavorite,
} = require("../../models/contacts");

const validationBody = require("../../validationMiddleware/middleware");

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getContactsById));
router.post("/", validationBody(schemaContact), asyncWrapper(addContacts));
router.put(
  "/:contactId",
  validationBody(schemaContact),
  asyncWrapper(apdateContacts)
);
router.patch(
  "/:contactId/favorite",
  validationBody(schemaContactFavorite),
  asyncWrapper(updateStatusContact)
);
router.delete("/:contactId", asyncWrapper(removeContacts));

module.exports = router;
