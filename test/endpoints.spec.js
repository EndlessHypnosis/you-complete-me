const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Static Content Routes', () => {
  // happy path test
  it('should return the correct static content', done => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.should.include('<title>You Complete Me</title>');
        done();
      });
  });

  // sad path test
  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/foobar')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

// Endpoint tests
describe('API Routes', () => {

  // beforeEach(done => {
  //   database.seed.run()
  //     .then(() => {
  //       done();
  //     });
  // });

  // describe('GET /api/v1/items', () => {
  //   it('should return all inventory items', done => {
  //     chai.request(server)
  //       .get('/api/v1/items')
  //       .end((error, response) => {
  //         response.should.have.status(200);
  //         response.should.be.json;
  //         response.body.should.be.a('array');
  //         response.body.length.should.equal(6);
  //         response.body[0].should.have.property('id');
  //         response.body[0].should.have.property('title');
  //         response.body[0].should.have.property('description');
  //         response.body[0].should.have.property('imageUrl');
  //         response.body[0].should.have.property('price');
  //         done();
  //       });
  //   });
  // });

});