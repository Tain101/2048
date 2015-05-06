var score = 0;

var canvasSize = 500;
var margin = canvasSize / 160 * 3;
var boardSize = {
    width: 4,
    height: 4
};
var pieceSize = canvasSize / 4 * 0.95;

var cursors;
var allowKeys = true;

var board = new Board();
var slideManager = new SlideManager(board);

var hasSlid = false;

var currentPopulation = 0;
var populationSize = 10;
var mutationRate = 0.05;
var winners = 8;

var genetic = true;
var bot;
var restart = true;
var winnerList = [];
var savedWinnerList;
var currentGeneration = 0;

var Game = function() {
    this.preload = function() {
        board.init();
        cursors = phaserGame.input.keyboard.createCursorKeys();
    };

    this.create = function() {
        console.log("generation: " + currentGeneration);
        console.log("currentPopulation: " + currentPopulation);
        if (genetic) {
            bot = new Bot();
            bot.init();
            if (currentPopulation >= populationSize) {
                bot = new Bot(getParents(savedWinnerList));
                console.log("start next generation.");
                savedWinnerList = winnerList;
                this.currentPopulation = 0;
                winnerList = [];
                currentGeneration++;
            }

        }

        board.start();
        board.displayGrid();
    };

    this.update = function() {

        if (genetic) {
            hasSlid = bot.move();
        } else {
            hasSlid = checkUserKeys();
        }

        if (hasSlid) {
            var isDone = !board.addRandomPiece();
            if (isDone) {
                console.log("game over!");
                if (restart) {
                    bot.score = score;
                    addToWinners(bot);
                    currentPopulation++;
                    preload();
                    create();
                }
            }
            document.getElementById("score").innerHTML = "score: " + score;
            board.displayGrid();
            hasSlid = false;
            slideManager.resetMerges();
        }
    };
};

var addToWinners = function(bot) {
    //insertion sort
    var i = winners;
    winnerList[i] = bot;
    while (i > 0) {
        if (winnerList[i - 1] === undefined ||
            winnerList[i].score > winnerList[i - 1].score) {

            var temp = winnerList[i];
            winnerList[i] = winnerList[i - 1];
            winnerList[i - 1] = temp;
        }
        i--;
    }
};

var checkUserKeys = function() {
    var hasSlid = false;
    if (allowKeys) {
        if (cursors.up.isDown) {
            hasSlid = slideManager.slideUp();
            allowKeys = false;
        } else if (cursors.down.isDown) {
            hasSlid = slideManager.slideDown();
            allowKeys = false;
        } else if (cursors.left.isDown) {
            hasSlid = slideManager.slideLeft();
            allowKeys = false;
        } else if (cursors.right.isDown) {
            hasSlid = slideManager.slideRight();
            allowKeys = false;
        }
    } else {
        if (cursors.up.isDown) {
            allowKeys = false;
        } else if (cursors.down.isDown) {
            allowKeys = false;
        } else if (cursors.left.isDown) {
            allowKeys = false;
        } else if (cursors.right.isDown) {
            allowKeys = false;
        } else {
            allowKeys = true;
        }
    }
    return hasSlid;
};

var getParents = function(winnerList) {
    var parents = [];
    var sum;
    var index = 0;
    //get Sum
    for (var i = 0; i < winners; i++) {
        sum += winnerList[i].score;
    }
    //make room for mutation;
    sum *= 1.05;

    //get count per winner
    for (var i = 0; i < winners; i++) {
        winnerList[i].score = winnerList[i].score / sum * 100;
    }

    //go through each winner, and put it in the parents.
    while (index < 94) {
        for (var i = 0; i < winners; i++) {
            for (var j = 0; j < winnerList[i].score; j++) {
                parents[index] = winnerList[j];
                index++;
            }
        }
    }
    while (index < 100) {
        var mutationBot = new Bot();
        mutationBot.random = true;
        parents[index] = mutationBot;
    }
};