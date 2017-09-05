const express = require('express')
const app = express()
const querystring = require('querystring');
const foursquare = require('../foursquare-config/foursquare-config.js')
var request = require('request')
var bodyParser = require('body-parser')
var logger = require('morgan')


app.use(bodyParser.json())
app.use(logger('dev'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/foursquare', function (req, res) {
  // console.log('Env ', foursquare.CLIENT_ID)
  // console.log('Env2', foursquare.CLIENT_SECRET)
  var url = 'https://api.foursquare.com/v2/venues/4bf9e1445ec320a11c028bd3';
  var credentials = {
    'v': '20170904'
  };
  credentials.client_id = foursquare.CLIENT_ID;
  credentials.client_secret = foursquare.CLIENT_SECRET;
  var qs = querystring.stringify(credentials);
  var urlQuery = url+ '?' + qs;;
  console.log('credentials', urlQuery);

  request(urlQuery, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.send('Hello foursquare');
  });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})