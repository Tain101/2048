var gridHandler = function(canvasHandler) {
    var canvas = document.getElementById("graph");
    var context = canvas.getContext("2d");

    var width = 300;
    var height = 300;

    var maxScore = 0;
    var maxGen = 0;

    //pixels per generation
    var xScale = 1;

    //pixels per score
    var yScale = 1;

    this.cHandler = canvasHandler;
    this.generation = 0;
    this.score = 0;
    this.points = [];

    this.preload = function(arguments) {
        // body...
    };

    this.create = function() {
        console.log("gridHandler.create");
        var dim = [0, 0, 300, 300];
        drawBox("#5f5f5f", dim, context);

        this.drawGridLines();
    };

    this.update = function() {
        //place points
        this.placePoints();
        //place lines
        this.drawGridLines();
        //place numbers
        this.placeGridNumbers();
    };

    this.updateGen = function(generation, score) {
        if (this.generation + 1 != generation) {
            console.log("generation off:");
            console.log("   expected:   " + (this.generation + 1));
            console.log("   actual:     " + generation);
        }
        this.generation = generation;
        this.score = score;

        this.points[generation] = this.score;
        this.updateGraph();
    };

    this.updateGraph = function() {
        //set scale
        this.setScale();
        //place points
        this.placePoints();
        //place lines
        this.drawGridLines();
        //place numbers
        this.placeGridNumbers();
    };

    this.setScale = function() {
        maxScore = 0;
        maxGen = 0;
        for (var i = 0; i < this.points.length; i++) {
            if (this.points[i] > maxScore) {
                maxScore = this.points[i];
            }
            maxGen = i;
        }

        yScale = 300 - (300 / maxScore);
        xScale = 300 - (300 / maxGen);
    };

    this.placePoints = function() {
        for (var i = 0; i < this.points.length; i++) {
            var x = i * 300 / maxGen;
            var y = 300 - (this.points[i] * 300 / maxScore);


            this.drawPoint(x, y);
            if (this.points[i + 1]) {
                var x1 = (i + 1) * 300 / maxGen;
                var y1 = 300 - (this.points[i + 1] * 300 / maxScore)
                var color = "#e52e71";
                drawLine({
                    x: x,
                    y: y
                }, {
                    x: x1,
                    y: y1
                }, context, color);
            }
        }
    };

    this.drawGridLines = function() {
        //draw vertical lines
        drawLine({
            x: 0,
            y: height
        }, {
            x: 0,
            y: 0
        }, context);

        drawLine({
            x: width / 2,
            y: height
        }, {
            x: width / 2,
            y: 0
        }, context);

        drawLine({
            x: width,
            y: height
        }, {
            x: width,
            y: 0
        }, context);

        //draw horizontal lines
        drawLine({
            x: width,
            y: 0
        }, {
            x: 0,
            y: 0
        }, context);

        drawLine({
            x: width,
            y: height / 2
        }, {
            x: 0,
            y: height / 2
        }, context);

        drawLine({
            x: width,
            y: height
        }, {
            x: 0,
            y: height
        }, context);
    };

    this.placeGridNumbers = function() {

    };

    this.drawPoint = function(x, y) {
        var radius = 3;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#36af90';
        context.fill();
        // context.lineWidth = 2;
        // context.strokeStyle = '#003300';
        // context.stroke();
    };


};