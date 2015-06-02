var CanvasHandler = function(inBoard) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    this.board = inBoard;



    this.preload = function() {
        context.fillStyle = "#5f5f5f";
        context.fillRect(0, 0, width, height);
    };

    this.create = function(inBoard) {

        this.board = inBoard;
    };

    this.update = function() {
        context.clearRect(0, 0, width, height);
        if (this.board) {
            this.drawBoard();
        } else {
            this.drawBoard();
            context.fillStyle = "#5f5f5f";
            context.fillRect(0, 0, width, height);
        }
    };

    //go through each square on the board, and update the box & text.
    this.drawBoard = function() {
        for (i = 0; i < boardSize.height; i++) {
            for (j = 0; j < boardSize.width; j++) {
                // this.drawPiece(this.pieces[j][i]);
                this.drawPiece(board.getPiece(j, i));
            }
        }
    };

    //actually convert whole method to canvasHandler
    this.drawPiece = function(piece) {
        var value = piece.value;
        var color = getColor(value);
        var dim = getDimensions(piece);
        this.drawBox(color, dim);
        this.drawText(value, dim);
    };

    this.drawBox = function(color, dimensions) {
        if (dimensions === undefined) {
            throw "No Dimensions in canvasHandler.drawBox()";
        }
        if (color === undefined) {
            color = "#5f5f5f";
        }
        context.fillStyle = color;
        context.fillRect(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
    };

    this.drawLine = function(pointA, pointB) {
        context.moveTo(pointA);
        context.lineTo(pointB);
        context.stroke();
    };

    this.drawText = function(text, dimensions) {
        var x = dimensions[0] + dimensions[2] / 2 - dimensions[2] / 4;
        var y = dimensions[1] + dimensions[3] / 2 + dimensions[3] / 5;
        context.font = '20pt Calibri'
        context.fillStyle = "#d9d9d9";
        context.fillText(text, x, y);
    };

    this.drawImage = function(image, dimensions) {
        var img = document.getElementById(image);
        context.drawImage(img, location);
    };

};

var getColor = function(value) {
    var color = "#5f5f5f";
    switch (value) {
        case 2:
            color = "#36af90";
            break;
        case 4:
            color = "#e7db75";
            break;
        case 8:
            color = "#e52e71";
            break;
        case 16:
            color = "#d96926";
            break;
        case 32:
            color = "#9c992d";
            break;
        case 64:
            color = "#a082d9";
            break;
        case 128:
            color = "#76715e";
            break;
        case 256:
            color = "#6cc72c";
            break;
        case 512:
            color = "#5f5f5f";
            break;
        case 1024:
            color = "#71c933";
            break;
        case 2048:
            color = "#71c933";
            break;
        case 4096:
            color = "#48483e";
            break;
        case 8192:
            color = "#48483e";
            break;
        case 16384:
            color = "#000000";
            break;
        default:
            color = "#5f5f5f";
    }
    return color;
};

var getDimensions = function(piece) {
    var x = piece.getX();
    var y = piece.getY();
    var dim = [];

    dim[0] = (margin + pieceSize * piece.getX()); //X
    dim[1] = (margin + pieceSize * piece.getY()); //Y
    dim[2] = (pieceSize); //W
    dim[3] = (pieceSize); //H

    return dim;
};