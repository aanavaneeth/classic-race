let cjs = createjs;
let Car = require('./car');
let eventBus = require('./event-bus');
let dimensions = require('./dimensions-setup').getDimensions();

class Obstacles extends cjs.Container {
    constructor(speed) {
        super();
        this.speed = speed;
        var ob1 = new Car();
        ob1.y = -(dimensions.dim * 3);
        ob1.x = 2 * dimensions.dim;

        var ob2 = new Car();
        ob2.y = -(dimensions.dim * 13);
        ob2.x = 5 * dimensions.dim;

        var ob3 = new Car();
        ob3.y = -(dimensions.dim * 23);
        ob3.x = 2 * dimensions.dim;

        var ob4 = new Car();
        ob4.y = -(dimensions.dim * 35);
        ob4.x = 5 * dimensions.dim;
        this.objs = [ob1, ob2, ob3, ob4];
        this.objs.forEach((child) => {
            this.addChild(child);
        });
        this.tickerListeners =  this.setTickerEventListeners();
        this.playerPosition = dimensions.initialPlayerPosition;

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
        var yPos = this.objs[lastPos].y - ((Math.floor(Math.random() * 4) + 10) * dimensions.dim);
        return {
            x: (rand1or2 === 1) ? 2 * dimensions.dim : 5 * dimensions.dim,
            y: yPos
        };
    }

    setTickerEventListeners() {
        var listeners = [];
        var carHeight = dimensions.dim * dimensions.carHeight;
        // is there a way to map?
        this.objs.forEach((obj, index) => {
            listeners.push(() => {
                if(obj.x ===  this.playerPosition.X && (obj.y + carHeight) >= this.playerPosition.Y) {
                    eventBus.publish('end');
                    return;
                }
                if (obj.y > dimensions.canvasHeight) {
                    var position = this.getObstaclePosition(index + 1);
                    obj.y = position.y;
                    obj.x = position.x;
                    eventBus.publish('incrementScore');
                }
                obj.y += this.speed.getSpeed();
            });
        });
        return listeners;
    }
}

module.exports = Obstacles;