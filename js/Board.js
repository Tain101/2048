//Taylor Premo - 2048
//Game.js

/**
 * Handles management of board mechanics
 * and moving pieces on the board.
 */

var Board = function() {
    this.pieces = [
        []
    ];

    this.init = function() {
        for (var i = 0; i < boardSize.height; i++) {
            for (var j = 0; j < boardSize.width; j++) {
                if (this.pieces[j] === undefined) {
                    this.pieces[j] = [];
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

    /**
     * generates the grid lines separating the boxes
     */
    this.displayGrid = function() {
        var i, j;
        for (i = 0; i < boardSize.height; i++) {
            for (j = 0; j < boardSize.width; j++) {
                this.draw(this.pieces[j][i]);
            }
        }
        /////////////////////
        var graphics = phaserGame.add.graphics(0, 0);
        // draw a rectangle
        graphics.lineStyle(5, 0x000000, 1);
        graphics.beginFill(0x888888, 1);
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                // graphics.drawRect(
                //     (margin + pieceSize * j), (margin + pieceSize * i), (pieceSize), (pieceSize)
                // );
                // text = game.add.text(
                //     margin + pieceSize * j + pieceSize / 3,
                //     margin + pieceSize * i + pieceSize / 3,
                //     'text'
                // );
                // text.fill = "#dddddd";
                // text.align = 'center';
            }
        }
        graphics.endFill();
    };

    this.draw = function(piece) {
        var graphics = phaserGame.add.graphics(0, 0);
        graphics.lineStyle(5, 0x000000, 1);
        graphics.beginFill(piece.color, 1);
        graphics.drawRect(
            (margin + pieceSize * piece.getX()), (margin + pieceSize * piece.getY()), (pieceSize), (pieceSize)
        );
        graphics.endFill();
        text = phaserGame.add.text(
            pieceSize * piece.getX() + pieceSize / 2,
            pieceSize * piece.getY() + pieceSize / 2,
            piece.value
        );
        text.fill = "#ffffff";
        text.align = 'center';
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
        for (var i = 0; i < boardSize.height; i++) {
            for (var j = 0; j < boardSize.width; j++) {
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
};