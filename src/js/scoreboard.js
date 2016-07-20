let cjs = createjs;
let dimensions = require('./dimensions-setup').getDimensions();
let eventBus = require('./event-bus');
let speed = require('./speed');

class Scoreboard extends cjs.Container {
    constructor() {
        super();
        let shape = new cjs.Shape();
        shape.graphics.f('#ADBDB0').dr(0, 0, dimensions.canvasWidth, dimensions.scoreBoardHeight);
        this.score = 0;
        let text = new createjs.Text("SCORE 0000", "30px Aldrich", '#000');
        text.x = dimensions.canvasWidth / 4;
        this.addChild(shape);
        this.addChild(text);
        eventBus.subscribe('incrementScore', () => {
            this.incrementScore();
            text.text  = this.scoreText(this.score);
            speed.setSpeed( dimensions.dim * (0.25 +  Math.floor( this.score/dimensions.levelUpScore )/20 ));
        });
    }
    incrementScore() {
        return ++ this.score;
    }

    scoreText(score) {
        return "SCORE " + score.toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false});
    }
}

module.exports = Scoreboard;