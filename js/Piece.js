var Piece = function() {
    this.value = 0;
    this.color = 0x888888;
    this.location = {
        x: 0,
        y: 0
    };
    var wasMerged = false;

    this.setValue = function(value) {
        this.value = value;
        this.color = 0x888888;
        var switchValue = Math.log2(value);
        if (switchValue < 0) switchValue = 0;
        switchValue = Math.floor(switchValue);
        switchValue = switchValue % 5;
        switch (switchValue) {
            case 0: //000
                this.color = 0x8888dd;
                break;
            case 1: //001
                this.color = 0x88dddd;
                break;
            case 2: //011
                this.color = 0xdddddd;
                break;
            case 3: //110
                this.color = 0xdddd88;
                break;
            case 4: //110
                this.color = 0xdd8888;
                break;
            default:
        }
        if (this.value === 0) {
            this.color = 0x888888;
        }
    };

    this.setLocation = function(x, y) {
        this.location.x = x;
        this.location.y = y;
    };

    this.getX = function() {
        return this.location.x;
    };

    this.getY = function() {
        return this.location.y;
    };
};