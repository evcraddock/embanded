'use strict';

describe('Controller: VenueSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('embandedApp'));
  beforeEach(module('socketMock'));

  var VenueSearchCtrl, scope, $httpBackend;

  //Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/venues')
      .respond([
        { name: 'Test Venue' }, 
        { name: 'Test Venue 2' },
        { 
          name: 'Test Venue 3',
          address: {
            city: 'Test',
            state: 'Texas',
            zipCode: '12345',
            streetAddress: '123 Test Street',
            location: 'Test, Texas'
          } 
        }
      ]);

    scope = $rootScope.$new();
    VenueSearchCtrl = $controller('VenueSearchCtrl', {
      $scope: scope
    });
  }));

  it('should list all active venues', function () {
    $httpBackend.flush();
    expect(scope.foundVenues.length).toBe(3);
  });

  it ('should display name', function() {
    $httpBackend.flush();
    expect(scope.foundVenues[2].name).toBe('Test Venue 3');
  });

  it ('should display location', function() {
    $httpBackend.flush();
    expect(scope.foundVenues[2].address.location).toBe('Test, Texas');
  });
});
