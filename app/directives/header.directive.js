/**
 * Created by Gustave on 20/10/2016.
 */

angular.module('myApp.header-directive', [])

.directive('header', [function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/header.directive.html'
    };
}]);