const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('Blog Endpoints', function() {
  let db;

  const {
    blogCat,
    shopCat,
    testBlog,
    testShop,
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
});