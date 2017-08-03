var express = require('express'),
    router = express.Router(),
    keys = require("../../../../../config/keys"),
    request = require("request"),
    _ = require("underscore");

const fetchRestaurant = (lat, lon, start) => {
    return new Promise((resolve, reject) => {
        if (!_.isNumber(lat) || !_.isNumber(lon)) {
            reject("fetchRestaurant: Invalid Data");
        }

        var options = {
            method: 'GET',
            url: 'https://developers.zomato.com/api/v2.1/search',
            qs: {
                'lat': lat,
                'lon': lon,
                'radius': 400,
                'start': start
            },
            headers: {
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

module.exports = function(app) {
    app.use('/', router);
    router.get('/fetch', (req, res) => {
        let body = "hello";
        var no_of_results;
        var start = 0;
        var arr = [];
        const lat = 12.8471445,
            lon = 80.2265543;
        fetchRestaurant(lat, lon, start).then((body, response) => {
            no_of_results = body.results_found;
            if (no_of_results > 20) {
                array_size = Math.floor(no_of_results / 20);
                console.log(array_size);
                for (var i = 0; i < array_size; i++) {
                    arr.push(fetchRestaurant(lat, lon, start));
                    start += 20;
                }
            }
            Promise.all(arr).then((results) => {
                res.send(results);
            });
        }).catch((err) => {
            console.log(err);
            //sres.send(err);
        })
    });
};