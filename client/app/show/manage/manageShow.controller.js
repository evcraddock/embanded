'use strict';

angular.module('embandedApp')
  .controller('ManageShowCtrl', function ($scope, $stateParams, $location, Auth, socket, Modal, ShowSvc, VenueSvc, BandSvc) {
  	$scope.showId = $stateParams.showId;
    $scope.bandId = $stateParams.bandId;
    $scope.venueId = $stateParams.venueId;

    $scope.isViewMode = true;
    $scope.isEditMode = false;
    $scope.isAdmin = Auth.isAdmin();

    //$scope.showDate = new Date();
    //$scope.showTime = new Date();
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
    }

    $scope.getBands = function(searchTerm) {
      BandSvc.queryAll({ name: searchTerm }, function(results){
          $scope.foundBands = results;
      });

      return $scope.foundBands;
    }

    $scope.saveShow = function(isValid) {
      if (!isValid) return;

      // var date = $scope.showDate.split("T");
      // var time = $scope.showTime.split("T");
      // var showDateTime = new Date(date[0] + ' ' + time[1]);


      ShowSvc.update({ id: $scope.showId}, { 
        id:     $scope.currentShow.showId,
        name: $scope.currentShow.name,
        bandName:     $scope.currentShow.band.name,
        venueName:    $scope.currentShow.venue.name,
        showDate: $scope.currentShow.showDate,
        band: $scope.currentShow.band._id,
        venue: $scope.currentShow.venue._id
      }, function(show) {
        
        $scope.switchMode();
        //socket.syncUpdates('show', $scope.currentShow);
      });
    };

  	$scope.loadShow = function() {
      ShowSvc.getShow({ id: $scope.showId }, function(show){
  			$scope.currentShow = show;

        // var date = $scope.currentShow.showDate.split("T");
        // var datepart = date[0].split('-');
        // var timepart = date[1].split(':');

        // $scope.showDate = new Date(datepart[0], datepart[1], datepart[2], timepart[0], timepart[1], 0, 0);

        // $scope.showTime = $scope.showDate;
        
  		});
  	};

    $scope.cancelSave = function() {
      $scope.switchMode();
    }

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
