'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'ngRoute',
  'ngSocket',
  'leaflet-directive'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/about', {
      templateUrl: 'partials/about'
    }).
    when('/contact', {
      templateUrl: 'partials/contact'
    }).
    when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}).run(function (socket) {
  socket.forward('error');
});
