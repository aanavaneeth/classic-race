let cjs = createjs;
let dimensions = require('./dimensions-setup');
let dim = dimensions.dim;
let lineThickness = dimensions.lineThickness;


class Car extends cjs.Container {
    constructor() {
        super();
        this.outerRect = new cjs.Shape();
        this.outerRect.graphics.f("#020401")
            .dr(dim, 0, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
            .mt(dim + lineThickness, lineThickness)
            .lt((dim * 2) - lineThickness, lineThickness)
            .lt((dim * 2) - lineThickness, dim - lineThickness)
            .lt(dim + lineThickness, dim - lineThickness)
            .lt(dim + lineThickness, lineThickness).es()
            .dr(0, dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
            .mt(lineThickness, dim + lineThickness)
            .lt((dim ) - lineThickness, dim + lineThickness)
            .lt((dim ) - lineThickness, 2 * dim - lineThickness)
            .lt(lineThickness, 2 * dim - lineThickness)
            .lt(lineThickness, dim + lineThickness).es()
            .dr(dim, dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
            .mt(dim + lineThickness, dim + lineThickness)
            .lt((dim * 2) - lineThickness, dim + lineThickness)
            .lt((dim * 2) - lineThickness, 2 * dim - lineThickness)
            .lt(dim + lineThickness, 2 * dim - lineThickness)
            .lt(dim + lineThickness, dim + lineThickness).es()
            .dr(2 * dim, dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
            .mt(2 * dim + lineThickness, dim + lineThickness)
            .lt((dim * 3) - lineThickness, dim + lineThickness)
            .lt((dim * 3) - lineThickness, 2 * dim - lineThickness)
            .lt(2 * dim + lineThickness, 2 * dim - lineThickness)
            .lt(2 * dim + lineThickness, dim + lineThickness).es()
            .dr(dim, 2 * dim, dim, dim).s('#ADBDB0').ss(4, "square")
            .mt(dim + lineThickness, 2 * dim + lineThickness)
            .lt((dim * 2) - lineThickness, 2 * dim + lineThickness)
            .lt((dim * 2) - lineThickness, 3 * dim - lineThickness)
            .lt(dim + lineThickness, 3 * dim - lineThickness)
            .lt(dim + lineThickness, 2 * dim + lineThickness).es()
            .dr(0, 3 * dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
            .mt(lineThickness, 3 * dim + lineThickness)
            .lt(dim - lineThickness, 3 * dim + lineThickness)
            .lt(dim - lineThickness, 4 * dim - lineThickness)
            .lt(lineThickness, 4 * dim - lineThickness)
            .lt(lineThickness, 3 * dim + lineThickness).es()
            .dr(2 * dim, 3 * dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square")
            .mt(2 * dim + lineThickness, 3 * dim + lineThickness)
            .lt(( 3 * dim ) - lineThickness, 3 * dim + lineThickness)
            .lt((3 * dim ) - lineThickness, 4 * dim - lineThickness)
            .lt(2 * dim + lineThickness, 4 * dim - lineThickness)
            .lt(2 * dim + lineThickness, 3 * dim + lineThickness).es();
        this.outerRect.cache(0,0, 3*dim, 4*dim);

        this.addChild(this.outerRect);


    }
}

module.exports = Car;