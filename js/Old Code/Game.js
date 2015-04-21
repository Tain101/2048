//Taylor Premo -life 2.0
//Game.js

/**	Updates Game loop
*	Manages Menu
*	Contains Map Object, and updates
*
*
**/

// Global vars
fps = null; //FPSMeter object
canvas = null; //canvas object
context = null; //context object
gameBoard = null;

// ----------------------------------------

// Our 'game' variables
var defaultRestart = false;
var gameSpeed = 5; //frames per sec.
var mapWidth = 4; //number of squares, not pixels
var mapHeight = 4;

var bodyWidth;// = mapWidth / canvas.width;
var bodyHeight;// = mapHeight / canvas.height;
var bodySize; //size of a square, should be calculated, not static


var boardSize = {width:mapWidth, height:mapHeight};



function left(){

}

window.onload = function(){
	canvas = document.getElementById("screen");
	context = canvas.getContext("2d");
	bodyWidth = canvas.width / mapWidth;
	bodyHeight = canvas.height / mapHeight;

	bodySize = bodyWidth;
	if(bodyHeight < bodyWidth){
		bodySize = bodyHeight;
	}

	console.log("95");
	newGame();
	console.log("99");

	GameLoopManager.run(GameTick);
};

function newGame(){
	console.log("102");
	gameBoard = new Board(boardSize);
	console.log("105");
	generateAll();
	console.log("106");

}
