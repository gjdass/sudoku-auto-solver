'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'gridFactory', function($scope, gridFactory) {
  $scope.grid = [];

  activate();

  function activate() {
    gridFactory.getGrids().then(function (grid) {
      $scope.grid = grid;
    });
  }

}]);