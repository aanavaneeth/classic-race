let cjs = createjs;
let BackgroundEntity = require('./background');
let Speed = require('./speed');
let Player = require('./player');
let Obstacles = require('./obstacles');
let dimensions = require('./dimensions-setup').getDimensions();


class Game extends cjs.Container {
    constructor() {
        super();
        this.speed = new Speed(20);
        this.backgroundQueue = [new BackgroundEntity(this.speed), new BackgroundEntity(this.speed)];
        this.backgroundQueue[1].y = -(this.backgroundQueue[1].height);
        this.player = new Player();
        this.player.x = dimensions.dim * 2;
        this.addChild.apply(this, this.backgroundQueue);
        this.addChild(new Obstacles(this.speed));
        this.addChild(this.player);
    }   
}

module.exports = Game;