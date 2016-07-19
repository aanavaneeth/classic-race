/**
 * Created by navaneeth on 13-07-2016.
 */

let doc = window.document;
let dimensions = require('./dimensions-setup').getDimensions();
let Car = require('./car');
let eventBus = require('./event-bus');

class Player extends Car {
    constructor() {
        super();
        this.disableMovement = false;
        this.y = ((dimensions.backgroundEntityLength -1) - dimensions.carHeight) * dimensions.dim; // player position
        this.addKeyBoardEvent();
        eventBus.subscribe('pause', () => {
            this.disableMovement =  true;
        });
        eventBus.subscribe('start', () => {
            this.disableMovement =  false;
        });

        eventBus.subscribe('continue', () => {
            this.disableMovement =  false;
        });

    }
    addKeyBoardEvent() {
        doc.addEventListener('keydown', (evt) => {
            if(!this.disableMovement) {
                switch (evt.keyCode) {
                    case 37: //left arrow keycode
                        this.x = dimensions.dim * 2;
                        eventBus.publish('playerPosition', this.x);
                        break;
                    case 39: //right arrow keycode
                        this.x = dimensions.dim * 5;
                        eventBus.publish('playerPosition', this.x);
                }
            }
        });
    }
}

module.exports = Player;