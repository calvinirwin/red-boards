var mongoose = require('mongoose');

var LwData = function(options) {
  if (!options.db) {
    throw new Error('Database connection options missing!');
  }

  var that = this;

  this._connectionString = 'mongodb://';

  if (options.db.host)
    this._connectionString += options.db.host;
  if (options.db.port)
    this._connectionString += ':' + options.db.port;
  if (options.db.dbName)
    this._connectionString += '/' + options.db.dbName;

  mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to: ' + that._connectionString);
  });

  mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + that._connectionString);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected.');
  });
};

LwData.prototype.connect = function() {
  mongoose.connect(this._connectionString);
};

LwData.prototype.disconnect = function(callback) {
  mongoose.connection.close(callback);
};

module.exports = LwData;