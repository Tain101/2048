//Taylor Premo - 2048
//Game.js

/** Updates Game loop
 *  Manages Menu
 *  Contains Board Object
 *  Handles key presses, and calls methods inside board based on them.
 **/

// Global variables
fps                   = null; //FPSMeter object
canvas                = null;
context               = null;
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
board                 = null;
bindThis              = this;

// static variables
var defaultRestart = true; //Do we restart automatically when the game ends?
var gameSpeed      = 5; //frames per sec.
var mapWidth       = 4; //number of squares, not pixels
var mapHeight      = 4;

var bodyWidth  = null;
var bodyHeight = null;
var bodySize; //size of a square, should be calculated, not constant. Based on canvas
var boardSize  = {
    width: mapWidth,
    height: mapHeight
};

//instance variables
var score   = -1;
var date    = new Date();
var oldTime = date.getTime();

this.upKey    = {isPressed: false};
this.downKey  = {isPressed: false};
this.rightKey = {isPressed: false};
this.leftKey  = {isPressed: false};

window.addEventListener('keydown', this.onKeyEvent, false);

window.onload = function() {
    canvas = document.getElementById("screen");
    context = canvas.getContext("2d");

    bodyWidth = canvas.width / mapWidth;
    bodyHeight = canvas.height / mapHeight;

    bodySize = bodyWidth;
    if (bodyHeight < bodyWidth) {
        bodySize = bodyHeight;
    }

    newGame();
    if (defaultRestart) {
        start();
    } else {
        displayMenu();
    }
};

var newGame = function() {
    board = new Board(boardSize);
    score = 0;
};

var start = function() {
    hasEnded = false;

    bindThis = this;
    requestAnimationFrame(function() {
        bindThis.update(0);
    });
};

var update = function() {
    currentTime = date.getTime();
    checkInputs(currentTime - oldTime);
    update(currentTime - oldTime);
    draw();
    oldTime = newTime;
    requestAnimationFrame(update);
};

var checkInputs = function(timePassed){
    if (this.leftKey.isPressed) {
        this.leftKey.wasPressed = true;
    } else if (this.leftKey.wasPressed && !this.leftKey.isPressed) {
        board.slideLeft();
    }
    if (this.rightKey.isPressed) {
        this.rightKey.wasPressed = true;
    } else if (this.rightKey.wasPressed && !this.rightKey.isPressed) {
        board.slideRight();
    }
    if (this.upKey.isPressed) {
        this.upKey.wasPressed = true;
    } else if (this.upKey.wasPressed && !this.upKey.isPressed) {
        board.slideUp();
    }
    if (this.downKey.isPressed) {
        this.downKey.wasPressed = true;
    } else if (this.downKey.wasPressed && !this.downKey.isPressed) {
        board.sld();
    }
};

var onKeyEvent = function(keyEvent) {
    var keyID = keyEvent.keyCode;
    var key;

    switch (keyID) {
        case 37: //Left key
        case 65: //A key
            alert("Left");
            key = this.leftKey;
            break;

        case 38: //Up key
        case 87: //W key
            alert("Up");
            key = this.upKey;
            break;

        case 39: //Right key
        case 68: //D key
            alert("Right");
            key = this.rightKey;
            break;

        case 40: //Down key
        case 83: //S key
            alert("Down");
            key = this.downKey;
            break;

        default:
            alert(keyID); //Everything else
    }

    if (keyEvent.type == "keydown") {
        key.isPressed = true;
    } else if (keyEvent.type == "keyup") {
        key.isPressed = false;
    }
};

start();