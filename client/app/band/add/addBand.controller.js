'use strict';

angular.module('embandedApp')
  .controller('AddBandCtrl', function ($scope, $stateParams, $location, BandSvc) {

  	$scope.currentBand = {};
    $scope.isSaved = false;

    $scope.saveBand = function(isValid) {
      if (!isValid) {
        return;
      }

      BandSvc.add({ 
        name:     $scope.currentBand.name,
        website:  $scope.currentBand.website,
        description: $scope.currentBand.description,
        active:   $scope.currentBand.active
      }, function(band) {
          var viewBandLink = '/bands/' + band._id;
          $location.path(viewBandLink).replace().notify(false);
      });
    };

    $scope.cancelSave = function() {
      $location.path('/bands').replace().notify(false);
    };
    
  });
