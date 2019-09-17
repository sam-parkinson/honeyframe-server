const express = require('express');
const xss = require('xss');
const ContactService = require('./contact-service');

const contactRouter = express.Router();
const jsonParser = express.json();

contactRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const { first_name, last_name, email } = req.body;
    const newContact = {
      first_name: xss(first_name),
      last_name: xss(last_name),
      email: xss(email),
    };

    for (const [key, value] of Object.entries(newContact))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newContact.phone = req.body.phone ? xss(req.body.phone) : null;
    newContact.comment = req.body.comment ? xss(req.body.comment) : null;

    ContactService.insertContact(
      req.app.get('db'),
      newContact
    )
      .then(contact => {
        res
          .status(201)
          .json(ContactService.scrubContact(contact))
      })
      .catch(next)
  });

module.exports = contactRouter;