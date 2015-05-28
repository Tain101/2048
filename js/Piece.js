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
        this.color = 0x5f5f5f;
        switch (value) {
            case 2:
                this.color = 0x36af90;
                break;
            case 4:
                this.color = 0xe7db75;
                break;
            case 8:
                this.color = 0xe52e71;
                break;
            case 16:
                this.color = 0xd96926;
                break;
            case 32:
                this.color = 0x9c992d;
                break;
            case 64:
                this.color = 0xa082d9;
                break;
            case 128:
                this.color = 0x76715e;
                break;
            case 256:
                this.color = 0x6cc72c;
                break;
            case 512:
                this.color = 0x5f5f5f;
                break;
            case 1024:
                this.color = 0x71c933;
                break;
            case 2048:
                this.color = 0x71c933;
                break;
            case 4096:
                this.color = 0x48483e;
                break;
            case 8192:
                this.color = 0x48483e;
                break;
            case 16384:
                this.color = 0x000000;
                break;

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