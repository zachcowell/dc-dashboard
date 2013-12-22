'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'ngRoute',
  'highcharts-ng',
  'ngSocket',
  'leaflet-directive'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/about', {
      templateUrl: 'partials/partial1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}).run(function (socket) {
  socket.forward('error');
});
