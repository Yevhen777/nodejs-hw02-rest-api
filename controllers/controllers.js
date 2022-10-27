const { Contact } = require("../models/contacts");
const { RequesError } = require("../helpers/index");

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.body;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ owner }, { skip, limit }).populate(
    "owner",
    "email"
  );
  res.status(200).json(allContacts);
};
const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const addContacts = await Contact.create({ ...req.body, owner });
  res.status(201).json(addContacts);
};

const apdateContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const apdateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!apdateContact) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json(apdateContact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const apdateStatus = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(apdateStatus);
  if (!apdateStatus) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json(apdateStatus);
};

const removeContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContacts = await Contact.findByIdAndRemove(contactId);
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
  updateStatusContact,
};
