/**
 * Created by Gustave on 19/10/2016.
 */

'use strict';

angular.module('myApp.grid-directive', [])

    .directive('grid', ['sudokuSolverService', function(sudokuSolverService) {

        function link($scope) {
            console.log('Initializing grid.directive...');
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
            $scope.savedGrid = angular.copy($scope.datas);
            $scope.grid = angular.copy($scope.datas);
            $scope.trim = function () {
                // replacing 0 by empty string (for better display)
                for (var i = 0; i < $scope.grid.length; i++) {
                    for (var j = 0; j < $scope.grid[i].length; j++) {
                        if (!$scope.grid[i][j]) {
                            $scope.grid[i][j] = '';
                        }
                    }
                }
            };
            $scope.trim();
        }

        function controller($scope, $element) {
            $scope.editMode = false;
            $scope.solverOk = 1; // 0: fail; 1: neutral; 2: success
            $scope.showAlert = false;
            $scope.rulesOk = 1;

            $scope.$watch(function ($scope) { return $scope.solverOk; }, function () {
                var elmt = $element.find('.alert');
                elmt.removeClass('alert-success');
                elmt.removeClass('alert-danger');
                showAlert($scope.solverOk, 'Great success ! ;-)', 'It didn\'t work out :\'(');
            });
            $scope.$watch(function ($scope) { return $scope.rulesOk; }, function () {
                var elmt = $element.find('.alert');
                elmt.removeClass('alert-success');
                elmt.removeClass('alert-danger');
                showAlert($scope.rulesOk, 'Rules are OK for now :-)', 'Nope, something is wrong !');
            });

            $scope.solve = function () {
                console.log('Solving the grid ...');
                $scope.grid = sudokuSolverService.makeItRain($scope.grid);
                $scope.solverOk = sudokuSolverService.checkAll($scope.grid);
                console.log('Solved !');
            };

            $scope.check = function () {
                $scope.rulesOk = sudokuSolverService.checkRules($scope.grid);
            };

            $scope.edit = function () {
                $scope.editMode = !$scope.editMode;
            };

            $scope.reset = function () {
                $scope.grid = angular.copy($scope.savedGrid);
                $scope.editMode = false;
                $scope.trim();
                $scope.solverOk = 1;
            };

            function showAlert(toSwitchOn, goodMsg, badMsg) {
                var elmt = $element.find('.alert');
                switch (toSwitchOn) {
                    case 0:
                        $scope.showAlert = true;
                        elmt.addClass('alert-danger');
                        elmt.html(badMsg);
                        break;
                    case 1:
                        $scope.showAlert = false;
                        elmt.html('');
                        break;
                    case 2:
                        $scope.showAlert = true;
                        elmt.addClass('alert-success');
                        elmt.html(goodMsg);
                        break;
                }
            }

        }

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'directives/grid.directive.html',
            scope: {
                withsteps: '=',
                datas: '='
            },
            link: link,
            controller: controller
        };
    }]);