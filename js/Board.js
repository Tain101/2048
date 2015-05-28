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
var graphics, text;


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

    this.init = function() {
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

                this.graphicsArray[j][i] = phaserGame.add.graphics(0, 0);
                this.textArray[j][i] = phaserGame.add.text(
                    pieceSize * this.pieces[j][i].getX() + pieceSize / 2,
                    pieceSize * this.pieces[j][i].getY() + pieceSize / 2,
                    this.pieces[j][i].value
                );
            }
        }
    };

    this.start = function() {
        this.addRandomPiece();
        this.addRandomPiece();
    };

    /**
     * generates the grid lines separating the boxes
     */
    this.displayGrid = function() {
        // var i, j;
        // for (i = 0; i < boardSize.height; i++) {
        //     for (j = 0; j < boardSize.width; j++) {
        //         this.draw(this.pieces[j][i]);
        //     }
        // }

        this.drawBoard();

        /////////////////////
        var graphics = phaserGame.add.graphics(0, 0);
        // draw a rectangle
        graphics.lineStyle(5, 0x5f5f5f, 1);
        graphics.beginFill(0x242424, 1);

        graphics.endFill();
    };

    this.draw = function(piece) {
        if (graphics === undefined) {
            graphics = phaserGame.add.graphics(0, 0);
        }
        graphics.lineStyle(5, 0x000000, 1);
        graphics.beginFill(piece.color, 1);
        graphics.drawRect(
            (margin + pieceSize * piece.getX()), (margin + pieceSize * piece.getY()), (pieceSize), (pieceSize)
        );
        graphics.endFill();

        if (text === undefined) {
            text = phaserGame.add.text(
                pieceSize * piece.getX() + pieceSize / 2,
                pieceSize * piece.getY() + pieceSize / 2,
                piece.value
            );
        }
        text.fill = "#d9d9d9";
        text.align = 'center';
    };

    //go through each square on the board, and update the box & text.
    this.drawBoard = function() {
        for (i = 0; i < boardSize.height; i++) {
            for (j = 0; j < boardSize.width; j++) {
                this.drawPiece(this.pieces[j][i]);
            }
        }
    };

    this.drawPiece = function(piece) {
        var graphics = this.getGraphics(piece.location);
        var text = this.getText(piece.location);

        graphics.beginFill(piece.color, 1);
        graphics.drawRect(
            (margin + pieceSize * piece.getX()), (margin + pieceSize * piece.getY()), (pieceSize), (pieceSize)
        );
        graphics.endFill();

        text.text = piece.value;
        text.fill = "#d9d9d9";

    };

    this.addRandomPiece = function() {
        var emptySquare = this.getEmptySquare();
        var randomValue = Math.random();
        if (Math.random() > 0.8) {
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
        var randomIndex = Math.random() * (index + 1);
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
};