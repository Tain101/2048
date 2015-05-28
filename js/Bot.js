/*
    population size
    mutation rate
    age
    parents

    record moves of every bot in the current generation.
    Sort the list as you go, only keep top winners.

    When generating the next set of children,
        randomly choose from parents/mutation.
 */

var Bot = function(parents) {
    this.id = 0;
    this.score = 0;
    this.seed = undefined;
    this.moveList = [0];
    this.random = false;
    this.currentMove = 0;
    this.parents = parents;

    this.init = function() {

        if (winnerList !== undefined) {
            this.setMoveList();
        } else {
            this.setMoveList();
        }

    };


    this.setMoveList = function() {

        var moveListSize = 0;
        //create based on parents.
        if (this.parents !== undefined) {

            //find largest movelist
            for (i = this.parents.length - 1; i >= 0; i--) {
                if (this.parents.moveList.length > moveListSize) {
                    moveListSize = this.parents.moveList.length;
                }
            }

            //generate moveList for child.
            for (i = moveListSize - 1; i >= 0; i--) {

                var randomIndex = Math.round(Math.random() * 100);
                var start = randomIndex;

                do {
                    randomIndex++;
                    randomIndex %= moveListSize;
                } while (this.parents[randomIndex].getMove(i) === undefined &&
                    randomIndex != start);

                if (randomIndex == start) {
                    break;
                } else {
                    this.setMove(i, this.parents[randomIndex].getMove(i));
                }
            }
        }
    };

    this.getMove = function(index) {
        var move;
        if (this.random) {
            move = Math.round(Math.random() * 100) % 4;
        } else {
            move = this.moveList[index];
        }
        return move;
    };

    this.setMove = function(index, value) {
        this.moveList[index] = value;
    };

    this.move = function() {
        if (this.moveList[this.currentMove] === undefined) {
            this.moveList[this.currentMove] = this.moveRandom();
        }
        switch (this.moveList[this.currentMove]) {
            case 0:
                slideManager.slideUp();
                break;
            case 1:
                slideManager.slideDown();
                break;
            case 2:
                slideManager.slideLeft();
                break;
            case 3:
                slideManager.slideRight();
                break;
        }

        this.currentMove++;
        return true;
    };

    this.moveRandom = function() {
        return Math.round(Math.random() * 100) % 4;
    };

    this.clean = function() {
        this.id = 0;
        this.score = 0;
        this.seed = undefined;
        this.random = false;
        this.currentMove = 0;
        this.parents = null;
    };
};