const xss = require('xss');

const ContactService = {
  getContactById(db, id) {
    return db
      .from('contact')
      .select('*')
      .where('id', id)
      .first()
  },
  insertContact(db, newContact) {
    return db
      .insert(newContact)
      .into('contact')
      .returning('*')
      .then(([contact]) => contact)
      .then(contact =>
        ContactService.getContactById(db, contact.id)  
      )
  },
  scrubContact(contact) {
    return {
      id: contact.id,
      first_name: xss(contact.first_name),
      last_name: xss(contact.last_name),
      email: xss(contact.email),
      phone: contact.phone ? xss(contact.phone) : null,
      comment: contact.comment ? xss(contact.comment) : null,
    }
  }
};

module.exports = ContactService;