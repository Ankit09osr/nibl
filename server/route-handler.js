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


module.exports.getMenu = function(req, res) {
  // const url = 'https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3/menu';
  // here is another url to play with to ensure code below works
  const url = 'https://api.foursquare.com/v2/venues/47a1bddbf964a5207a4d1fe3/menu';
  const urlQuery = url+ '?' + qs;
  utils.apiCall(urlQuery, function(data) {
    // 1 Get data that I want from API
    // 2 Check if it is in database
    // 2 A If not in db, save it into the database
    // 2 B If in db, retrieve rating from db
    // 3 Send all restaurant menu data to front end with ratings
    // 4 *IMPORTANT* Get restaurant Id!!!

    console.log('Array 1: This is an array of possible menus a restaurant might have', data.response.menu.menus.items);
    // console.log('This is the first element of the dinner menu array', data.response.menu.menus.items[0]);
    // console.log('Array 2: This is an array of what is on the dinner menu', data.response.menu.menus.items[0].entries.items);
    // console.log('This is the first element (section) in the dinner menu array', data.response.menu.menus.items[0].entries.items[0]);
    // console.log('Array 3: This is an array of the dishes in the first section of the dinner menu array', data.response.menu.menus.items[0].entries.items[0].entries.items);
    // console.log('This is the first dish in the first section of the dinner menu array', data.response.menu.menus.items[0].entries.items[0].entries.items[0]);
    res.send(data);
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
      .then(function(restaurantData){
        console.log('This this finally worked');
        res.send(restaurantData);
       })
  });
};
