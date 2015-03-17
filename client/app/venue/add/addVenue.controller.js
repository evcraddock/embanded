'use strict';

angular.module('embandedApp')
  .controller('AddVenueCtrl', function ($scope, $stateParams, $location, VenueSvc) {

  	$scope.currentVenue = {};
    $scope.isSaved = false;

    $scope.saveVenue = function(isValid) {
      if (!isValid) {
        return;
      }

      var venuePhoneNumber = ($scope.currentVenue.formatedPhoneNumber !== undefined) ? $scope.currentVenue.formatedPhoneNumber.replace(/\D+/g, '') : '';
      var latitude = ($scope.currentVenue.address.coordinates) ? $scope.currentVenue.address.coordinates.latitude : undefined;
      var longitude = ($scope.currentVenue.address.coordinates) ? $scope.currentVenue.address.coordinates.longitude : undefined;

      VenueSvc.add({ 
        name:     $scope.currentVenue.name,
        phoneNumber: venuePhoneNumber,
        website: $scope.currentVenue.website,
        address: {
          city: $scope.currentVenue.address.city,
          state: {
            name: $scope.currentVenue.address.state.name,
            abbreviation: $scope.currentVenue.address.state.abbreviation
          },
          zipCode: $scope.currentVenue.address.zipCode,
          streetAddress: $scope.currentVenue.address.streetAddress,
          coordinates: {
            latitude: latitude,
            longitude: longitude
          }

        }
      }, function(venue) {
          var viewVenueLink = '/venues/' + venue._id;
          $location.path(viewVenueLink).replace().notify(false);
      });
    };

    $scope.cancelSave = function() {
      $location.path('/venues').replace().notify(false);
    };
  });
