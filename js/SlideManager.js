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
     score += curPiece.value;
     *                      which will need to be reset later.
     *
     * @return {[type]} [description]
     */

    this.slideUp = function() {
        var y = 0;
        var hasSlid = false;
        while (y <= boardSize.height - 1) {
            for (var x = boardSize.width - 1; x >= 0; x--) {
                var temp = this.slidePieceUp(board.pieces[x][y]);
                if (temp) {
                    hasSlid = true;
                }
            }
            y++;
        }
        return hasSlid;
    };

    this.slideDown = function() {
        var y = boardSize.height - 1;
        var hasSlid = false;

        while (y >= 0) {
            for (var x = boardSize.width - 1; x >= 0; x--) {
                var temp = this.slidePieceDown(board.pieces[x][y]);
                if (temp) {
                    hasSlid = true;
                }
            }
            y--;
        }
        return hasSlid;
    };

    this.slideLeft = function() {
        var x = 0;
        var hasSlid = false;
        while (x <= boardSize.width - 1) {
            for (var y = boardSize.height - 1; y >= 0; y--) {
                var temp = this.slidePieceLeft(board.pieces[x][y]);
                if (temp) {
                    hasSlid = true;
                }
            }
            x++;
        }
        return hasSlid;
    };

    this.slideRight = function() {
        var x = boardSize.width - 1;
        var hasSlid = false;
        while (x >= 0) {
            for (var y = boardSize.height - 1; y >= 0; y--) {
                var temp = this.slidePieceRight(board.pieces[x][y]);
                if (temp) {
                    hasSlid = true;
                }
            }
            x--;
        }
        return hasSlid;
    };

    this.slidePieceUp = function(piece) {
        if (piece.value === 0) return;
        if (piece.getY() === 0) return;
        var curPiece = piece;
        var upPiece = board.pieces[curPiece.getX()][curPiece.getY() - 1];
        var hasSlid = false;

        while (curPiece.getY() > 0 &&
            upPiece.value === 0) {
            //move up until we find a merge or hit the edge.
            upPiece.setValue(curPiece.value);
            curPiece.setValue(0);
            curPiece = upPiece;
            upPiece = board.pieces[curPiece.getX()][curPiece.getY() - 1];
            hasSlid = true;
        }

        if (upPiece !== undefined &&
            curPiece.getY() !== 0 &&
            upPiece.value == curPiece.value &&
            !upPiece.wasMerged) {
            //merge
            upPiece = board.pieces[curPiece.getX()][curPiece.getY() - 1];
            upPiece.setValue(curPiece.value * 2);
            curPiece.setValue(0);
            curPiece = upPiece;
            curPiece.wasMerged = true;
            score += curPiece.value;
            hasSlid = true;
        }
        return hasSlid;
    };


    this.slidePieceDown = function(piece) {
        if (piece.value === 0) return;
        if (piece.getY() === boardSize.height - 1) return;
        var curPiece = piece;
        var downPiece = board.pieces[piece.getX()][piece.getY() + 1];
        var hasSlid = false;

        while (curPiece.getY() < boardSize.height - 1 &&
            downPiece.value === 0) {
            downPiece.setValue(curPiece.value);
            curPiece.setValue(0);
            curPiece = downPiece;
            downPiece = board.pieces[curPiece.getX()][curPiece.getY() + 1];
            hasSlid = true;
        }

        if (downPiece !== undefined &&
            curPiece.getY() !== boardSize.height - 1 &&
            downPiece.value == curPiece.value &&
            !downPiece.wasMerged) {
            //merge
            downPiece = board.pieces[curPiece.getX()][curPiece.getY() + 1];
            downPiece.setValue(curPiece.value * 2);
            curPiece.setValue(0);
            curPiece = downPiece;
            curPiece.wasMerged = true;
            score += curPiece.value;
            hasSlid = true;
        }
        return hasSlid;
    };

    this.slidePieceLeft = function(piece) {
        if (piece.value === 0) return;
        if (piece.getX() === 0) return;
        var curPiece = piece;
        var leftPiece = board.pieces[piece.getX() - 1][piece.getY()];
        var hasSlid = false;

        while (curPiece.getX() > 0 &&
            leftPiece.value === 0) {

            leftPiece.setValue(curPiece.value);
            curPiece.setValue(0);
            curPiece = leftPiece; ///curPiece.getX()
            if (curPiece.getX() !== 0) {
                leftPiece = board.pieces[curPiece.getX() - 1][curPiece.getY()];
            }
            hasSlid = true;
        }

        if (leftPiece !== undefined &&
            curPiece.getX() !== 0 &&
            leftPiece.value == curPiece.value &&
            !leftPiece.wasMerged) {
            //merge
            leftPiece = board.pieces[curPiece.getX() - 1][curPiece.getY()];
            leftPiece.setValue(curPiece.value * 2);
            curPiece.setValue(0);
            curPiece = leftPiece;
            curPiece.wasMerged = true;
            score += curPiece.value;
            hasSlid = true;
        }
        return hasSlid;
    };

    this.slidePieceRight = function(piece) {
        if (piece.value === 0) return;
        if (piece.getX() === boardSize.width - 1) return;
        var curPiece = piece;
        var rightPiece = board.pieces[piece.getX() + 1][piece.getY()];
        var hasSlid = false;

        while (curPiece.getX() < boardSize.width &&
            rightPiece.value === 0) {

            rightPiece.setValue(curPiece.value);
            curPiece.setValue(0);
            curPiece = rightPiece; ///curPiece.getX()
            if (curPiece.getX() !== boardSize.width - 1) {
                rightPiece = board.pieces[curPiece.getX() + 1][curPiece.getY()];
            }
            hasSlid = true;
        }

        if (rightPiece !== undefined &&
            curPiece.getX() !== boardSize.width - 1 &&
            rightPiece.value == curPiece.value &&
            !rightPiece.wasMerged) {
            //merge
            rightPiece = board.pieces[curPiece.getX() + 1][curPiece.getY()];
            rightPiece.setValue(curPiece.value * 2);
            curPiece.setValue(0);
            curPiece = rightPiece;
            curPiece.wasMerged = true;
            score += curPiece.value;
            hasSlid = true;
        }
        return hasSlid;
    };

    this.resetMerges = function() {
        for (var i = boardSize.height - 1; i >= 0; i--) {
            for (var j = boardSize.width - 1; j >= 0; j--) {
                board.pieces[j][i].wasMerged = false;
            }
        }
    };

};