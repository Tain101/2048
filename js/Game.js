var cursors;
var allowKeys = true;

// var board = new Board();


var score = 0;
var populationSize = 20;
var mutationRate = 0.05;
var winners = 7;

var hasSlid = false;

var genetic = true;
var restart = true;
var bot;
var winnerList = [];
var savedWinnerList;
var currentPopulation = 0;
var currentGeneration = 0;
var generationScore = 0;
var totalScore = 0;
var totalPopulation = 0;

var Game = function() {

    this.preload = function() {
        // cursors = phaserGame.input.keyboard.createCursorKeys();
    };

    this.create = function() {
        if (genetic) {
            if (savedWinnerList !== undefined) {
                bot = new Bot(savedWinnerList);
            } else {
                bot = new Bot();
            }

            bot.init();

            if (currentPopulation >= populationSize) {

                console.log("starting next generation!");
                savedWinnerList = getParents(winnerList);

                currentPopulation = 0;
                generationScore = 0;
                winnerList = [];
                currentGeneration++;
            }
        }

        console.log("generation: " + currentGeneration);
        document.getElementById("generation").innerHTML = "generation: " + currentGeneration;
        console.log("currentPopulation: " + currentPopulation);
        document.getElementById("bot").innerHTML = "current bot: " + currentPopulation;

        board.create();
        board.start();
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
                    score = 0;
                    addToWinners(bot);
                    currentPopulation++;
                    totalPopulation++;
                    totalScore += bot.score;
                    generationScore += bot.score;
                    bot.clean();
                    document.getElementById("generationAverage").innerHTML = "generation average:    " + (generationScore / currentPopulation).toFixed(1);
                    document.getElementById("average").innerHTML = "total average:         " + (totalScore / totalPopulation).toFixed(1);
                    preload();
                    create();
                }
            }
            document.getElementById("score").innerHTML = "score: " + score;

            hasSlid = false;
            slideManager.resetMerges();
        }
    };
};

var addToWinners = function(bot) {
    //insertion sort
    i = winners;
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

/*
    Create 100 parents, with 95 based on list, 5 random.
        Sum the points, and
            divide each list[i]'s score by the sum to get a percentage
        divide the list among the 95 parents using their score
            (score = 4, add 4 of parent[j] = list[i])
        add 5 new bots for mutation
 */
var getParents = function(list) {
    var parents = [];
    var sum = 0;
    var index = 0;

    //get Sum
    for (i = 0; i < winners; i++) {
        sum += list[i].score;
    }

    console.log("avg: " + sum / winners);

    //make room for mutation;
    sum *= 1 + mutationRate;

    //convert scores to % of sum
    for (i = 0; i < winners; i++) {
        list[i].score = list[i].score / sum * 100;
    }

    //go through each winner, and put it in the parents.
    while (index < (1 - mutationRate) * 100) { //go through 94% of score
        //                  should be the same as going through all of list[i]
        for (i = 0; i < winners; i++) { //go through each list[i]
            for (j = 0; j < list[i].score; j++) { //add a copy to parents[index] for each score point
                //                                      (converted to a percentage.)
                parents[index] = list[i];
                index++;
            }
        }
    }

    //add the last 5% as randoms
    while (index < 100) {
        var mutationBot = new Bot();
        mutationBot.random = true;
        parents[index] = mutationBot;
        index++;
    }
};