const express = require('express');
const xss = require('xss');
const path = require('path');
const BlogService = require('./blog-service');
const { requireAuth } = require('../middleware/jwt-auth');

const blogRouter = express.Router();
const jsonBodyParser = express.json();

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
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, post, cat_id } = req.body;
    const newPost = {
      title: xss(title),
      post: xss(post),
      cat_id,
    };

    for (const [key, value] of Object.entries(newPost))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newPost.preview = newPost.post.slice(0, 100);

    BlogService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.id}`)) 
          .json(BlogService.scrubBlogLong(post))     
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