'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', function ($scope, socket, $routeParams, $http) {
      $scope.stuff=[];
      //console.log(socket);
      socket.on('message',function(data){ 
        //console.log(data);
        $scope.stuff.push(data);
      });
      $scope.$on('socket:message', function (ev, data) {
        console.log(data);
     });
  });
