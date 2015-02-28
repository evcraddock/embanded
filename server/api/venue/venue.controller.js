'use strict';

var _ = require('lodash');
var Venue = require('./venue.model');

// Get list of venues
exports.index = function(req, res) {
  var params = {};

  if (req.query.name) {
    params.name = new RegExp(req.query.name, 'i');
  }

  var query = Venue.find(params);
  query.exec(function(err, venues) {
    if(err) { return handleError(res, err); }
    return res.json(200, venues);
  });

};

// Get a single venue
exports.show = function(req, res) {
  Venue.findById(req.params.id, function (err, venue) {
    if(err) { return handleError(res, err); }
    if(!venue) { return res.send(404); }
    return res.json(venue);
  });
};

// Creates a new venue in the DB.
exports.create = function(req, res) {
  Venue.create(req.body, function(err, venue) {
    if(err) { return handleError(res, err); }
    return res.json(201, venue);
  });
};

// Updates an existing venue in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Venue.findById(req.params.id, function (err, venue) {
    if (err) { return handleError(res, err); }
    if(!venue) { return res.send(404); }
    var updated = _.merge(venue, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, venue);
    });
  });
};

// Deletes a venue from the DB.
exports.destroy = function(req, res) {
  Venue.findById(req.params.id, function (err, venue) {
    if(err) { return handleError(res, err); }
    if(!venue) { return res.send(404); }
    venue.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}