const xss = require('xss');

const BlogService = {
  getAllPosts(db) {
    return db
      .from('blog')
      .select(
        'blog.id',
        'blog.title',
        'blog.preview',
        'blog.date_posted',
        'cat.category'
      )
      .leftJoin(
        'blog_categories AS cat',
        'blog.cat_id',
        'cat.id'
      )
  },
  getPostById(db, id) {
    return db
      .from('blog')  
      .select(
        'blog.id',
        'blog.title',
        'blog.post',
        'blog.date_posted',
        'cat.category'
      )
      .leftJoin(
        'blog_categories AS cat',
        'blog.cat_id',
        'cat.id'
      )
      .where('blog.id', id)
      .first()
  },
  insertPost(db, newPost) {
    return db
      .insert(newPost)
      .into('blog')
      .returning('*')
      .then(([post]) => post)
      .then(post =>
        BlogService.getPostById(db, post.id)
      )
  },
  scrubBlogShort(blog) {
    return {
      id: blog.id,
      title: xss(blog.title),
      preview: xss(blog.preview),
      date_posted: new Date(blog.date_posted),
      category: blog.category
    }
  },
  scrubBlogLong(blog) {
    return {
      id: blog.id,
      title: xss(blog.title),
      post: xss(blog.post),
      date_posted: new Date(blog.date_posted),
      category: blog.category
    }
  },
};

module.exports = BlogService;