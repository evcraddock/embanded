'use strict';

angular.module('embandedApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Modal) {

    $scope.delete = Modal.confirm.delete(function(user){
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    });

    $scope.loadUsers = function() {
      $scope.users = User.query();
    };

    $scope.changeRole = function(user) {

      var role = user.role;

      if (user.role === 'user') {
        role = 'admin';
      }

      if (user.role === 'admin') {
        role = 'user';
      }

      Auth.updateRole(user._id, role, function() {
        $scope.loadUsers();
      });


    };

    $scope.loadUsers();
  });
