const querystring = require('querystring')
const foursquare = require('../api-config/foursquare-config.js')
const bodyParser = require('body-parser')
const utils = require('./util')
const db = require('../db/db.js');

var credentials = {
  'v': '20170904'
};
credentials.client_id = foursquare.CLIENT_ID;
credentials.client_secret = foursquare.CLIENT_SECRET;
const qs = querystring.stringify(credentials);

module.exports.getVenue = function(req, res) {
  const url = 'https://api.foursquare.com/v2/venues/4bf9e1445ec320a11c028bd3';
  const urlQuery = url+ '?' + qs;
  utils.apiCall(urlQuery, function(data) {
    res.send(data.response.venue);
  });
};

// Reached at localhost:3006/menu
module.exports.getMenu = function(req, res) {
  const url = 'https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3/menu';
  // here is another url to play with to ensure code below works
  // const url = 'https://api.foursquare.com/v2/venues/47a1bddbf964a5207a4d1fe3/menu';
  const urlQuery = url+ '?' + qs;

  utils.apiCall(urlQuery, function(data) {
    utils.getDishData(data)
      .then(function(dishData) {
        console.log('dishData sent to front end');
        res.send(dishData);
      });
  });
};

module.exports.getRestaurants = function(req, res) {
  const url = 'https://api.foursquare.com/v2/venues/explore';
  var myQuery = req.query;
  var parameterObj = {
    'venuePhotos': '1',
    'limit': '10'
  };
  parameterObj.query = myQuery.query;
  parameterObj.near = myQuery.near;
  parameterObj.radius = myQuery.radius;
  const parameter = querystring.stringify(parameterObj);
  const urlQuery = url+ '?' + parameter + '&' + qs;

  utils.apiCall(urlQuery, function(data) {
    utils.getRestaurantData(data)
      .then(function(restaurantData) {
        console.log('restaurantData sent to front end');
        res.send(restaurantData);
       });
  });
};
