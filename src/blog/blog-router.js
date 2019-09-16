const express = require('express');
const BlogService = require('./blog-service');

const blogRouter = express.Router();

blogRouter
  .route('/')
  .get((req, res, next) => {
    BlogService.getAllPosts(
      req.app.get('db')
    )
  })

module.exports = blogRouter;