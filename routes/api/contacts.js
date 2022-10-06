const express = require("express");
const Joi = require("joi");
const router = express.Router();
const contacts = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ca", "org", "uk"] },
    })
    .required(),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: "missing required name field",
      });
    }
    const addContacts = await contacts.addContact(req.body);
    res.status(201).json(addContacts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: "missing fields",
      });
    }
    const { contactId } = req.params;
    const apdateContact = await contacts.updateContact(contactId, req.body);
    if (!apdateContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(apdateContact);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContacts = await contacts.removeContact(contactId);

    if (!deleteContacts) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
