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

const { bodyValidation } = require("../../validationMiddleware/middleware");

const { updateFavoriteSchema } = require("../../helpers/handleSaveError");

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getContactsById));
router.post("/", bodyValidation, asyncWrapper(addContacts));
router.put("/:contactId", bodyValidation, asyncWrapper(apdateContacts));
router.patch(
  "/:contactId/favorite",
  updateFavoriteSchema,
  asyncWrapper(updateStatusContact)
);
router.delete("/:contactId", asyncWrapper(removeContacts));

module.exports = router;
