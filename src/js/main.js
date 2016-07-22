let win = window;
let cjs = createjs;
let styles = require('../styles.scss');
let Game = require('./game');
let eventBus = require('./event-bus');
let banners = require('./banners');
let dimensionsSetup = require('./dimensions-setup');


let setupEventsForCommunication = function () {
    eventBus.addTopic('start');
    eventBus.addTopic('end');
    eventBus.addTopic('pause');
    eventBus.addTopic('continue');
    eventBus.addTopic('playerPosition');
    eventBus.addTopic('incrementScore');
};


let touchAndStart = (evt) => {
    evt.preventDefault();
    eventBus.publish('start');
};

let handleEvents = (stage) => {
    const GAME_START = 0, GAME_RUNNING = 1, GAME_PAUSE = 2;
    let gameStatus = GAME_START;
    let parent = win.document.getElementById('canvas-container');
    if (cjs.Touch.isSupported()) {
        cjs.Touch.enable(stage);
    }
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
    cjs.Ticker.on("tick", () => {
        stage.update()
    });
};

let main = () => {
    let offsetHeight = document.getElementById('canvas-container').offsetHeight;
    let offsetWidth = document.getElementById('canvas-container').offsetWidth;
    setupEventsForCommunication();
    dimensionsSetup.setupDimensions(offsetHeight, offsetWidth);
    cjs.Ticker.timingMode = cjs.Ticker.RAF;
    banners.getInstance();

    handleEvents(stage);

    eventBus.subscribe('end', () => {
        cjs.Ticker.removeAllEventListeners();
        stage.removeAllChildren();
        stage.update();
        let game = new Game();
        stage.addChild(game);
    });
    eventBus.subscribe('start', () => {
        win.removeEventListener('touchend', touchAndStart)
    });
};

win.addEventListener("load", function () {
    main();
});