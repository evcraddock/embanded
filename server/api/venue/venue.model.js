'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VenueSchema = new Schema({
  	name: String,
	address: {
		city: String,
		state: {
			name: String,
			abbreviation: String
		},
		zipCode: String,
		streetAddress: String
	},
	phoneNumber: String,
	website: String,
	dateCreated: { type: Date, default: Date.now }
},
{
	toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


VenueSchema.virtual('formatedPhoneNumber')
.get(function() {
	if (!this.phoneNumber) {
		return '';
	}
	return this.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
})
.set(function(value) {
	var unformattednumber = value.replace(/\D+/g, '');

	this.set('phoneNumber', unformattednumber);
})



VenueSchema.virtual('address.location')
.get(function() {
	return this.address.city + ', ' + this.address.state.abbreviation;
});

module.exports = mongoose.model('Venue', VenueSchema);