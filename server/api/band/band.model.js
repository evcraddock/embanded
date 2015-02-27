'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BandSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  dateCreated: { type: Date, default: Date.now },
  website: String
});

module.exports = mongoose.model('Band', BandSchema);