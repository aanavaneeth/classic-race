/**
 * Created by navaneeth on 29-06-2016.
 */

let win = window;
let Game = require('./game');
let eventBus = require('./event-bus');
let dimensions = require('./dimensions-setup');


let setupEventsForCommunication = function () {
    eventBus.addTopic('start');
    eventBus.addTopic('end');
    eventBus.addTopic('pause');
    eventBus.addTopic('continue');
    eventBus.addTopic('playerPosition');
}

let setCanvasSize = (parent, stage) => {
    stage.canvas.width = dimensions.canvasWidth;
    stage.canvas.height = dimensions.canvasHeight;
};

let handleEvents = (stage) => {
    const GAME_START = 0, GAME_RUNNING = 1, GAME_PAUSE = 2;
    let gameStatus = GAME_START;
    let parent = win.document.getElementById('canvas-container');
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
    setCanvasSize(parent, stage);
    win.addEventListener('keypress',  (evt) => {
        if(evt.keyCode === 32) {
            switch (gameStatus) {
                case GAME_START:
                    eventBus.publish('start');
                    gameStatus = GAME_RUNNING;
                    break;
                case GAME_RUNNING:
                    eventBus.publish('pause');
                    gameStatus = GAME_PAUSE;
                    break;
                case GAME_PAUSE:
                    eventBus.publish('continue');
                    gameStatus = GAME_RUNNING;
                    break;
            }
        }
    });
    createjs.Ticker.on("tick", () => {stage.update()} );
};

let setupGame = function (stage) {
    let game = new Game();
    stage.addChild(game);
};
var setupScoreboard = function (stage) {
    let textContainer = new createjs.Container();
    let shape = new createjs.Shape();
    shape.graphics.f('#ADBDB0').dr(0, 0, dimensions.canvasWidth, 40);
    textContainer.addChild(shape);
    let text = new createjs.Text("Score 0000", "30px Aldrich", '#000');
    text.x =  dimensions.canvasWidth/4;
    textContainer.addChild(text);
    stage.addChild(textContainer);
};
let main = () => {
    let stage = new createjs.Stage("myCanvas");
    setupEventsForCommunication();
    setupGame(stage);
    setupScoreboard(stage);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    handleEvents(stage);
    eventBus.subscribe('end', () => {
        createjs.Ticker.removeAllEventListeners();
    });
};

win.addEventListener("load", function () {
    main();
});