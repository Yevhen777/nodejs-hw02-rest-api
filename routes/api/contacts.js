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
const authenticate = require("../../validationMiddleware/authenticate");

router.get("/", authenticate, asyncWrapper(getContacts));
router.get("/:contactId", authenticate, asyncWrapper(getContactsById));
router.post(
  "/",
  authenticate,
  validationBody(schemaContact),
  asyncWrapper(addContacts)
);
router.put(
  "/:contactId",
  authenticate,
  validationBody(schemaContact),
  asyncWrapper(apdateContacts)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  validationBody(schemaContactFavorite),
  asyncWrapper(updateStatusContact)
);
router.delete("/:contactId", asyncWrapper(removeContacts));

module.exports = router;
