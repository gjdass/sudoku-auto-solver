/**
 * Created by Gustave on 20/10/2016.
 */

'use strict';

angular.module('myApp.sudoku-solver-service', [])

.service('sudokuSolverService', [function () {

    this.parseGrid = function(grid) {
        return grid.split('\n').map(function(row) {
            return row.split('').map(function(num) {
                return +num;
            });
        });
    };

    this.findEmptyPos = function (grid) {
        var emptyPos = [];
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 0 || grid[i][j] === '') {
                    emptyPos.push([i, j]);
                }
            }
        }
        return emptyPos;
    };

    this.checkRow = function (number, row, grid) {
        for (var i = 0; i < grid[row].length; i++) {
            if (grid[row][i] === number) {
                return false;
            }
        }
        return true;
    };

    this.checkCol = function (number, col, grid) {
        for (var i = 0; i < grid.length; i++) {
            if (grid[i][col] === number) {
                return false;
            }
        }
        return true;
    };

    this.checkSquare = function (number, pos, grid) {
        var size = 3; // the max size of our square
        var askedRow = pos[0];
        var askedCol = pos[1];
        var upperRow = 0;
        var upperCol = 0;

        // we need to define the 3x3 zone to search in
        while (upperRow + size <= askedRow) {
            upperRow += size;
        }
        while (upperCol + size <= askedCol) {
            upperCol += size;
        }

        // now we have the row/col that start the square where our number should be put
        // let's iterate on this isolated square to see if the number is already there
        for (var i = upperRow; i < upperRow + size; i++) {
            for (var j = upperCol; j < upperCol + size; j++) {
                if (grid[i][j] === number) {
                    return false;
                }
            }
        }
        return true;
    };

    this.checkPos = function (number, pos, grid) {
        return this.checkRow(number, pos[0], grid) && this.checkCol(number, pos[1], grid) && this.checkSquare(number, pos, grid);
    };

    this.checkAll = function(grid) {
        if (this.findEmptyPos(grid).length > 0) {
            return 0;
        }
        for (var i = 0; i < grid.length; i++) {
            var check = [false, false, false, false, false, false, false, false, false];
            for (var j = 0; j < grid[i].length; j++) {
                if (!grid[i][j]) {
                    return false;
                }
                check[grid[i][j] - 1] = true;
            }
            for (var i = 0; i < check.length; i++) {
                if (!check[i]) {
                    console.log(check);
                    return 0;
                }
            }
        }
        return 2;
    };

    this.checkRules = function (grid) {
        // checks cols
        for (var i = 0; i < grid.length; i++) {
            var check = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var j = 0; j < grid[i].length; j++) {
                if (grid[i][j]) {
                    check[grid[i][j] - 1]++;
                }
            }
            for (var j = 0; j < check.length; j++) {
                if (check[j] > 1) {
                    return 0;
                }
            }
        }
        // checks rows
        for (var i = 0; i < grid.length; i++) {
            var check = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var j = 0; j < grid.length; j++) {
                if (grid[j][i]) {
                    check[grid[j][i] - 1]++;
                }
            }
            for (var j = 0; j < check.length; j++) {
                if (check[j] > 1) {
                    return 0;
                }
            }
        }
        // checks squares
        for (var i = 0; i + 1 < grid.length; i += 3) {
            for (var j = 0; j + 1 < grid[i].length; j += 3) {
                var check = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var k = i; k < i + 3; k++) {
                    for (var l = j; l < j + 3; l++) {
                        if (grid[k][l]) {
                            check[grid[k][l] - 1]++;
                        }
                    }
                }
                for (var k = 0; k < check.length; k++) {
                    if (check[k] > 1) {
                        return 0;
                    }
                }
            }
        }
        return 2;
    };

    this.makeItRain = function (grid) {
        var emptyPos = this.findEmptyPos(grid);
        if (emptyPos.length === 0) {
            return grid;
        }
        var i = 1;
        var newGrid;
        while (i <= 9) {
            if (this.checkPos(i, emptyPos[0], grid)) {
                grid[emptyPos[0][0]][emptyPos[0][1]] = i;
                newGrid = this.makeItRain(grid);
                if (this.findEmptyPos(newGrid).length === 0) {
                    return newGrid;
                }
            }
            i++;
        }
        grid[emptyPos[0][0]][emptyPos[0][1]] = 0;
        return grid;
    };
}]);