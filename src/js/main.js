let win = window;
let styles = require('../styles.scss');
let Game = require('./game');
let eventBus = require('./event-bus');
let ScoreBoard = require('./scoreboard');
let dimensions;
let dimensionsSetup = require('./dimensions-setup');


let setupEventsForCommunication = function () {
    eventBus.addTopic('start');
    eventBus.addTopic('end');
    eventBus.addTopic('pause');
    eventBus.addTopic('continue');
    eventBus.addTopic('playerPosition');
    eventBus.addTopic('incrementScore');
};

let setCanvasSize = (parent, stage) => {
    stage.canvas.width = dimensions.canvasWidth;
    stage.canvas.height = dimensions.canvasHeight;
};

let touchAndStart = (evt) => {
    evt.preventDefault();
    eventBus.publish('start');
};

let handleEvents = (stage) => {
    const GAME_START = 0, GAME_RUNNING = 1, GAME_PAUSE = 2;
    let gameStatus = GAME_START;
    let parent = win.document.getElementById('canvas-container');
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
    setCanvasSize(parent, stage);
    win.addEventListener('keypress', (evt) => {
        if (evt.keyCode === 32) {
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
    win.addEventListener('touchend', touchAndStart);
    createjs.Ticker.on("tick", () => {
        stage.update()
    });
};

let setupGame = function (stage) {
    let game = new Game();
    stage.addChild(game);
};
var setupScoreboard = function (stage) {
    let scoreboard = new ScoreBoard();
     stage.addChild(scoreboard);
};

let hideBanners = (...cssClasses) => {
    var selector = cssClasses.map((cssClass) => {
        return `.${cssClass} `;
    }). join(',');
    Array.prototype.forEach.call(win.document.querySelectorAll(selector), (ele) => {
        ele.classList.add('hide-banner')
    });
};

let showBanners = (...cssClasses) => {
    var selector = cssClasses.map((cssClass) => {
        return `.${cssClass} `;
    }). join(',');
    Array.prototype.forEach.call(win.document.querySelectorAll(selector), (ele) => {
        ele.classList.remove('hide-banner')
    });
};

let main = () => {
    let offsetHeight = document.getElementById('canvas-container').offsetHeight;
    let offsetWidth = document.getElementById('canvas-container').offsetWidth;
    let stage = new createjs.Stage("myCanvas");
    setupEventsForCommunication();
    dimensionsSetup.setupDimensions(offsetHeight, offsetWidth);
    dimensions = dimensionsSetup.getDimensions();
    setupGame(stage);
    setupScoreboard(stage);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    handleEvents(stage);

    eventBus.subscribe('end', () => {
        hideBanners('start', 'pause');
        showBanners('end', 'banner');
        createjs.Ticker.removeAllEventListeners();
        stage.removeAllChildren();
        stage.update();
        let game = new Game();
        stage.addChild(game);
    });
    eventBus.subscribe('start', () => {
        hideBanners('start', 'pause', 'end', 'banner');
        win.removeEventListener('touchend', touchAndStart)
    });

    eventBus.subscribe('pause', () => {
        hideBanners('start', 'end');
        showBanners('pause', 'banner');
    });

    eventBus.subscribe('continue', () => {
        hideBanners('start', 'pause', 'end', 'banner');
    });


};

win.addEventListener("load", function () {
    main();
});