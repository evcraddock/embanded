'use strict';

angular.module('embandedApp')

	.factory('VenueSvc', function($resource) {

		return $resource('/api/venues/:id',
	        {id: '@_id' },
	        {
	            'update': {method: 'PUT'},
	            'add': { method: 'POST' },
	            'queryAll': { method: 'GET', isArray: true },
	            'getVenue': { method: 'GET', isArray: false },
	            'remove': { method: 'DELETE' }
	        }
    	);
	});