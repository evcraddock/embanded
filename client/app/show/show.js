'use strict';

angular.module('embandedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('searchShow', {
        url: '/shows',
        templateUrl: 'app/show/search/search.html',
        controller: 'ShowSearchCtrl'
      })
      .state('addBandShow', {
        url: '/bands/:bandId/shows/add',
        templateUrl: 'app/show/add/add.html',
        controller: 'AddShowCtrl',
        authenticate: true
      })
      .state('addVenueShow', {
        url: '/venues/:venueId/shows/add',
        templateUrl: 'app/show/add/add.html',
        controller: 'AddShowCtrl',
        authenticate: true
      })
      .state('viewShow', {
        url: '/shows/:showId',
        templateUrl: 'app/show/manage/index.html',
        controller: 'ManageShowCtrl',
        authenticate: false
      });
  });