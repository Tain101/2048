/**
 * Game Object, handles all logic related to the game itself.
 *     - mostly handles the indivual 'turns', and actions when a game ends.
 */
var cursors;
var allowKeys = true;
var populationSize = 2;
var mutationRate = 0.05;
var winners = 1;
var hasSlid = false;

var bot;
var winnerList = [];
var savedWinnerList;

var Game = function() {

    this.preload = function() {};

    this.create = function() {
        //if the game is 'genetic' we will have bots
        if (genetic) {
            //create bot based on last gen's winners if possible
            if (savedWinnerList !== undefined) {
                bot = new Bot(savedWinnerList);
            } else {
                bot = new Bot();
            }

            bot.create();

            //
            if (currentPopulation >= populationSize) {
                console.log("starting next generation!");
                savedWinnerList = getParents(winnerList);
                gridHandler.updateGen(currentGeneration, generationScore);
                currentPopulation = 0;
                generationScore = 0;
                winnerList = [];
                currentGeneration++;
            }
        }

        console.log("generation: " + currentGeneration);
        console.log("currentPopulation: " + currentPopulation);

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
                    updateStats();
                    bot.clean();
                    //call preload & create to restart the game.
                    preload();
                    create();
                }
            }


            hasSlid = false;
            slideManager.resetMerges();
        }
    };
};

var addToWinners = function(bot) {
    //insertion sort
    var i;
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

/**
 * depreciated: was using phaser library, that is no longer being used.
 *
 * @return {Bool} If the user has caused the board to slide.
 */

var checkUserKeys = function() {
    var hasSlid = false;

    //prevents multiple moves if the user is holding a key.
    if (allowKeys) {
        if (cursors.up.isDown) {
            //only returns true if the board has actually slid.
            //eg. - If the user presses down & none of the pieces move
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
    var i, j;

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

var getRandomValue = function(min, max) {
    max = max || 1;
    min = min || 0;
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;
    return min + rnd * (max - min);
};