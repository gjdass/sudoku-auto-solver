/**
 * Created by Gustave on 19/10/2016.
 */

'use strict';

angular.module('myApp.grid-factory', [])

.factory('gridFactory', ['$q', function ($q) {

    var getGrids = function () {
        var q = $q.defer();
        q.resolve(
            [
                [0,7,6,0,1,0,0,4,3],
                [0,0,0,7,0,2,9,0,0],
                [0,9,0,0,0,6,0,0,0],
                [0,0,0,0,6,3,2,0,4],
                [4,6,0,0,0,0,0,1,9],
                [1,0,5,4,2,0,0,0,0],
                [0,0,0,2,0,0,0,9,0],
                [0,0,4,8,0,7,0,0,1],
                [9,1,0,0,5,0,7,2,0]
            ]
        );
        return q.promise;
    };

    return {
        getGrids: getGrids
    };
}]);