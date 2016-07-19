let dim = 60;
let lineThickness = 2.5;
let backgroundEntityLength = 17;
let backgroundEntityWidth = 10;

// let dim = 30;
// let lineThickness = 1.5;
// let backgroundEntityLength = 20;
// let backgroundEntityWidth = 10;

let carHeight  = 4;
let backgroundEntityPositionReset = dim* backgroundEntityLength;
let canvasHeight = dim* (backgroundEntityLength -1);
let canvasWidth = dim * backgroundEntityWidth;




module.exports = {
  dim: dim,
  lineThickness: lineThickness,
  backgroundEntityLength: backgroundEntityLength,
  backgroundEntityWidth: backgroundEntityWidth,
  backgroundEntityPositionReset: backgroundEntityPositionReset,
  canvasHeight: canvasHeight,
  canvasWidth: canvasWidth,
  carHeight: carHeight
};