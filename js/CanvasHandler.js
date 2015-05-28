var CanvasHandler = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    this.preload = function (arguments) {
        // body...
    };

    this.create = function (arguments) {
        // body...
    };

    this.update = function(arguments) {
        // body...
    };

    this.drawBox = function(dimensions, color) {
        if (dimensions === undefined) {
            dimensions = defaultDim;
        }
        if (color === undefined) {
            color = randomColor();
        }
        context.fillStyle = color;
        context.fillRect(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
    };

    this.drawLine = function(pointA, pointB) {
        context.moveTo(pointA);
        context.lineTo(pointB);
        context.stroke();
    };

    this.drawText = function(text, location) {
        context.fillText(text, location);
    };

    this.drawImage = function(image, location) {
        var img = document.getElementById(image);
        context.drawImage(img, location);
    };
};