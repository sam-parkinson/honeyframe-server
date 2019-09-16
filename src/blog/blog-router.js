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
  .all(checkPostExists)
  .get((req, res, next) => {
    res.json(res.post)
  })

async function checkPostExists(req, res, next) {
  try {
    const rawPost = await BlogService.getPostById(
      req.app.get('db'),
      req.params.post_id,
    )

    if (!rawPost)
      return res.status(404).json({
        error: `Post not found`
      })

    const post = BlogService.scrubBlogLong(rawPost)

    res.post = post;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = blogRouter;