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

      $scope.tweets= [];
      $scope.markers = [];

      $scope.dc = { lat: 38.891121, lng: -77.041481, zoom: 10 };
      $scope.mapDefaults = {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        zoomControlPosition: 'topright',
        tileLayerOptions: { opacity: 0.9, detectRetina: true, reuseTiles: true },
        scrollWheelZoom: false
      };

      socket.on('tweetmap',function(data){ 
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
      };
  }).
  controller('HeaderCtrl', function ($scope, $location) {

  }).
  controller('NearCtrl', function ($scope, $routeParams, $http) {
      var markerMaker = function(tweet) {
        return [
          '<a href="http://twitter.com/',tweet.user.screen_name,'">',
              tweet.user.screen_name,
          '</a> :',
          tweet.text
        ].join('');
      }

      $scope.markers = [];
      $scope.tweets= [];
      var tweetMarker = L.AwesomeMarkers.icon({ icon: 'twitter', prefix: 'fa', markerColor: 'cadetblue' });
      
      $scope.dc = { lat: 38.891121, lng: -77.041481, zoom: 12 };
      $scope.mapDefaults = {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        zoomControlPosition: 'topright',
        tileLayerOptions: { opacity: 0.9, detectRetina: true, reuseTiles: true },
        scrollWheelZoom: false
      };
      
      $scope.retrieveData = function(){
        $http({
          method: 'GET',
          url: '/api/local/geocode:38.877831,-77.019256,0.2km'
        }).
        success(function (data, status, headers, config) {
          _.each(data,function(t) { 
            $scope.tweets.push(t); 
            if (t.coordinates != null){
            $scope.markers.push({
                  lat: t.coordinates.coordinates[1],
                  lng: t.coordinates.coordinates[0],
                  message: markerMaker(t),
                  icon: tweetMarker,
                  draggable: false
            });
          }
          });
        }).
        error(function (data, status, headers, config) { });
      }();

        $scope.$on("leafletDirectiveMap.click", function(event, args){
            var leafEvent = args.leafletEvent;
            var userMarker = L.AwesomeMarkers.icon({ icon: 'star', prefix: 'glyphicon', markerColor: 'red' });
            var markerObj = { lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng, icon: userMarker };
                        
            
        });
      

      
  });
