'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', function ($scope, socket, $routeParams, $http) {
      var collectionSplice = function (collection,lengthCheck,margin){
        if (collection.length > lengthCheck) return collection.splice(margin);
        else return collection;
      };

      var markerMaker = function(tweet) {
        return [
          '<a href="http://twitter.com/',tweet.user.screen_name,'">',
              tweet.user.screen_name,
          '</a> :',
          tweet.text
        ].join('');
      }

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
        $scope.tweets = collectionSplice($scope.tweets,121,11);
        if (data.coordinates != null){
          $scope.markers.push({
                  lat: data.coordinates.coordinates[1],
                  lng: data.coordinates.coordinates[0],
                  message: markerMaker(data),
                  draggable: false
            });
          $scope.markers = collectionSplice($scope.markers,121,11);
        }
      });

      $scope.changeTweetDisplay = function(tweet) { 
        $scope.tweetDisplay = tweet.text; 
        $scope.user = '@' + tweet.user.screen_name + ' in ' + tweet.place.full_name;
        if (tweet.coordinates != null){
          $scope.markers.highlightMarker = {
                    lat: tweet.coordinates.coordinates[1],
                    lng: tweet.coordinates.coordinates[0],
                    message: markerMaker(tweet),
                    draggable: false,
                    focus: true
              };
        }
      };
  }).
  controller('ChatCtrl', function ($scope, socket, $routeParams, $http) {
  
  });
