const fs = require("fs/promises");
const contactsPath = require("path");
const { nanoid } = require("nanoid");
const path = contactsPath.join(__dirname, "contacts.json");

const listContacts = async () => {
  const readFileContacts = await fs.readFile(path, "utf-8");
  console.log(readFileContacts);
  return JSON.parse(readFileContacts);
};

const getContactById = async (id) => {
  const getFileContacts = await listContacts();
  const contactId = String(id);
  const contact = getFileContacts.find((item) => item.id === contactId);

  return contact || null;
};

const addContact = async (data) => {
  const myContact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  myContact.push(newContact);

  await fs.writeFile(path, JSON.stringify(myContact, null, 2));

  return newContact;
};

const removeContact = async (id) => {
  const removeContactBuId = await listContacts();
  const removeBuId = String(id);
  const index = removeContactBuId.findIndex((item) => item.id === removeBuId);
  if (index === -1) {
    return null;
  }
  const [remove] = removeContactBuId.splice(index, 1);
  await fs.writeFile(path, JSON.stringify(removeContactBuId, null, 2));
  return remove;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const apdateBuId = String(id);
  const index = contacts.findIndex((item) => item.id === apdateBuId);
  contacts[index] = { id, ...body };
  await fs.writeFile(path, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
