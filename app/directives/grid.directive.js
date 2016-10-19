/**
 * Created by Gustave on 19/10/2016.
 */

'use strict';

angular.module('myApp.grid-directive', [])

    .directive('grid', [function() {

        function link(scope, element, attrs) {
            console.log('Initializing grid.directive...');
        }

        return {
            restrict: 'E',
            templateUrl: 'directives/grid.directive.html',
            scope: {
                withsteps: '=',
                datas: '='
            },
            link: link
        };
    }]);