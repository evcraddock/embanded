'use strict';

angular.module('embandedApp')
  .controller('VenueSearchCtrl', function ($scope, VenueSvc, Auth) {
  	$scope.foundVenues = [];
    $scope.isAdmin = Auth.isAdmin();
    
	 $scope.findVenues = function() {
  		
      VenueSvc.queryAll({ name: $scope.searchTerm }, function(foundVenues){
          $scope.foundVenues = foundVenues;
          //socket.syncUpdates('venue', $scope.foundVenues);
      });
  	};

    $scope.findVenues();
  });
