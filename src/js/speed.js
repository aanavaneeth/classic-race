class Speed {
    constructor(argSpeed) {
        this.__speed = argSpeed | 0;
    }

    getSpeed() {
        return this.__speed;
    }

    setSpeed(argSpeed) {
        this.__speed = argSpeed;
        return this.__speed;
    }
}

let speed = new Speed();

module.exports = speed;