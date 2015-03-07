/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Band = require('../api/band/band.model');
var Venue = require('../api/venue/venue.model');
var Show = require('../api/show/show.model');

// Band.find({}).remove(function() {
//   Band.create({
//     name: 'Test Band',
//     description: 'This is a Test Band',
//     active: true,
//     website: 'http://www.testband.com',
//   });
// });

// Venue.find({}).remove(function() {
//   Venue.create({
//     name: 'Test Venue',
//     address: {
//       city: 'Oklahoma City',
//       state: {
//         name: 'Oklahoma',
//         abbreviation: 'Ok'
//       },
//       zipCode: '73101',
//       streetAddress: '123 Test Street'
//     },
//     phoneNumber: '2341231234',
//     website: 'http://test.com'
//   })
// })

// Show.find({}).remove();

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });