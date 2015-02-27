'use strict';

angular.module('embandedApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route, useWholePath) {
      var usePath = useWholePath != undefined ? useWholePath : false;

      var currentPath = $location.path();

      if (usePath) {
        return currentPath.substring(0, route.length) === route;
      }

      return route === $location.path();
    };
  });