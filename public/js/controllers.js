'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', function ($scope, socket, $routeParams, $http) {
      $scope.stuff=[];
      //console.log(socket);
      socket.on('data',function(data,ev){ 
        console.log(data);
        //$scope.stuff.push(ev);
      });
      //$scope.$on('socket:message', function (ev, data) {
        //console.log(data);
     //});
  });
