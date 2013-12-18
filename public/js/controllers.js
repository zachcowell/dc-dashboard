'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', function ($scope, $routeParams, $http) {

   $scope.chartConfig = {
        options: { 
          chart: { type: 'spline' },
          legend: { enabled: true },
          plotOptions: { spline: { marker: { enabled: false } } }, 
        },
          xAxis: { title: { enabled: true, text: 'Year' },
          labels: { formatter: function () { return Highcharts.numberFormat(this.value, 0, '', ''); } } },
          yAxis: { reversed: true, title: { text: 'Rank' }, min: 1, max: 900},              
        title: { text: 'Popularity Over Time' },
        series: [],
        credits: { enabled: false },
        loading: false
    };

    $scope.retrieveData = function(){
      $http({
        method: 'GET',
        url: '/name/' + $scope.name
      }).
      success(function (data, status, headers, config) {
        if (! data.length > 0) { alert('No results for ' + $scope.name); }
        else {
          var allRecords = Metrics.getRecordsByGender(data,$scope.years,$scope.gender);
          
          $scope.chartConfig.series.push({
            name: data[0].name,
            data: Metrics.getRankAndYearSeriesPair(allRecords)
          });
        }
        
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
    };

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
