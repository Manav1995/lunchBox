var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.send("Shit Works.");
});

router.get('/hello', function (req, res, next) {
  res.send("Shit Works2.");
});
