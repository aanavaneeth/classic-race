let cjs = createjs;
let dimensions = require('./dimensions-setup').getDimensions();

class Car extends cjs.Container {
    constructor() {
        super();
        this.outerRect = new cjs.Shape();
        this.outerRect.graphics.f("#020401")
            .dr(dimensions.dim, 0, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
            .mt(dimensions.dim + dimensions.lineThickness, dimensions.lineThickness)
            .lt((dimensions.dim * 2) - dimensions.lineThickness, dimensions.lineThickness)
            .lt((dimensions.dim * 2) - dimensions.lineThickness, dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.dim + dimensions.lineThickness, dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.dim + dimensions.lineThickness, dimensions.lineThickness).es()
            .dr(0, dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
            .mt(dimensions.lineThickness, dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim ) - dimensions.lineThickness, dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim ) - dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).es()
            .dr(dimensions.dim, dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
            .mt(dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim * 2) - dimensions.lineThickness, dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim * 2) - dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).es()
            .dr(2 * dimensions.dim, dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
            .mt(2 * dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim * 3) - dimensions.lineThickness, dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim * 3) - dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness)
            .lt(2 * dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness)
            .lt(2 * dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).es()
            .dr(dimensions.dim, 2 * dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(4, "square")
            .mt(dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim * 2) - dimensions.lineThickness, 2 * dimensions.dim + dimensions.lineThickness)
            .lt((dimensions.dim * 2) - dimensions.lineThickness, 3 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.dim + dimensions.lineThickness, 3 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim + dimensions.lineThickness).es()
            .dr(0, 3 * dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
            .mt(dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness)
            .lt(dimensions.dim - dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness)
            .lt(dimensions.dim - dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness)
            .lt(dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).es()
            .dr(2 * dimensions.dim, 3 * dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square")
            .mt(2 * dimensions.dim + dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness)
            .lt(( 3 * dimensions.dim ) - dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness)
            .lt((3 * dimensions.dim ) - dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness)
            .lt(2 * dimensions.dim + dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness)
            .lt(2 * dimensions.dim + dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).es();
        this.outerRect.cache(0,0, 3*dimensions.dim, 4*dimensions.dim);

        this.addChild(this.outerRect);


    }
}

module.exports = Car;