const express = require('express');
const BlogService = require('./blog-service');

const blogRouter = express.Router();

blogRouter
  .route('/')
  .get((req, res, next) => {
    BlogService.getAllPosts(
      req.app.get('db')
    )
      .then(posts => {
        res.json(posts.map(BlogService.scrubBlogShort))
      })
      .catch(next)
  })

blogRouter
  .route('/:post_id')

module.exports = blogRouter;