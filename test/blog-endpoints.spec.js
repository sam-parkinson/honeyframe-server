const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Blog Endpoints', function() {
  let db;

  const {
    testUsers,
    blogCat,
    testBlog,
  } = helpers.makeSiteFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`GET /api/blog`, () => {
    context(`Given no blog posts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/blog')
          .expect(200, []);
      });
    });

    context(`Given there are posts in the database`, () => {
      beforeEach('insert blog posts', () => 
        helpers.seedBlog(
          db,
          blogCat,
          testBlog
        )
      )

      it('responds with 200 and all blog posts', () => {
        const expectedBlog = helpers.makeExpectedBlog(testBlog);
        return supertest(app)
          .get('/api/blog')
          .expect(200, expectedBlog)
      });
    });
  });

  describe(`GET /api/blog/:post_id`, () => {
    context('Given there are posts in DB', () => {
      beforeEach('insert posts', () => 
        helpers.seedBlog(
          db,
          blogCat,
          testBlog
        )
      )

      it(`responds with the requested post`, () => {
        const blogPost = testBlog[0]
        const expectedBlog = {
          id: blogPost.id,
          title: blogPost.title,
          post: blogPost.post,
          date_posted: blogPost.date_posted.toISOString(),
          category: 'test'
        }
        return supertest(app)
          .get(`/api/blog/${blogPost.id}`)
          .expect(200, expectedBlog)
      });
    });
  });

  describe.only(`POST /api/blog`, () => {
    beforeEach(() => {
      helpers.seedUsers(
        db,
        testUsers
      );
      helpers.seedBlogCat(
        db,
        blogCat
      )}
    )

    it(`creates a new blog post, responding with 201 and the post`, () => {
      this.retries(3);
      const testUser = testUsers[0]
      const newPost = {
        title: 'test',
        post: '*'.repeat(73),
        cat_id: 1,
      }
      return supertest(app)
        .post(`/api/blog`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newPost)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.title).to.eql(newPost.title)
          expect(res.body.post).to.eql(newPost.post)
        })
        .expect(res =>
          db
            .from('blog')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.title).to.eql(newPost.title)
              expect(row.post).to.eql(newPost.post)
              expect(row.cat_id).to.eql(newPost.cat_id)
            })  
        )
    });
  });
});