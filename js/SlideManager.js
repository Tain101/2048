/*
    When a key is pressed, all tiles try and move in that direction.
    If two pieces have the same value, they will merge & double in value.
    If a piece has merged already, it will not merge again in this turn.
    The pieces that 'land' first have priority for the merge.

    Strategy:
        Loop through all pieces in the opposite direction of the key pressed.
        When a piece is found, move it as far as possible.
        When a merge is found, handle the merge & set a flag on the piece.
 */
var SlideManager = function(board) {
    this.board = board;

    /**
     * Go from top to bottom.
     * if a piece is found, move up as far as possible
     * if merge, the new piece = sum of two pieces (*2)
     *              and set piece.wasMerged = true;
     *                      which will need to be reset later.
     *
     * @return {[type]} [description]
     */

    this.slideUp = function() {
        var y = 0;
        while (y <= boardSize.height - 1) {
            for (var x = boardSize.width - 1; x >= 0; x--) {
                this.slidePieceUp(board.pieces[x][y]);
            }
            y++;
        }
    };

    this.slideDown = function() {
        var y = boardSize.height - 1;
        while (y >= 0) {
            for (var x = boardSize.width - 1; x >= 0; x--) {
                this.slidePieceDown(board.pieces[x][y]);
            }
            y--;
        }
    };

    this.slideLeft = function() {
        var x = 0;
        while (x <= boardSize.width - 1) {
            for (var y = boardSize.height - 1; y >= 0; y--) {
                this.slidePieceLeft(board.pieces[x][y]);
            }
            x++;
        }
    };

    this.slideRight = function() {
        var x = boardSize.width - 1;
        while (x >= 0) {
            for (vary = boardSize.height - 1; y >= 0; y--) {
                this.slidePieceRight(board.pieces[x][y]);
            }
            x--;
        }
    };

    this.slidePieceUp = function(piece) {
        if (piece.value === 0) return;
        if (piece.getY() === 0) return;
        var curPiece = piece;
        var upPiece = board.pieces[curPiece.getX()][curPiece.getY() - 1];

        while (curPiece.getY() !== 0 && upPiece.value === 0) {
            //move up until we find a merge or hit the edge.
            upPiece.setValue(curPiece.value);
            curPiece.setValue(0);
            curPiece = upPiece;
            upPiece = board.pieces[curPiece.getX()][curPiece.getY() - 1];
            // if (curPiece.getY() < 1) return;
            // if (upPiece === undefined) return;
        }

        if (upPiece !== undefined &&
            curPiece.getY !== 0 &&
            upPiece.value == curPiece.value &&
            !upPiece.wasMerged) {

            //merge
            upPiece = board.pieces[curPiece.getX()][curPiece.getY() - 1];
            upPiece.setValue(curPiece.value * 2);
            curPiece.setValue(0);
            curPiece = upPiece;
            curPiece.wasMerged = true;
        }

    };


    this.slidePieceDown = function(piece) {
        if (piece.value === 0) return;
        var downPiece = board.pieces[piece.getX()][piece.getY() + 1];
    };

    this.slidePieceLeft = function(piece) {
        if (piece.value === 0) return;
        var leftPiece = board.pieces[piece.getX() - 1][piece.getY()];
    };

    this.slidePieceRight = function(piece) {
        if (piece.value === 0) return;
        var rightPiece = board.pieces[piece.getX() + 1][piece.getY()];
    };

    this.resetMerges = function() {
        for (var i = boardSize.height - 1; i >= 0; i--) {
            for (var j = boardSize.width - 1; j >= 0; j--) {
                board.pieces[j][i].wasMerged = false;
            }
        }
    };

};


/*
        Need to redo this.
        Start from the bottom, when piece is found, go from current point to bottom.
        prevents pieces blocking eachother.
     */
this.slideUp = function() {
    for (var y = 0; y < boardSize.height; y++) {
        for (var x = 0; x < boardSize.width; x++) {
            this.trySlide(piece[x][y], "up");
        }
    }
};

this.slideDown = function() {
    for (var y = boardSize.height - 1; y >= 0; y--) {
        for (var x = 0; x < boardSize.width; x++) {
            this.trySlide(piece[x][y], "down");
        }
    }
};

this.slideRight = function() {
    for (var x = 0; x < boardSize.width; x++) {
        for (var y = 0; y < boardSize.height; y++) {
            this.trySlide(piece[x][y], "right");
        }
    }
};

this.slideLeft = function() {
    for (var x = boardSize.width - 1; x >= 0; x--) {
        for (var y = 0; y < boardSize.height; y++) {
            this.trySlide(piece[x][y], "left");
        }
    }
};

this.trySlide = function(piece, direction) {
    var currentPiece = piece;
    var x = piece.getX();
    var y = piece.getY();

    switch (direction) {
        case "up":
            while (y >= 1) {
                if (this.pieces[x][y - 1].value == currentPiece.value) {

                }
                y--;
            }
            break;
        case "down":
            break;
        case "left":
            break;
        case "right":
            break;
        default:
            alert("trySlide invalid direction!");
            break;
    }
};

this.slideUp = function() {
    var hasSlid = false;
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