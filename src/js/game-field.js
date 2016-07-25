let cjs = createjs;
let Game = require('./game')
let ScoreBoard = require('./scoreboard');
let eventBus = require('./event-bus');
let dimensions = require('./dimensions-setup').getDimensions();

class GameField {
    constructor() {
        this.stage = new cjs.Stage("myCanvas");
        this.setupGame(this.stage);
        this.setupScoreboard(this.stage);
        this.setCanvasSize(this.stage, dimensions);
        this.updateStage(this.stage);
        eventBus.subscribe('end', () => {
            cjs.Ticker.removeAllEventListeners();
            this.stage.removeAllChildren();
        });
    }
    
    setupGame(stage) {
        let game = new Game();
        stage.addChild(game);
    }

    setupScoreboard(stage) {
        let scoreboard = new ScoreBoard();
        stage.addChild(scoreboard);
    }

    setCanvasSize(stage, dimensions) {
        stage.canvas.width = dimensions.canvasWidth;
        stage.canvas.height = dimensions.canvasHeight;
    }

    updateStage(stage) {
        if (cjs.Touch.isSupported()) {
            cjs.Touch.enable(stage);
        }
        cjs.Ticker.on("tick", () => {
            stage.update()
        });
    }
}

module.exports = GameField;