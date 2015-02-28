'use strict';

var _ = require('lodash');
var Show = require('./show.model');

// Get list of shows
exports.index = function(req, res) {

  var params = {};
  var startDateCriteria = {};

  if (req.query.band) {
    params.band = req.query.band;
  }

  if (req.query.venue) {
    params.venue = req.query.venue;
  }

  var startShowDate = new Date();

  if (req.query.showStartDate) {
    startShowDate = req.query.showStartDate;
  } 

  startDateCriteria.$gte = new Date(startShowDate);

  if (req.query.showEndDate) {
    var endShowDate = req.query.showEndDate;
    startDateCriteria.$lte = new Date(endShowDate);
  }

  params.showDate = startDateCriteria;

  var query = Show.find(params);
  query.sort({showDate: 'ascending'});
  query.exec(function(err, shows) {
    if(err) { return handleError(res, err); }
    return res.json(200, shows);
  });
};

// Get a single show
exports.show = function(req, res) {
    Show.findById(req.params.id)
    .populate('band')
    .populate('venue')
    .exec(function(err, show) {
        if(err) { return handleError(res, err); }
        if(!show) { return res.send(404); }
        
        return res.json(show);
    });
};

// Creates a new show in the DB.
exports.create = function(req, res) {
  Show.create(req.body, function(err, show) {
    if(err) { return handleError(res, err); }
    return res.json(201, show);
  });
};

// Updates an existing show in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  Show.findById(req.params.id, function (err, show) {
    if (err) { return handleError(res, err); }
    if(!show) { return res.send(404); }
    var updated = _.merge(show, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      Show.findById(show._id)
      .populate('band')
      .populate('venue')
      .exec(function(err, reloadedshow) {
          if(err) { return handleError(res, err); }
          if(!reloadedshow) { return res.send(404); }
          
          return res.json(200, reloadedshow);
      });
    });
  });
};

// Deletes a show from the DB.
exports.destroy = function(req, res) {
  Show.findById(req.params.id, function (err, show) {
    if(err) { return handleError(res, err); }
    if(!show) { return res.send(404); }
    show.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}