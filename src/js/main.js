let win = window;
let cjs = createjs;
let styles = require('../styles.scss');
let eventBus = require('./event-bus');
let banners = require('./banners');
let dimensionsSetup = require('./dimensions-setup');
let GameField = require('./game-field');


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

let handleEvents = () => {
    const GAME_START = 0, GAME_RUNNING = 1, GAME_PAUSE = 2;
    let gameStatus = GAME_START;
    win.addEventListener('keypress', (evt) => {
        if (evt.keyCode === 32) {
            switch (gameStatus) {
                case GAME_START:
                    eventBus.publish('start');
                    gameStatus = GAME_RUNNING;
                    break;
                // case GAME_RUNNING: //getting rid of pause functionality
                //     eventBus.publish('pause');
                //     gameStatus = GAME_PAUSE;
                //     break;
                // case GAME_PAUSE:
                //     eventBus.publish('continue');
                //     gameStatus = GAME_RUNNING;
                //     break;
            }
        }
    });
    win.addEventListener('touchend', touchAndStart);
};

let main = () => {
    let offsetHeight = document.getElementById('canvas-container').offsetHeight;
    let offsetWidth = document.getElementById('canvas-container').offsetWidth;
    setupEventsForCommunication();
    dimensionsSetup.setupDimensions(offsetHeight, offsetWidth);
    cjs.Ticker.timingMode = cjs.Ticker.RAF;
    banners.getInstance();
    handleEvents();

    eventBus.subscribe('end', () => {
    });
    eventBus.subscribe('start', () => {
        win.removeEventListener('touchend', touchAndStart)
    });
    var gameField = new GameField();
};

win.addEventListener("load", function () {
    main();
});