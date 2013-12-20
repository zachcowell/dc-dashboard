'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', function ($scope, socket, $routeParams, $http) {
      $scope.tweets=[];
      $scope.markers = [];
      $scope.dc = { lat: 38.891121, lng: -77.041481, zoom: 10 };
      $scope.mapDefaults = {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        zoomControlPosition: 'topright',
        tileLayerOptions: { opacity: 0.9, detectRetina: true, reuseTiles: true },
        scrollWheelZoom: false
      };

      socket.on('data',function(data){ 
        $scope.tweets.push(data);
        if ($scope.tweets.length > 121 ) $scope.tweets = $scope.tweets.splice(11);
        //console.log(data.user.profile_image_url);
        if (data.coordinates != null){
          $scope.markers.push({
                  lat: data.coordinates.coordinates[1],
                  lng: data.coordinates.coordinates[0],
                  message: "<strong>"+data.user.screen_name+"</strong>",
                  draggable: false
            });
        }
      });

      $scope.changeTweetDisplay = function(tweet) { 
        $scope.tweetDisplay = tweet.text; 
        $scope.user = '@' + tweet.user.screen_name + ' in ' + tweet.place.full_name;
        
      };
  });
