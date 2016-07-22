let eventBus = require('./event-bus');
let win = window;

class Banners {
    constructor() {
        eventBus.subscribe('start', () => {
            this.hideAllBanners();
        });
        eventBus.subscribe('pause', () => {
            this.showGamePauseBanner();
        });
        eventBus.subscribe('end', () => {
            this.showGameEndBanner();
        });
        eventBus.subscribe('continue', () => {
            this.hideAllBanners();
        });
        this.showGameStartBanner();
    }

    hideBanners(...cssClasses) {
        var selector = cssClasses.map((cssClass) => {
            return `.${cssClass} `;
        }).join(',');
        Array.prototype.forEach.call(win.document.querySelectorAll(selector), (ele) => {
            ele.classList.add('hide-banner')
        });
    }

    showBanners(...cssClasses) {
        var selector = cssClasses.map((cssClass) => {
            return `.${cssClass} `;
        }).join(',');
        Array.prototype.forEach.call(win.document.querySelectorAll(selector), (ele) => {
            ele.classList.remove('hide-banner')
        });
    }

    showGameStartBanner() {
        this.hideAllBanners();
        this.showBanners('banner', 'start');
    }

    showGamePauseBanner() {
        this.hideAllBanners();
        this.showBanners('banner', 'pause');
    }
    showGameEndBanner() {
        this.hideAllBanners();
        this.showBanners('banner', 'end');
    }
    hideAllBanners() {
        this.hideBanners('banner', 'start', 'pause', 'end');
    }
}

let banners;
module.exports = {
    getInstance: () => {
        if(!banners) {
            banners = new Banners();
        }

        return banners;
    }
};