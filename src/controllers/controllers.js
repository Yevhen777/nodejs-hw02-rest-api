const contacts = require("../../models/contacts");

const getContacts = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
const getContactsById = async (req, res, next) => {
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
};

const addContacts = async (req, res, next) => {
  try {
    const addContacts = await contacts.addContact(req.body);
    res.status(201).json(addContacts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const apdateContacts = async (req, res, next) => {
  try {
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
};

const removeContacts = async (req, res, next) => {
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
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  apdateContacts,
  removeContacts,
};
