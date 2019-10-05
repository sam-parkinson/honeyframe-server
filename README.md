# Honeyframe API

The API for Honeyframe, an app designed to function as a combination storefront and blog for a fictionalized beekeeping business. The base of this API can be further built on and customized for other small businesses as needed.

## API Documentation

RESTful API featuring the following endpoints:

  - Blog
    Accepts get requests, returns summaries of all blog posts in database as well as full-length individual blog posts
    Accepts post requests with admin authentication, adds new blog post to database

  - Store
    Accepts get requests, returns information about store products

  - Contact
    Accepts post requests, adds new contact information to database

  - Orders
    Accepts post requests, uses Stripe API to process payment information, then posts order contents and shipping information to database

## Client

Live: https://honeyframe.parkinsonsp42.now.sh/

Repo: https://github.com/sam-parkinson/honeyframe-client

## Technology Used

Node.js, Express, PostgreSQL, Stripe.js and Stripe API

## Image Credits

All images used with permission from https://www.instagram.com/westavehoney/
