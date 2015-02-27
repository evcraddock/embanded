'use strict';

angular.module('embandedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('searchBand', {
        url: '/bands',
        templateUrl: 'app/band/search/search.html',
        controller: 'BandSearchCtrl'
      })
      .state('addBand', {
        url: '/bands/add',
        templateUrl: 'app/band/add/add.html',
        controller: 'AddBandCtrl',
        authenticate: true
      })
      .state('viewBand', {
        url: '/bands/:bandId',
        templateUrl: 'app/band/manage/index.html',
        controller: 'ManageBandCtrl',
        authenticate: true
      });
  });