'use strict';

angular.module('embandedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('searchVenue', {
        url: '/venues',
        templateUrl: 'app/venue/search/search.html',
        controller: 'VenueSearchCtrl'
      })
      .state('addVenue', {
        url: '/venues/add',
        templateUrl: 'app/venue/add/add.html',
        controller: 'AddVenueCtrl',
        authenticate: true
      })
      .state('viewVenue', {
        url: '/venues/:venueId',
        templateUrl: 'app/venue/manage/index.html',
        controller: 'ManageVenueCtrl',
        authenticate: true
      });
  });