const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Store Endpoints', function () {
  let db;

  const {
    shopCat,
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

  describe(`GET /api/store`, () => {
    context(`Given no items in store`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/store')
          .expect(200, []);
      });
    });

    context(`Given items in store`, () => {
      beforeEach('insert shop items', () => 
        helpers.seedShop(
          db,
          shopCat,
          testShop
        )
      )

      it('responds with 200 and all shop items', () => {
        const expectedShop = helpers.makeExpectedShop(testShop);
        return supertest(app)
          .get('/api/store')
          .expect(200, expectedShop)
      });
    });
  });
});