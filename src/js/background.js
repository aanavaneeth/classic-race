let cjs = createjs;
let eventBus = require('./event-bus');
let dimensions = require('./dimensions-setup').getDimensions();
class BackgroundEntity extends cjs.Container {
    constructor(speed) {
        super();
        this.speed = speed;
        this.outerRect = new cjs.Shape();
        this.setup();
        this.__listener = this.eventListener.bind(this);

        eventBus.subscribe('start', () => {
            cjs.Ticker.addEventListener("tick", this.__listener);
        });
        eventBus.subscribe('continue', () => {
            cjs.Ticker.addEventListener("tick", this.__listener);
        });
        eventBus.subscribe('pause', () => {
            cjs.Ticker.removeEventListener("tick", this.__listener);
        });
    }

    setup() {
        this.height = dimensions.backgroundEntityLength * dimensions.dim;
        for (let i = 0; i < dimensions.backgroundEntityLength; i++) {
            for (let j = 0; j < dimensions.backgroundEntityWidth; j++) {
                if (( i % 3 !== 0 ) && (( j == 0) || (j === 9))) {
                    this.outerRect.graphics.f("#020401")
                        .dr(dimensions.dim * j, dimensions.dim * i, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
                        .mt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness)
                        .lt((dimensions.dim * (j + 1)) - dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness)
                        .lt((dimensions.dim * (j + 1) ) - dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness)
                        .lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness)
                        .lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).es();
                } else {
                    this.outerRect.graphics.f("#A2B2A5")
                        .dr(dimensions.dim * j, dimensions.dim * i, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
                        .mt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness)
                        .lt((dimensions.dim * (j + 1)) - dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness)
                        .lt((dimensions.dim * (j + 1) ) - dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness)
                        .lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness)
                        .lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).es();
                }
            }
        }
        this.outerRect.cache(0,0, dimensions.backgroundEntityWidth*dimensions.dim, this.height);
        this.addChild(this.outerRect);
    }

    eventListener() {
          if (this.y >= dimensions.backgroundEntityPositionReset) {
            this.y = -(this.height) + (this.y - dimensions.backgroundEntityPositionReset);
        }
        this.y += this.speed.getSpeed();
    }
}

module.exports = BackgroundEntity;