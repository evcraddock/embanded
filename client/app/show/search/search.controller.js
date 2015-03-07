'use strict';

angular.module('embandedApp')
  .controller('ShowSearchCtrl', function ($scope, $http, $stateParams, Auth, BandSvc, VenueSvc, ShowSvc) {
    $scope.venueId = $stateParams.venueId;
    $scope.bandId = $stateParams.bandId;
    $scope.allowEdit = Auth.isAdmin();
    $scope.allowDelete = Auth.isAdmin();
    $scope.isAdmin = Auth.isAdmin();

    $scope.selectedBand = null;
    $scope.selectedVenue = null;
    $scope.foundShows = [];
    $scope.searchCritera = {};
    $scope.searchIsCollapsed = true;

    $scope.getVenues = function(searchTerm) {
      return $http({
        method: 'GET',
        url: 'api/venues?name=' + searchTerm
      }).then(function ($response) {
        var searchResults = [];

        $response.data.forEach(function (venue) {
          searchResults.push(venue);
        });

        return searchResults;
      });
    };

    $scope.getBands = function(searchTerm) {

      return $http({
        method: 'GET',
        url: 'api/bands?name=' + searchTerm
      }).then(function ($response) {
        var searchResults = [];

        $response.data.forEach(function (band) {
          searchResults.push(band);
        });

        return searchResults;
      });
    };


    $scope.loadShows = function() {

        var criteria = {};

        if ($scope.venueId) {
          criteria.venue = $scope.venueId;
        }

        if ($scope.bandId) {
          criteria.band = $scope.bandId;
        }

        if ($scope.selectedBand !== null) {
          criteria.band = $scope.selectedBand._id;
        }

        if ($scope.selectedVenue !== null) {
          criteria.venue = $scope.selectedVenue._id;
        }
        
        if ($scope.selectedShowDate !== null) {
          criteria.showStartDate = $scope.selectedShowDate;
        }

        ShowSvc.queryAll(criteria, function(foundShows){
            $scope.foundShows = foundShows;
        });
    };

    $scope.loadShows();
    
  });
