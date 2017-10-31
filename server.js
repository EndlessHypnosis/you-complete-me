const express = require('express');
const app = express();
const router = express.Router();
app.set('port', process.env.PORT || 3001);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//const environment = process.env.NODE_ENV || 'development';
//const configuration = require('./knexfile')[environment];
//const database = require('knex')(configuration);


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});



//now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'API Initialized!' });
});
//Use our router configuration when we call /api
app.use('/api', router);


app.get('/apb', (req, res) => {
  res.json({ message: 'APB Initialized!' });
});

//require('dotenv').config();

//const { cleanBreweryData, fetchBreweries } = require('./public/scripts/breweryDB');

// const jwt = require('jsonwebtoken');
// app.set('secretKey', process.env.JWT_SECRET);

const isInt = (value) => {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
};


// GET /breweries endpoint retrieves all the breweries
// app.get('/api/v1/breweries', (request, response) => {
//   database('breweries').select()
//     .then(breweries => {
//       if (!breweries.length) {
//         return response.status(404).json({
//           error: 'Could not find any Breweries'
//         });
//       }
//       response.status(200).json(breweries);
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });


app.listen(app.get('port'), () => {
  /* eslint-disable no-alert, no-console */
  console.log(`Your API server is running on ${app.get('port')}.`);
  /* eslint-enable no-alert, no-console */
});

module.exports = app;