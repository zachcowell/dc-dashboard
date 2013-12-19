'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', function ($scope, socket, $routeParams, $http) {
      $scope.tweets=[];
      
      socket.on('data',function(data){ 
        $scope.tweets.push(data);
        if ($scope.tweets.length > 121 ) $scope.tweets = $scope.tweets.splice(11);
      });
      $scope.changeTweetDisplay = function(tweet) { 
        $scope.tweetDisplay = tweet.text; 
        $scope.user = '@' + tweet.user.screen_name;
      };
  });
