let doc = window.document;
let dimensions = require('./dimensions-setup').getDimensions();
let Car = require('./car');
let eventBus = require('./event-bus');

class Player extends Car {
    constructor() {
        super();
        this.disableMovement = false;
        this.y = dimensions.initialPlayerPosition.Y;
        this.addPlayerMovementEvents();
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
    addPlayerMovementEvents() {
        let midPointX = dimensions.offsetWidth/2;
        doc.addEventListener('keydown', (evt) => {
            if(!this.disableMovement) {
                switch (evt.keyCode) {
                    case 37: //left arrow keycode
                        this.x = dimensions.dim * 2;
                        eventBus.publish('playerPosition', {X: this.x, Y: this.y});
                        break;
                    case 39: //right arrow keycode
                        this.x = dimensions.dim * 5;
                        eventBus.publish('playerPosition', {X: this.x, Y: this.y});
                }
            }
        });
        doc.addEventListener('touchend', (evt) => {
            evt.preventDefault();
            let finalTouch = evt.changedTouches[evt.changedTouches.length - 1];
            let X = finalTouch.pageX;
            if(X <= midPointX) {
                this.x = dimensions.dim * 2;
                eventBus.publish('playerPosition', {X: this.x, Y: this.y});
            } else if(X > midPointX) {
                this.x = dimensions.dim * 5;
                eventBus.publish('playerPosition', {X: this.x, Y: this.y});
            }
            return false;
        });
    }
}

module.exports = Player;