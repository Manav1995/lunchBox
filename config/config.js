var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'lunchbox'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/lunchbox-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'lunchbox'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/lunchbox-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'lunchbox'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/lunchbox-production'
  }
};

module.exports = config[env];
