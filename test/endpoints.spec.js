const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Static Content Routes', () => {
  it('should return the correct static content', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        /* eslint-disable no-unused-expressions */
        response.should.be.html;
        /* eslint-enable no-unused-expressions */
        response.res.text.should.include('<title>You Complete Me</title>');
        done();
      });
  });

  it('should return a 404 for a route that does not exist', (done) => {
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
  // beforeEach(done => {
  //   database.seed.run()
  //     .then(() => {
  //       done();
  //     });
  // });

  describe('GET /api/v1/users/:id', () => {
    it('should return mentor user', (done) => {
      const mentor = {
        firebase_uid: 'A3g4bbXDgwggGwcsvwDF7S6XkJG2',
        email: 'jedi1@jedi1.com',
        slack_id: 'jedi1',
        grade: 'Mod 4',
        skill_level: 'Jedi Master',
        training_as_padawan_with_jedi_attempted: '0',
        training_as_padawan_with_jedi_success: '0',
        training_as_jedi_with_jedi_attempted: '0',
        training_as_jedi_with_jedi_success: '0',
        training_as_jedi_with_padawan_attempted: '3',
        training_as_jedi_with_padawan_success: '1',
      };

      chai.request(server)
        .get(`/api/v1/users/${mentor.firebase_uid}`)
        .end((error, response) => {
          response.should.have.status(200);
          /* eslint-disable no-unused-expressions */
          response.should.be.json;
          /* eslint-enable no-unused-expressions */
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('firebase_uid');
          response.body[0].firebase_uid.should.equal(mentor.firebase_uid);
          response.body[0].should.have.property('email');
          response.body[0].email.should.equal(mentor.email);
          response.body[0].should.have.property('slack_id');
          response.body[0].should.have.property('grade');
          response.body[0].should.have.property('skill_level');
          done();
        });
    });

    it('should return apprentice user', (done) => {
      const apprentice = {
        firebase_uid: 'nXcCfHuZUacfx3ewzSdkDtipMzs1',
        email: 'padawan1@padawan1.com',
        slack_id: 'padawan1',
        grade: 'Mod 1',
        skill_level: 'Padawan',
        training_as_padawan_with_jedi_attempted: '2',
        training_as_padawan_with_jedi_success: '1',
        training_as_jedi_with_jedi_attempted: '0',
        training_as_jedi_with_jedi_success: '0',
        training_as_jedi_with_padawan_attempted: '0',
        training_as_jedi_with_padawan_success: '0',
      };

      chai.request(server)
        .get(`/api/v1/users/${apprentice.firebase_uid}`)
        .end((error, response) => {
          response.should.have.status(200);
          /* eslint-disable no-unused-expressions */
          response.should.be.json;
          /* eslint-enable no-unused-expressions */
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('firebase_uid');
          response.body[0].firebase_uid.should.equal(apprentice.firebase_uid);
          response.body[0].should.have.property('email');
          response.body[0].email.should.equal(apprentice.email);
          response.body[0].should.have.property('slack_id');
          response.body[0].should.have.property('grade');
          response.body[0].should.have.property('skill_level');
          done();
        });
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user successfully', (done) => {
      const aaaUid = 'El50ywd09XNC7O1MP3FlCcYJj692';
      chai.request(server)
        .get(`/api/v1/users/${aaaUid}`)
        .end((error, response) => {
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find any Users');
          // post new user
          chai.request(server)
            .post('/api/v1/users')
            .send({
              firebase_uid: aaaUid,
              email: 'aaa@aaa.com',
            })
            .end((errorB, responseB) => {
              responseB.should.have.status(201);
              /* eslint-disable no-unused-expressions */
              responseB.should.be.json;
              /* eslint-enable no-unused-expressions */
              responseB.body.should.be.a('object');
              responseB.body.should.have.property('id');
              responseB.body.should.have.property('firebase_uid');
              responseB.body.firebase_uid.should.equal(aaaUid);
              responseB.body.should.have.property('email');
              responseB.body.email.should.equal('aaa@aaa.com');
              done();
            });
        });
    });

    it('should error if the post is missing the total price', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send({
          nothing: 'nothing',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.should.have.property('error');
          done();
        });
    });
  });

  describe('PATCH /api/v1/users/:id', () => {
    it('should create a new user successfully', (done) => {
      const apprentice = {
        firebase_uid: 'nXcCfHuZUacfx3ewzSdkDtipMzs1',
        email: 'padawan1@padawan1.com',
        slack_id: 'padawan1',
        grade: 'Mod 1',
        skill_level: 'Padawan',
        training_as_padawan_with_jedi_attempted: '2',
        training_as_padawan_with_jedi_success: '1',
        training_as_jedi_with_jedi_attempted: '0',
        training_as_jedi_with_jedi_success: '0',
        training_as_jedi_with_padawan_attempted: '0',
        training_as_jedi_with_padawan_success: '0',
      };
      chai.request(server)
        .get(`/api/v1/users/${apprentice.firebase_uid}`)
        .end((error, response) => {
          response.body[0].firebase_uid.should.equal(apprentice.firebase_uid);
          // patch user
          chai.request(server)
            .patch(`/api/v1/users/${apprentice.firebase_uid}`)
            .send({
              slack_id: 'my new slack',
              grade: 'senior dev',
            })
            .end((errorB, responseB) => {
              responseB.should.have.status(200);
              /* eslint-disable no-unused-expressions */
              responseB.should.be.json;
              /* eslint-enable no-unused-expressions */
              responseB.body.should.be.a('object');
              responseB.body.should.have.property('id');
              responseB.body.should.have.property('firebase_uid');
              responseB.body.firebase_uid.should.equal(apprentice.firebase_uid);
              responseB.body.should.have.property('slack_id');
              responseB.body.slack_id.should.equal('my new slack');
              responseB.body.should.have.property('grade');
              responseB.body.grade.should.equal('senior dev');
              done();
            });
        });
    });

    it('should error if trying to patch a user that doesnt exist', (done) => {
      chai.request(server)
        .patch('/api/v1/users/invalid')
        .send({
          slack_id: 'my new slack',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not update user. Unexpected error');
          done();
        });
    });
  });

  describe('GET /api/v1/feedback/:id', () => {
    it('should get all feedback for a specific user', (done) => {
      const apprentice = {
        firebase_uid: 'nXcCfHuZUacfx3ewzSdkDtipMzs1',
        email: 'padawan1@padawan1.com',
        slack_id: 'padawan1',
        grade: 'Mod 1',
        skill_level: 'Padawan',
        training_as_padawan_with_jedi_attempted: '2',
        training_as_padawan_with_jedi_success: '1',
        training_as_jedi_with_jedi_attempted: '0',
        training_as_jedi_with_jedi_success: '0',
        training_as_jedi_with_padawan_attempted: '0',
        training_as_jedi_with_padawan_success: '0',
      };
      let apprenticePGid;
      chai.request(server)
        .get(`/api/v1/users/${apprentice.firebase_uid}`)
        .end((error, response) => {
          response.body[0].firebase_uid.should.equal(apprentice.firebase_uid);
          apprenticePGid = response.body[0].id;
          // get feedback
          chai.request(server)
            .get(`/api/v1/feedback/${apprenticePGid}`)
            .end((errorB, responseB) => {
              responseB.should.have.status(200);
              /* eslint-disable no-unused-expressions */
              responseB.should.be.json;
              /* eslint-enable no-unused-expressions */
              responseB.body.should.be.a('array');
              responseB.body.length.should.equal(3);
              responseB.body[0].should.have.property('from_user_id');
              responseB.body[0].should.have.property('from_user_skill_level');
              responseB.body[0].should.have.property('to_user_id');
              responseB.body[0].should.have.property('to_user_skill_level');
              responseB.body[0].should.have.property('message');
              done();
            });
        });
    });

    it('should return no feedback for a user that doesnt exist', (done) => {
      chai.request(server)
        .get('/api/v1/feedback/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.length(0);
          done();
        });
    });
  });

  describe('GET /api/v1/schedules/:id', () => {
    it('should get all schedules relevant to a mentor', (done) => {
      const mentor = {
        firebase_uid: 'A3g4bbXDgwggGwcsvwDF7S6XkJG2',
        email: 'jedi1@jedi1.com',
        slack_id: 'jedi1',
        grade: 'Mod 4',
        skill_level: 'Jedi Master',
        training_as_padawan_with_jedi_attempted: '0',
        training_as_padawan_with_jedi_success: '0',
        training_as_jedi_with_jedi_attempted: '0',
        training_as_jedi_with_jedi_success: '0',
        training_as_jedi_with_padawan_attempted: '3',
        training_as_jedi_with_padawan_success: '1',
      };
      let mentorPGid;
      chai.request(server)
        .get(`/api/v1/users/${mentor.firebase_uid}`)
        .end((error, response) => {
          response.body[0].firebase_uid.should.equal(mentor.firebase_uid);
          mentorPGid = response.body[0].id;
          // get schedules
          chai.request(server)
            .get(`/api/v1/schedules/${mentorPGid}`)
            .end((errorB, responseB) => {
              responseB.should.have.status(200);
              /* eslint-disable no-unused-expressions */
              responseB.should.be.json;
              /* eslint-enable no-unused-expressions */
              responseB.body.should.be.a('array');
              responseB.body.length.should.equal(3);
              responseB.body[0].should.have.property('appprentice_user_id');
              responseB.body[0].should.have.property('mentor_user_id');
              responseB.body[0].should.have.property('scheduled_for_date');
              responseB.body[0].should.have.property('length_in_minutes');
              responseB.body[0].should.have.property('location');
              /* eslint-disable arrow-body-style */
              responseB.body.filter((item) => {
                /* eslint-enable arrow-body-style */
                return (item.location === 'tbd');
              }).length.should.equal(0);
              done();
            });
        });
    });

    it('should return no feedback for a user that doesnt exist', (done) => {
      chai.request(server)
        .get('/api/v1/feedback/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.length(0);
          done();
        });
    });
  });

  describe('GET /api/v1/topics', () => {
    it('should return all topics', (done) => {
      chai.request(server)
        .get('/api/v1/topics')
        .end((error, response) => {
          response.should.have.status(200);
          /* eslint-disable no-unused-expressions */
          response.should.be.json;
          /* eslint-enable no-unused-expressions */
          response.body.should.be.a('array');
          response.body.length.should.equal(24);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('parent');
          response.body[0].should.have.property('name');
          done();
        });
    });
    it('should return the correct topics', (done) => {
      const mockData = {
        parent: 'Databases',
        name: 'MongoDB',
      };
      chai.request(server)
        .get('/api/v1/topics')
        .end((error, response) => {
          response.should.have.status(200);
          /* eslint-disable arrow-body-style */
          response.body.filter((item) => {
            /* eslint-enable arrow-body-style */
            return (item.parent === mockData.parent
              && item.name === mockData.name);
          }).length.should.equal(1);
          done();
        });
    });
  });

  describe('GET /api/v1/training', () => {
    it('should get all open training sessions', (done) => {
      chai.request(server)
        .get('/api/v1/training')
        .end((error, response) => {
          response.should.have.status(200);
          /* eslint-disable no-unused-expressions */
          response.should.be.json;
          /* eslint-enable no-unused-expressions */
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('location');
          response.body[0].location.should.equal('tbd');
          done();
        });
    });
  });

  describe('POST /api/v1/training', () => {
    it('should create a new training booking', (done) => {
      const mentor = {
        firebase_uid: 'A3g4bbXDgwggGwcsvwDF7S6XkJG2',
        email: 'jedi1@jedi1.com',
        slack_id: 'jedi1',
        grade: 'Mod 4',
        skill_level: 'Jedi Master',
        training_as_padawan_with_jedi_attempted: '0',
        training_as_padawan_with_jedi_success: '0',
        training_as_jedi_with_jedi_attempted: '0',
        training_as_jedi_with_jedi_success: '0',
        training_as_jedi_with_padawan_attempted: '3',
        training_as_jedi_with_padawan_success: '1',
      };
      let mentorPGid;
      chai.request(server)
        .get(`/api/v1/users/${mentor.firebase_uid}`)
        .end((error, response) => {
          response.body[0].firebase_uid.should.equal(mentor.firebase_uid);
          mentorPGid = response.body[0].id;
          // post training
          chai.request(server)
            .post('/api/v1/training')
            .send({
              mentor_user_id: mentorPGid,
              scheduled_for_date: '2017-11-04 19:17:40-06',
              length_in_minutes: '120',
            })
            .end((errorB, responseB) => {
              responseB.should.have.status(201);
              /* eslint-disable no-unused-expressions */
              responseB.should.be.json;
              /* eslint-enable no-unused-expressions */
              responseB.body.should.be.a('object');
              responseB.body.attributes.should.have.property('location');
              responseB.body.attributes.location.should.equal('tbd');
              responseB.body.attributes.should.have.property('status');
              responseB.body.attributes.status.should.equal('open');
              responseB.body.attributes.should.have.property('length_in_minutes');
              responseB.body.attributes.length_in_minutes.should.equal('120');
              done();
            });
        });
    });

    it('should error if the post is missing the mentor_id', (done) => {
      chai.request(server)
        .post('/api/v1/training')
        .send({
          scheduled_for_date: '2017-11-07 14:30',
          length_in_minutes: '120',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.should.have.property('error');
          done();
        });
    });
  });
});
