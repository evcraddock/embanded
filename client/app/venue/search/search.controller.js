'use strict';

angular.module('embandedApp')
  .controller('VenueSearchCtrl', function ($scope, socket, VenueSvc) {
  	$scope.foundVenues = [];
    
	 $scope.findVenues = function() {
  		
      VenueSvc.queryAll({ name: $scope.searchTerm }, function(foundVenues){
          $scope.foundVenues = foundVenues;
          //socket.syncUpdates('venue', $scope.foundVenues);
      });
  	};

    $scope.findVenues();
  });
