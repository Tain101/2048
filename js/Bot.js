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

var Bot = function() {
    this.id = 0;
    this.score = 0;
    this.seed;
    this.moveList = [0];
    this.random = false;
    this.currentMove = 0;

    this.init = function() {
        this.setMoveList();
    };


    this.setMoveList = function(parents) {
        var moveListSize = 0;
        //create based on parents.
        if (parents !== undefined) {
            //find largest movelist
            for (var i = parents.length - 1; i >= 0; i--) {
                if (parents.moveList.length > moveListSize) {
                    moveListSize = parents.moveList.length;
                }
            }
            //generate moveList for child.
            for (var i = moveListSize - 1; i >= 0; i--) {
                var randomIndex = Math.round(Math.random() * 100);
                var start = randomIndex;
                do {
                    randomIndex++;
                    randomIndex %= moveListSize;
                } while (parents[randomIndex].getMove(i) === undefined &&
                    randomIndex != start);

                if (randomIndex == start) {
                    break;
                } else {
                    this.setMove(i, parents[randomIndex].getMove(i));
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
};