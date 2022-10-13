const contacts = require("../models/contacts");
const { RequesError } = require("../helpers/RequestError");

const getContacts = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};
const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContacts = async (req, res, next) => {
  const addContacts = await contacts.addContact(req.body);
  res.status(201).json(addContacts);
};

const apdateContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const apdateContact = await contacts.updateContact(contactId, req.body);
  if (!apdateContact) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json(apdateContact);
};

const removeContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContacts = await contacts.removeContact(contactId);
  if (!deleteContacts) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  apdateContacts,
  removeContacts,
};
