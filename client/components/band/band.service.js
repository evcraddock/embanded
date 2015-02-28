'use strict';

angular.module('embandedApp')

	.factory('BandSvc', function($resource) {

		return $resource('/api/bands/:id',
	        {id: '@_id' },
	        {
	            'update': {method: 'PUT'},
	            'add': { method: 'POST' },
	            'queryActive': { method: 'GET', params: {'active': true }, isArray: true },
	            'queryAll': { method: 'GET', isArray: true },
	            'getBand': { method: 'GET', isArray: false },
	            'remove': { method: 'DELETE' }
	        }
    	);
	});