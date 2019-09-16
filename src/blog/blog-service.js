const BlogService = {
  getAllPosts(db) {
    return db
      .from('blog')
      .select()
  }
};

module.exports = BlogService;