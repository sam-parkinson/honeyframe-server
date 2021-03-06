require('dotenv').config();
const { STRIPE_SECRET_KEY } = require('../config');
const express = require('express');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const OrderService = require('./order-service');

const orderRouter = express.Router();
const jsonBodyParser = express.json();

orderRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const pay = {
      source: req.body.token.token.id,
      amount: req.body.token.amount,
      currency: 'USD'
    }
    const postStripeCharge = res => (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ error: stripeErr });
      } else {
        const {
          card,
          email,
          cart
        } = req.body.token.token;
    
        const { 
          address_line1, 
          address_line2, 
          address_city, 
          address_state, 
          address_zip 
        } = card
    
        const address = { 
          address_line1, 
          address_line2, 
          address_city, 
          address_state, 
          address_zip 
        }

        const order_info = { cart, email, address, stripeRes };
        const newOrder = ({ order_info })
        
        OrderService.insertOrder(
          req.app.get('db'),
          newOrder
        )
          .then(order => {
            res
              .status(201)
              .json(order)
          })
      }
    }

    stripe.charges.create(pay, postStripeCharge(res));
  })

module.exports = orderRouter;