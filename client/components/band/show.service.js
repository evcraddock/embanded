'use strict';

angular.module('embandedApp')

	.factory('ShowSvc', function($resource) {

		return $resource('/api/shows/:id',
	        {id: '@_id' },
	        {
	            'update': {method: 'PUT'},
	            'add': { method: 'POST' },
	            'queryAll': { method: 'GET', isArray: true },
	            'getShow': { method: 'GET', isArray: false },
	            'remove': { method: 'DELETE' }
	        }
    	);
	});