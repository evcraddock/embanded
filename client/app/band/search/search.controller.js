'use strict';

angular.module('embandedApp')
  .controller('BandSearchCtrl', function ($scope, $http, Auth, socket, BandSvc) {
  	$scope.foundBands = [];
    $scope.isAdmin = Auth.isAdmin();

	 $scope.findBands = function() {
  		BandSvc.queryAll({ name: $scope.searchTerm }, function(foundBands){
          $scope.foundBands = foundBands;
          socket.syncUpdates('band', $scope.foundBands);
      });
  	};

    $scope.findBands();
  });
