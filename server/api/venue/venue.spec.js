'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/venues', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/venues')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  // it('should return one record', function(done) {
  //   request(app)
  //     .get('/api/venues:')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       console.log('body: ' + res);
  //       expect('1').toBe('1');
  //       //expect(res.body[0].name).toBe('Test Venue');
  //     })
  // })
});