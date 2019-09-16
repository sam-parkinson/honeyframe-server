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
  }
};

module.exports = BlogService;