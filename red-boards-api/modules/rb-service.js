var RbData = require('./rb-data');

var RbService = function(options) {
  if (!options) throw new Error("No options specified");

  this._data = new RbData(options);
};


RbService.prototype.start = function() {
  this._data.connect();
};

RbService.prototype.stop = function(callback) {
  this._data.disconnect(callback);
};


RbService.prototype.findById = function(listingId, callback) {
  this._data.findById(listingId, callback);
};

RbService.prototype.find = function(query, page, pagesize, callback) {
  this._data.find(query, page, pagesize, callback);
};

RbService.prototype.findByMlsArea = function(clientId, page, pagesize, callback) {
  this._data.findByClient(clientId, page, pagesize, callback);
};

RbService.prototype.allOpen = function(page, pagesize, callback) {
  this._data.allOpen(page, pagesize, callback);
};

RbService.prototype.all = function(page, pagesize, callback) {
  this._data.all(page, pagesize, callback);
};

RbService.prototype.create = function(listing, callback) {
  this._data.create(listing, callback);
};

RbService.prototype.update = function(id, listing, callback) {
  this._data.update(id, listing, callback);
};

RbService.prototype.delete = function(id, callback) {
  this._data.delete(id, callback);
};

module.exports = RbService;