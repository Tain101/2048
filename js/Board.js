//Taylor Premo - 2048
//Game.js

/**
 * Handles management of board mechanics
 * and moving pieces on the board.
 */

var boardSize = {
    width: 4,
    height: 4
};
var pieceSize = canvasSize / 4 * 0.95;


var Board = function() {
    this.pieces = [
        []
    ];
    this.graphicsArray = [
        []
    ];
    this.textArray = [
        []
    ];

    this.preload = function() {
        //no preloading needed
    };

    this.create = function() {
        var i, j;
        for (i = 0; i < boardSize.height; i++) {
            for (j = 0; j < boardSize.width; j++) {
                if (this.pieces[j] === undefined) {
                    this.pieces[j] = [];
                    this.graphicsArray[j] = [];
                    this.textArray[j] = [];
                }
                this.pieces[j][i] = new Piece();
                this.pieces[j][i].setValue(0);
                this.pieces[j][i].setLocation(j, i);
            }
        }
    };

    this.start = function() {
        this.addRandomPiece();
        this.addRandomPiece();
    };

    this.update = function() {};

    this.addRandomPiece = function() {
        var emptySquare = this.getEmptySquare();
        var randomValue = getRandomValue(0, 1); //Math.random();
        if (getRandomValue(0, 1) > 0.8) {
            randomValue = 4;
        } else {
            randomValue = 2;
        }

        if (emptySquare !== false) {
            emptySquare.setValue(randomValue);
        } else {
            return false;
        }

        return true;
    };

    this.getEmptySquare = function() {
        var emptyList = [];
        var index = 0;
        var i, j;

        //get list of empty squares
        for (i = 0; i < boardSize.height; i++) {
            for (j = 0; j < boardSize.width; j++) {
                if (this.pieces[j][i].value === 0) {
                    emptyList[index] = this.pieces[j][i];
                    index++;
                }
            }
        }

        if (index === 0) {
            console.log("no empty squares!");
            return false;
        }

        //pick random index
        var randomIndex = getRandomValue(0, 1) * (index + 1);
        randomIndex = Math.floor(randomIndex);
        var counter = 0;
        while (emptyList[randomIndex] === undefined) {
            if (counter >= index) {
                alert("no empty squares!");
            }
            randomIndex = (randomIndex + 1) % index;
            counter++;
        }

        return emptyList[randomIndex];
    };

    this.getGraphics = function(location) {
        return this.graphicsArray[location.x][location.y];
    };

    this.getText = function(location) {
        return this.textArray[location.x][location.y];
    };

    this.getPiece = function(x, y) {
        return this.pieces[x][y];
    };
};