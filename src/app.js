require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');
const authRouter = require('./auth/auth-router');
const blogRouter = require('./blog/blog-router');
const storeRouter = require('./store/store-router');
const contactRouter = require('./contact/contact-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.use(helmet());

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);
app.use('/api/store', storeRouter);
app.use('/api/contact', contactRouter);
app.use('/api/img', express.static(path.posix.join(process.cwd(), 'img')));

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;