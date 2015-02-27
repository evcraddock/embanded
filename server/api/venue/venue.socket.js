/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Venue = require('./venue.model');

exports.register = function(socket) {
  Venue.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Venue.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('venue:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('venue:remove', doc);
}