let carHeight = 4;
let backgroundEntityLength = 18;
let backgroundEntityWidth = 10;
let dimensions = {
    backgroundEntityLength: backgroundEntityLength,
    backgroundEntityWidth: backgroundEntityWidth,
    carHeight: carHeight
};

let setupDimensions = (offsetHeight, offsetWidth) => {
    let boxDimByOffsetHeight = offsetHeight / (backgroundEntityLength + 1);
    let boxDimByOffsetWidth = offsetWidth / (backgroundEntityWidth);

    dimensions.dim = Math.min(boxDimByOffsetHeight, boxDimByOffsetWidth);
    dimensions.lineThickness = dimensions.dim / 20;
    dimensions.backgroundEntityPositionReset = dimensions.dim * backgroundEntityLength;
    dimensions.canvasHeight = dimensions.dim * (backgroundEntityLength - 1);
    dimensions.canvasWidth = dimensions.dim * (backgroundEntityWidth);
    dimensions.scoreBoardHeight = offsetHeight - dimensions.canvasHeight;  //need correction
    dimensions.initialPlayerPosition = { X: dimensions.dim*2, Y: ((dimensions.backgroundEntityLength -1) - dimensions.carHeight) * dimensions.dim };
    dimensions.offsetWidth = offsetWidth;
};

let getDimensions = () => {
    return dimensions;
};


module.exports = {
    setupDimensions: setupDimensions,
    getDimensions: getDimensions
};
