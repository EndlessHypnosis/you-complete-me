const express = require('express');
const app = express();
const router = express.Router();
app.set('port', process.env.PORT || 3100);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const bookshelf = require('bookshelf')(database);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', (req, res) => {
  res.json({ ERROR: 'SHOULD NOT RENDER!' });
  // This route should serve static assets.
});

//FIXME: could refactor the app.xyz endpoints by leveraging router
app.use('/api', router);


const isInt = (value) => {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
};

// BOOKSHELF MODELS
let Training = bookshelf.Model.extend({
  tableName: 'training'
});

let Topics = bookshelf.Model.extend({
  tableName: 'topics'
});

app.get('/api/v1/users/:id', (request, response) => {
  database('users')
  .where('firebase_uid', request.params.id)
  .select()
    .then(users => {
      if (!users.length) {
        return response.status(404).json({
          error: 'Could not find any Users'
        });
      }
      response.status(200).json(users);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users', (request, response) => {
  const { firebase_uid, email } = request.body;

  if (!firebase_uid || !email) {
    return response
      .status(422)
      .json({
        status: 422,
        error: 'User not Created. Invalid request parameters'
      });
  };

  database('users').insert({
    firebase_uid,
    email
  }, '*')
    .then(users => {
      response.status(201).json(Object.assign({ status: 201 }, users[0]));
    })
    .catch(error => {
      response.status(500).json(Object.assign({ status: 500 }, { error }));
    });
});

app.patch('/api/v1/users/:id', (request, response) => {
  const {
    email,
    slack_id,
    grade,
    skill_level,
    training_as_padawan_with_jedi_attempted,
    training_as_padawan_with_jedi_success,
    training_as_jedi_with_jedi_attempted,
    training_as_jedi_with_jedi_success,
    training_as_jedi_with_padawan_attempted,
    training_as_jedi_with_padawan_success
  } = request.body;

  database('users')
    .where('firebase_uid', request.params.id)
    .update(request.body, '*')
      .then(users => {
        if (!users[0]) {
          return response.status(422).json({
            error: 'Could not update user. Unexpected error'
          });
        }
        response.status(200).json(Object.assign({ status: 200 }, users[0]));
      })
      .catch(error => {
        response.status(500).json(Object.assign({ status: 500 }, { error }));
      });
});

app.get('/api/v1/feedback/:id', (request, response) => {
  database('feedback')
    .where('to_user_id', request.params.id)
    .select()
    .then(feedback => {
      response.status(200).json(feedback);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/schedules/:id', (request, response) => {
  database('training')
    .where('appprentice_user_id', request.params.id)
    .orWhere('mentor_user_id', request.params.id)
    .whereNot('status', 'open')
    .select()
    .then(schedules => {
      response.status(200).json(schedules);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/topics', (request, response) => {
  new Topics().fetchAll()
    .then(topics => {
      response.status(200).json(topics);
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/training', (request, response) => {
  new Training().where('status', 'open').fetchAll()
  .then(trainings => {
    response.status(200).json(trainings);
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.post('/api/v1/training', (request, response) => {
  const {
    mentor_user_id,
    scheduled_for_date,
    length_in_minutes
  } = request.body;

  if (!mentor_user_id || !scheduled_for_date || !length_in_minutes) {
    return response
      .status(422)
      .json({
        status: 422,
        error: 'Training not Created. Invalid request parameters'
      });
  }

  let booking = new Training();
  booking.set('mentor_user_id', mentor_user_id);
  booking.set('scheduled_for_date', scheduled_for_date);
  booking.set('length_in_minutes', length_in_minutes);
  booking.set('location', 'tbd');
  booking.set('status', 'open');

  booking.save().then(booking => {
    response.status(201).json(Object.assign({ status: 201 }, booking));
  })
  .catch(error => {
    response.status(500).json(Object.assign({ status: 500 }, { error }));
  });
});

app.listen(app.get('port'), () => {
  console.log(`Your API server is running on ${app.get('port')}.`);
});

module.exports = app;