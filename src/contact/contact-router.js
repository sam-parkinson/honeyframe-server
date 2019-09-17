const express = require('express');
const xss = require('xss');
const ContactService = require('./contact-service');

const contactRouter = express.Router();
const jsonParser = express.json();

module.exports = contactRouter;