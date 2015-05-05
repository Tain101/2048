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
        for (var i = 0; i < boardSize.height; i++) {
            for (var j = 0; j < boardSize.width; j++) {
                this.draw(this.pieces[j][i]);
            }
        }
        /////////////////////
        var graphics = game.add.graphics(0, 0);
        // draw a rectangle
        graphics.lineStyle(5, 0x000000, 1);
        graphics.beginFill(0x888888, 1);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
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
        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(5, 0x000000, 1);
        graphics.beginFill(piece.color, 1);
        graphics.drawRect(
            (margin + pieceSize * piece.getX()), (margin + pieceSize * piece.getY()), (pieceSize), (pieceSize)
        );
        graphics.endFill();
    };

    this.addRandomPiece = function() {
        var emptySquare = this.getEmptySquare();
        var randomValue = Math.random();
        if (Math.random() > 0.8) {
            randomValue = 4;
        } else {
            randomValue = 2;
        }

        emptySquare.setValue(randomValue);
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
            return;
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

    this.slideUp = function() {
        var hasSlid = false;
        console.log("slideUp");
        //start from bottom, move up.
        //this lets us move up as much as possible.
        //get list of empty squares
        for (var i = boardSize.height - 1; i >= 1; i--) {
            //we dont check the top row for moving up
            for (var j = boardSize.width - 1; j >= 0; j--) {
                if (this.pieces[j][i].value === 0) {
                    continue;
                }
                var piece = this.pieces[j][i];
                var x = piece.getX();
                var y = piece.getY();
                if (this.pieces[x][y - 1].value === 0) { /*piece above is empty*/
                    /*move piece up*/
                    this.pieces[x][y - 1].setValue(piece.value);
                    piece.setValue(0);
                    hasSlid = true;
                } else if (this.pieces[x][y - 1].value == piece.value) { /*piece above.value == this.value*/
                    /*combine*/
                    this.pieces[x][y - 1].setValue(piece.value * 2);
                    piece.setValue(0);
                    hasSlid = true;
                }
            }
        }
        return hasSlid;
    };
    this.slideDown = function() {
        var hasSlid = false;
        for (var i = 0; i < boardSize.height - 1; i++) {
            //we dont check the bottom row for moving down
            for (var j = 0; j < boardSize.width; j++) {
                if (this.pieces[j][i].value === 0) {
                    continue;
                }
                var piece = this.pieces[j][i];
                var x = piece.getX();
                var y = piece.getY();
                if (this.pieces[x][y + 1].value === 0) { /*piece below is empty*/
                    /*move piece down*/
                    this.pieces[x][y + 1].setValue(piece.value);
                    piece.setValue(0);
                    hasSlid = true;
                } else if (this.pieces[x][y + 1].value == piece.value) { /*piece below.value == this.value*/
                    /*combine*/
                    this.pieces[x][y + 1].setValue(piece.value * 2);
                    piece.setValue(0);
                    hasSlid = true;
                }
            }
        }
        return hasSlid;
    };

    this.slideLeft = function() {
        var hasSlid = false;
        for (var j = boardSize.width - 1; j >= 1; j--) {
            for (var i = boardSize.height - 1; i >= 0; i--) {
                if (this.pieces[j][i].value === 0) {
                    continue;
                }
                var piece = this.pieces[j][i];
                var x = piece.getX();
                var y = piece.getY();
                if (this.pieces[x - 1][y].value === 0) {
                    this.pieces[x - 1][y].setValue(piece.value);
                    piece.setValue(0);
                    hasSlid = true;
                } else if (this.pieces[x - 1][y].value == piece.value) {
                    this.pieces[x - 1][y].setValue(piece.value * 2);
                    piece.setValue(0);
                    hasSlid = true;
                }
            }
        }
        return hasSlid;
    };

    this.slideRight = function() {
        var hasSlid = false;
        for (var j = 0; j < boardSize.width - 1; j++) {
            for (var i = 0; i < boardSize.height; i++) {
                if (this.pieces[j][i].value === 0) {
                    continue;
                }
                var piece = this.pieces[j][i];
                var x = piece.getX();
                var y = piece.getY();
                if (this.pieces[x + 1][y].value === 0) {
                    this.pieces[x + 1][y].setValue(piece.value);
                    piece.setValue(0);
                    hasSlid = true;
                } else if (this.pieces[x + 1][y].value == piece.value) {
                    this.pieces[x + 1][y].setValue(piece.value * 2);
                    piece.setValue(0);
                    hasSlid = true;
                }
            }
        }
        return hasSlid;
    };
};