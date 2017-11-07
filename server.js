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

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');
  next();
});



router.get('/', (req, res) => {
  res.json({ ERROR: 'SHOULD NOT RENDER!' });
  // This route should serve static assets.
});

//Use our router configuration when we call /api
//FIXME: could refactor the app.xyz endpoints with this
app.use('/api', router);


//require('dotenv').config();

//const { cleanBreweryData, fetchBreweries } = require('./public/scripts/breweryDB');

// const jwt = require('jsonwebtoken');
// app.set('secretKey', process.env.JWT_SECRET);

const isInt = (value) => {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
};

// BOOKSHELF MODELS

let Training = bookshelf.Model.extend({
  tableName: 'training'
})


// GET /users/:id
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

  // if (!orderTotal || !(orderTotal > 0.0)) {
  //   return response
  //     .status(422)
  //     .json({
  //       status: 422,
  //       error: 'Order not saved. Invalid order total'
  //     });
  // }

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


// GET /feedback
app.get('/api/v1/feedback/:id', (request, response) => {
  database('feedback')
    .where('to_user_id', request.params.id)
    .select()
    .then(feedback => {
      // if (!feedback.length) {
      //   return response.status(404).json({
      //     error: 'Could not find any Feedback'
      //   });
      // }
      response.status(200).json(feedback);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// GET /schedules
app.get('/api/v1/schedules/:id', (request, response) => {
  database('training')
    .where('appprentice_user_id', request.params.id)
    .orWhere('mentor_user_id', request.params.id)
    .whereNot('status', 'open')
    .select()
    .then(schedules => {
      // if (!schedules.length) {
      //   return response.status(404).json({
      //     error: 'Could not find any Schedules'
      //   });
      // }
      
      response.status(200).json(schedules);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// GET /training
app.get('/api/v1/trainingOLD', (request, response) => {
  database('training')
    .where('status', 'open')
    .select()
    .then(training => {
      response.status(200).json(training);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/training', (request, response) => {
  new Training().where('status', 'open').fetchAll()
  .then(trainings => {
    response.status(200).json(trainings);
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})


app.listen(app.get('port'), () => {
  /* eslint-disable no-alert, no-console */
  console.log(`Your API server is running on ${app.get('port')}.`);
  /* eslint-enable no-alert, no-console */
});

module.exports = app;