
let cjs = createjs;
let Car = require('./car');
let eventBus = require('./event-bus');
let dimensions = require('./dimensions-setup');
let dim = dimensions.dim;


class Obstacles extends cjs.Container {
    constructor(speed) {
        super();
        this.speed = speed;

        var ob1 = new Car();
        ob1.y = -300;
        ob1.x = 2 * dim;

        var ob2 = new Car();
        ob2.y = -800;
        ob2.x = 5 * dim;

        var ob3 = new Car();
        ob3.y = -1200;
        ob3.x = 2 * dim;

        var ob4 = new Car();
        ob4.y = -1800;
        ob4.x = 5 * dim;
        this.objs = [ob1, ob2, ob3, ob4];
        this.objs.forEach((child) => {
            this.addChild(child);
        });
        this.tickerListeners =  this.setTickerEventListeners();
        this.playerPosition = 2 * dim;

        eventBus.subscribe('start', () => {
            this.tickerListeners.map((listener)  => {
                cjs.Ticker.addEventListener("tick", listener);
            });
        });
        eventBus.subscribe('continue', () => {
            this.tickerListeners.map((listener)  => {
                cjs.Ticker.addEventListener("tick", listener);
            });
        });
        eventBus.subscribe('pause', () => {
            this.tickerListeners.map((listener)  => {
                cjs.Ticker.removeEventListener("tick", listener);
            });
        });
        eventBus.subscribe('playerPosition', (position) => {
            this.playerPosition = position;
        });

    }

    getObstaclePosition(index) {
        var rand1or2 = (Math.floor(Math.random() * 2) + 1);
        var lastPos = (index > 1 ) ? index - 2 : 3;
        //Math.floor(Math.random()*(max-min+1)+min); max:
        var yPos = this.objs[lastPos].y - ((Math.floor(Math.random() * 6) + 8) * dim);
        return {
            x: (rand1or2 === 1) ? 2 * dim : 5 * dim,
            y: yPos
        };
    }

    setTickerEventListeners() {
        var listeners = [];
        // is there a way to map?
        this.objs.forEach((obj, index) => {
            listeners.push(() => {
                obj.y += this.speed.getSpeed();
                if (obj.y > 840) {
                    var position = this.getObstaclePosition(index + 1);
                    obj.y = position.y;
                    obj.x = position.x;
                }
            });
        });
        return listeners;
    }
}

module.exports = Obstacles;