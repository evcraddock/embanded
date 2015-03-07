'use strict';

angular.module('embandedApp')
  .controller('ManageBandCtrl', function ($scope, $stateParams, $location, Auth, Modal, BandSvc) {
  	$scope.bandId = $stateParams.bandId;
    $scope.isViewMode = true;
    $scope.isEditMode = false;
    $scope.isAdmin = Auth.isAdmin();
    
  	$scope.currentBand = null;
    $scope.isSaved = false;

    $scope.switchMode = function(){
      $scope.isViewMode = !$scope.isViewMode;
      $scope.isEditMode = !$scope.isEditMode;
    };

    $scope.saveBand = function(isValid) {
      if (!isValid) {
        return;
      }

      BandSvc.update({ id: $scope.bandId}, { 
        id:     $scope.bandId,
        name:     $scope.currentBand.name,
        website:  $scope.currentBand.website,
        description: $scope.currentBand.description,
        active:   $scope.currentBand.active
      }, function(band) {
        
        $scope.currentBand = band;
        //socket.syncUpdates('band', $scope.currentBand);
        $scope.switchMode();
      });
    };

  	$scope.loadBand = function() {
      BandSvc.getBand({ id: $scope.bandId }, function(band){
  			$scope.currentBand = band;
  			//socket.syncUpdates('band', $scope.currentBand);
  		});
  	};

    $scope.deleteBand = Modal.confirm.delete(function(bandId){
      BandSvc.remove({
        id: bandId
      }, function() {
        $scope.findBands();
      });
    });

    $scope.cancelSave = function() {
      $scope.switchMode();
    };

    if (!$scope.currentBand){
  	 $scope.loadBand();
    }

  });
