'use strict';

var _ = require('lodash');
var Band = require('./band.model');

// Get list of bands
exports.index = function(req, res) {
  var params = {};

  if (req.query['active']) {
    params['active'] = req.query['active'];
  }

  if (req.query['name']) {
    params['name'] = new RegExp(req.query['name'], 'i');
  }

  var query = Band.find(params);
  query.exec(function(err, bands) {
    if(err) { return handleError(res, err); }
    return res.json(200, bands);
  });
};

// Get a single band
exports.show = function(req, res) {
  Band.findById(req.params.id, function (err, band) {
    if(err) { return handleError(res, err); }
    if(!band) { return res.send(404); }
    return res.json(band);
  });
};

// Creates a new band in the DB.
exports.create = function(req, res) {
  Band.create(req.body, function(err, band) {
    if(err) { return handleError(res, err); }
    return res.json(201, band);
  });
};

// Updates an existing band in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Band.findById(req.params.id, function (err, band) {
    if (err) { return handleError(res, err); }
    if(!band) { return res.send(404); }
    var updated = _.merge(band, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, band);
    });
  });
};

// Deletes a band from the DB.
exports.destroy = function(req, res) {
  Band.findById(req.params.id, function (err, band) {
    if(err) { return handleError(res, err); }
    if(!band) { return res.send(404); }
    band.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}