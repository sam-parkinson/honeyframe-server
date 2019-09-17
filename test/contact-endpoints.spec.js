const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Contact Endpoints', function() {
  let db;

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

  describe(`POST /api/contact`, () => {
    it(`sends a new contact form, responding with 201 and the contact`, () => {
      const newForm = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@test.com'
      }
      return supertest(app)
        .post(`/api/contact`)
        .send(newForm)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.first_name).to.eql(newForm.first_name)
          expect(res.body.last_name).to.eql(newForm.last_name)
          expect(res.body.email).to.eql(newForm.email)
        })
        .expect(res =>
          db 
            .from('contact')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.first_name).to.eql(newForm.first_name)
              expect(row.last_name).to.eql(newForm.last_name)
              expect(row.email).to.eql(newForm.email)
            })  
        )
    });
  });
});