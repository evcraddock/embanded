'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShowSchema = new Schema({
  name: String,
  bandName: String,
  venueName: String,
  VenueAddress: {
  	city: String,
  	state: {
  		name: String,
  		abbreviation: String
  	},
  	zipCode: String,
  	streetAddress: String
  },
  showDate: { type: Date },
  band: { type: Schema.Types.ObjectId, ref: 'Band' },
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
  dateCreated: { type: Date, default: Date.now }
},
{
  toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

ShowSchema.virtual('venueShowName')
.get(function() {
  return (this.name !== null) ? this.name : this.bandName + ' show';
});

ShowSchema.virtual('bandShowName')
.get(function() {
  var currentName = (this.name !== null) ? this.name : this.venueName + ' show';
  return currentName;
});

module.exports = mongoose.model('Show', ShowSchema);