'use strict';

describe('Controller: BandSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('embandedApp'));
  beforeEach(module('socketMock'));

  var BandSearchCtrl, scope, $httpBackend;

  //Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/bands')
      .respond([
        { name: 'Test Band' }, 
        { name: 'Test Band 2' },
        { name: 'Test Band 3' }
        ]);

    scope = $rootScope.$new();
    BandSearchCtrl = $controller('BandSearchCtrl', {
      $scope: scope
    });
  }));

  it('should list all active bands', function () {
    $httpBackend.flush();
    expect(scope.foundBands.length).toBe(3);
  });
});
