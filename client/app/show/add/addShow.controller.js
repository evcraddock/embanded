'use strict';

angular.module('embandedApp')
  .controller('AddShowCtrl', function ($scope, $stateParams, $location, $filter, ShowSvc, VenueSvc, BandSvc) {

    $scope.bandId = $stateParams.bandId;
    $scope.hasCurrentBand = $stateParams.bandId !== undefined;
    $scope.venueId = $stateParams.venueId;
    $scope.hasCurrentVenue = $stateParams.venueId !== undefined;
    $scope.today = new Date();
    

    $scope.foundVenues = [];
    $scope.foundBands = [];
  	$scope.currentShow = {};
    
    $scope.isSaved = false;

    $scope.hstep = 1;
    $scope.mstep = 15;

    if ($scope.hasCurrentBand) {
      BandSvc.getBand({ id: $scope.bandId }, function(band){
        $scope.currentShow.band = band;
      });
    }

    if ($scope.hasCurrentVenue) {
      VenueSvc.getVenue({ id: $scope.venueId }, function(venue) {
        $scope.currentShow.venue = venue;
      });
    }

    $scope.saveShow = function(isValid) {
      if (!isValid) {
        return;
      }

      ShowSvc.add({ 
        name: $scope.currentShow.name,
        bandName:     $scope.currentShow.band.name,
        venueName:    $scope.currentShow.venue.name,
        venueAddress: {
          city: $scope.currentShow.venue.address.city,
          state: {
            name: $scope.currentShow.venue.address.state.name,
            abbreviation: $scope.currentShow.venue.address.state.abbreviation
          },
          zipCode: $scope.currentShow.venue.address.zipCode,
          streetAddress: $scope.currentShow.venue.address.streetAddress
        },
        showDate: ($scope.currentShow.showDate === null) ? $scope.currentShow.showDate : new Date(),
        band: $scope.currentShow.band._id,
        venue: $scope.currentShow.venue._id
      }, function(show) {
          var redirectLink = '/shows/' + show._id;
          $location.path(redirectLink).replace().notify(false);
      });
    };

    $scope.cancelSave = function() {
      $location.path('/shows').replace().notify(false);
    };

    $scope.getVenues = function(searchTerm) {
      VenueSvc.queryAll({ name: searchTerm }, function(results){
          $scope.foundVenues = results;
      });

      return $scope.foundVenues;
    };

    $scope.getBands = function(searchTerm) {
      BandSvc.queryAll({ name: searchTerm }, function(results){
          $scope.foundBands = results;
      });

      return $scope.foundBands;
    };


    $scope.open = function () {
        $scope.isDateOpen = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };


});
