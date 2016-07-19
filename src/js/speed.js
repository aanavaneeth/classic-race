
module.exports = function (argSpeed) {

    let speed = argSpeed | 0;
    this.getSpeed = function () {
        return speed;
    };
    this.setSpeed = function (argSpeed) {
        speed = argSpeed;
        return speed;
    }

};