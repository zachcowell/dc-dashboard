'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
}).
  filter('startFrom', function() {
		return function(input, start) {
		    start = +start; 
		    return input.slice(start);
		}
}).
  filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
