var config = {};

config.db = {
  host: 'dev-cirwin-ssd',
  port: 27017,
  dbName: 'mls_exceptions'
};


config.web = {
  port: process.env.PORT || 8080,
  host: '127.0.0.1'
};

module.exports = config;