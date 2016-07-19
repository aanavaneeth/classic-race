let cjs = createjs;
let eventBus = require('./event-bus');
let dimensions = require('./dimensions-setup');
let dim = dimensions.dim;
let lineThickness = dimensions.lineThickness;
let backgroundEntityLength = dimensions.backgroundEntityLength;
let backgroundEntityWidth = dimensions.backgroundEntityWidth;
let backgroundEntityPositionReset = dimensions.backgroundEntityPositionReset;

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
        this.height = backgroundEntityLength * dim;
        for (let i = 0; i < backgroundEntityLength; i++) {
            for (let j = 0; j < backgroundEntityWidth; j++) {
                if (( i % 3 !== 0 ) && (( j == 0) || (j === 9))) {
                    this.outerRect.graphics.f("#020401")
                        .dr(dim * j, dim * i, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
                        .mt(dim * j + lineThickness, dim * i + lineThickness)
                        .lt((dim * (j + 1)) - lineThickness, dim * i + lineThickness)
                        .lt((dim * (j + 1) ) - lineThickness, dim * (i + 1) - lineThickness)
                        .lt(dim * j + lineThickness, dim * (i + 1) - lineThickness)
                        .lt(dim * j + lineThickness, dim * i + lineThickness).es();
                } else {
                    this.outerRect.graphics.f("#A2B2A5")
                        .dr(dim * j, dim * i, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
                        .mt(dim * j + lineThickness, dim * i + lineThickness)
                        .lt((dim * (j + 1)) - lineThickness, dim * i + lineThickness)
                        .lt((dim * (j + 1) ) - lineThickness, dim * (i + 1) - lineThickness)
                        .lt(dim * j + lineThickness, dim * (i + 1) - lineThickness)
                        .lt(dim * j + lineThickness, dim * i + lineThickness).es();
                }
            }
        }
        this.outerRect.cache(0,0, backgroundEntityWidth*dim, this.height);
        this.addChild(this.outerRect);
    }

    eventListener() {
          if (this.y >= backgroundEntityPositionReset) {
            this.y = -(this.height) + (this.y - backgroundEntityPositionReset);
        }
        this.y += this.speed.getSpeed();
    }
}

module.exports = BackgroundEntity;