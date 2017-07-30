var express = require('express'),
  router = express.Router(),
  keys = require("../../../../../config/keys"),
  request = require("request"),
  _ = require("underscore");

const fetchRestaurant = (lat, lon) => {
  return new Promise((resolve, reject) => {
    if(!_.isNumber(lat) || !_.isNumber(lon)) {
      reject("fetchRestaurant: Invalid Data");
    }

    var options = {
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/search',
      qs: {
        'lat': this.lat,
        'lon': this.lon,
        'radius': 'poiuy'
      },
      headers:{
        'accept': 'application/json',
        'user-key': keys.zomato,
      }
    };

    request(options, (error, response, body) => {
      if (error)
        throw reject(error);
      resolve(JSON.parse(body), response);
    });
  });
};

module.exports = function (app) {
  app.use('/', router);

  router.get('/fetch', (req, res) => {
    const lat = 12.8471445, lon=80.2265543;
    fetchRestaurant(lat, lon).then((body, response) => {
      res.send(body);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  });
};
