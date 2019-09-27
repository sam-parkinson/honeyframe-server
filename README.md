# Honeyframe API

The API for Honeyframe, an app designed to function as a combination storefront and blog for a fictionalized beekeeping business. The base of this API can be further built on and customized for other small businesses as needed.

## API Documentation

RESTful API featuring the following endpoints:

  - Blog
    Accepts get requests, returns summaries of all blog posts in database as well as full-length individual blog posts

  - Store
    Accepts get requests, returns information about store products

  - Contact
    Accepts post requests, adds new contact information to database

## Image Credits

All images used with permission from https://www.instagram.com/westavehoney/

## Seed

psql -U postgres -d honeyframe -f ./seeds/seed.honeyframe_tables.sql