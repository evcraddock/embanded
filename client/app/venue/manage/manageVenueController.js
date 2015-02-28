'use strict';

angular.module('embandedApp')
  .controller('ManageVenueCtrl', function ($scope, $stateParams, Auth, Modal, socket, VenueSvc) {
  	$scope.venueId = $stateParams.venueId;
    $scope.isViewMode = true;
    $scope.isEditMode = false;
    $scope.isAdmin = Auth.isAdmin();

  	$scope.currentVenue = null;

    
    $scope.switchMode = function(){
      $scope.isViewMode = !$scope.isViewMode;
      $scope.isEditMode = !$scope.isEditMode;
    };

    $scope.saveVenue = function(isValid) {
      if (!isValid) {
        return;
      }

      var venuePhoneNumber = ($scope.currentVenue.formatedPhoneNumber !== undefined) ? $scope.currentVenue.formatedPhoneNumber.replace(/\D+/g, '') : '';

      VenueSvc.update({ id: $scope.venueId}, { 
        id:     $scope.venueId,
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
        $scope.currentVenue = venue;
        $scope.switchMode();
      });
    };

  	$scope.loadVenue = function() {
      VenueSvc.getVenue({ id: $scope.venueId }, function(venue){
  			$scope.currentVenue = venue;
  		});
  	};

    $scope.deleteVenue = Modal.confirm.delete(function(venueId){

      VenueSvc.remove({
        Id: venueId
      }, function() {
        $scope.findVenues();
      });
    });

    $scope.cancelSave = function() {
      $scope.switchMode();
    };

    if (!$scope.currentVenue) {
  	   $scope.loadVenue();
    }
  });
