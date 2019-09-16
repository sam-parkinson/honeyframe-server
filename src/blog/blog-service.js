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
  scrubBlogShort(blog) {
    return {
      id: blog.id,
      title: xss(blog.title),
      preview: xss(blog.preview),
      date_posted: new Date(blog.date_posted),
      category: blog.category
    }
  },
  scrubBlogLong(blog) {},
};

module.exports = BlogService;