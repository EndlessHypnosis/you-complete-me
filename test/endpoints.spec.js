const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Static Content Routes', () => {

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


  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/foo')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

// Local Endpoint tests
describe('API Routes', () => {
  beforeEach(done => {
    database.seed.run()
      .then(() => {
        done();
      });
  });

  describe('GET /api/v1/topics', () => {
    it('should return all topics', done => {
      chai.request(server)
        .get(`/api/v1/topics`)
        .end((error, response) => {
          
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(24);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('parent');
          response.body[0].should.have.property('name');
          done();
        });
    });
    
    it('should return the correct topics', done => {
      let mockData = {
        parent: 'Databases',
        name: 'MongoDB'
      };
      chai.request(server)
        .get(`/api/v1/topics`)
        .end((error, response) => {
          
          response.should.have.status(200);
          response.body.filter(item => {
            return (item.parent === mockInventoryItem.parent
            && item.name === mockInventoryItem.name);
          }).length.should.equal(1);
          done();
        });
    });
  });

});