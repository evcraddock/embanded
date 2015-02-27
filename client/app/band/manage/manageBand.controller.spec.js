'use strict';

describe('Controller: ManageBandCtrl', function () {

  // load the controller's module
  beforeEach(module('embandedApp'));
  beforeEach(module('socketMock'));

  var ViewCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/bands/0')
      .respond([{ name: 'Test Band'}]);

    scope = $rootScope.$new();
    ManageBandCtrl = $controller('ManageBandCtrl', {
      $scope: scope
    });
  }));

  // it('should return current band', function () {
  //   //$httpBackend.flush();

  //   expect($scope.currentBand.name).to.equal('Test Band');
  // });
});
