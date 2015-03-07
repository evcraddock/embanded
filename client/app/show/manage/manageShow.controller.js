'use strict';

angular.module('embandedApp')
  .controller('ManageShowCtrl', function ($scope, $stateParams, $location, Auth, Modal, ShowSvc, VenueSvc, BandSvc) {
  	$scope.showId = $stateParams.showId;
    $scope.bandId = $stateParams.bandId;
    $scope.venueId = $stateParams.venueId;

    $scope.isViewMode = true;
    $scope.isEditMode = false;
    $scope.isAdmin = Auth.isAdmin();

    $scope.hstep = 1;
    $scope.mstep = 15;


    $scope.switchMode = function(){
      $scope.isViewMode = !$scope.isViewMode;
      $scope.isEditMode = !$scope.isEditMode;
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

    $scope.saveShow = function(isValid) {
      if (!isValid) {
        return;
      }

      ShowSvc.update({ id: $scope.showId}, { 
        id:     $scope.currentShow.showId,
        name: $scope.currentShow.name,
        bandName:     $scope.currentShow.band.name,
        venueName:    $scope.currentShow.venue.name,
        showDate: $scope.currentShow.showDate,
        band: $scope.currentShow.band._id,
        venue: $scope.currentShow.venue._id
      }, function() {
        
        $scope.switchMode();
      });
    };

  	$scope.loadShow = function() {
      ShowSvc.getShow({ id: $scope.showId }, function(show){
  			$scope.currentShow = show;
  		});
  	};

    $scope.cancelSave = function() {
      $scope.switchMode();
    };

    $scope.deleteShow = Modal.confirm.delete(function(showId){
      ShowSvc.remove({
        id: showId
      }, function() {

        $location.path('/').replace().notify(false);
      });
    });

    if (!$scope.currentShow){
  	 $scope.loadShow();
    }

    $scope.open = function () {
        $scope.isDateOpen = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

  });
