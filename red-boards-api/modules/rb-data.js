var connect = require('./data-connection');
var MlsException = require('./models/mlsexception');

connect.prototype.find = function(query, page, pagesize, callback) {
  MlsException.find(query).skip((page - 1) * pagesize).limit(pagesize).exec(callback);
};

connect.prototype.findById = function(id, callback) {
  MlsException.findById(id, callback);
};

connect.prototype.findByClient = function(clientId, page, pagesize, callback) {
  var clientQuery = {
    "MLSAreaMinor": clientId
  };
  MlsException.find(clientQuery).skip((page - 1) * pagesize).limit(pagesize).exec(callback);
};

connect.prototype.findByMlsArea = function(clientId, page, pagesize, callback) {
  var clientQuery = {
    "MLSAreaMinor": clientId
  };
  MlsException.find(clientQuery).skip((page - 1) * pagesize).limit(pagesize).exec(callback);
};

connect.prototype.allOpen = function(page, pagesize, callback) {
  MlsException.find().skip((page - 1) * pagesize).limit(pagesize).exec(callback);
};

connect.prototype.all = function(page, pagesize, callback) {
  MlsException.find().skip((page - 1) * pagesize).limit(pagesize).exec(callback);
};

connect.prototype.create = function(newObject, callback) {
  var model = new MlsException(newObject);
  model.save(callback);
};

connect.prototype.update = function(id, updatedObject, callback) {
  MlsException.findOneAndUpdate({
    _id: id
  }, updatedObject, {
    new: true
  }, callback);
};

connect.prototype.delete = function(id, callback) {
  MlsException.findByIdAndRemove(id, callback);
};

module.exports = connect;