const express = require('express');
const StoreService = require('./store-service');

const storeRouter = express.Router();

storeRouter
  .route('/')
  .get((req, res, next) => {
    StoreService.getAllItems(
      req.app.get('db')
    )
      .then(items => {
        res.json(items.map(StoreService.scrubItem))
      })
      .catch(next)
  })

module.exports = storeRouter;