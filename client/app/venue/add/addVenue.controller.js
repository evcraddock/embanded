'use strict';

angular.module('embandedApp')
  .controller('AddVenueCtrl', function ($scope, $stateParams, $location, socket, VenueSvc) {

  	$scope.currentVenue = {};
    $scope.isSaved = false;

    $scope.saveVenue = function(isValid) {
      if (!isValid) {
        return;
      }

      var venuePhoneNumber = ($scope.currentVenue.formatedPhoneNumber !== undefined) ? $scope.currentVenue.formatedPhoneNumber.replace(/\D+/g, '') : '';

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
          streetAddress: $scope.currentVenue.address.streetAddress
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
