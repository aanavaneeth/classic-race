/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var win = window;
	var styles = __webpack_require__(1);
	var Game = __webpack_require__(2);
	var eventBus = __webpack_require__(4);
	var ScoreBoard = __webpack_require__(10);
	var dimensions = void 0;
	var dimensionsSetup = __webpack_require__(5);

	var setupEventsForCommunication = function setupEventsForCommunication() {
	    eventBus.addTopic('start');
	    eventBus.addTopic('end');
	    eventBus.addTopic('pause');
	    eventBus.addTopic('continue');
	    eventBus.addTopic('playerPosition');
	    eventBus.addTopic('incrementScore');
	};

	var setCanvasSize = function setCanvasSize(parent, stage) {
	    stage.canvas.width = dimensions.canvasWidth;
	    stage.canvas.height = dimensions.canvasHeight;
	};

	var touchAndStart = function touchAndStart(evt) {
	    evt.preventDefault();
	    eventBus.publish('start');
	};

	var handleEvents = function handleEvents(stage) {
	    var GAME_START = 0,
	        GAME_RUNNING = 1,
	        GAME_PAUSE = 2;
	    var gameStatus = GAME_START;
	    var parent = win.document.getElementById('canvas-container');
	    if (createjs.Touch.isSupported()) {
	        createjs.Touch.enable(stage);
	    }
	    setCanvasSize(parent, stage);
	    win.addEventListener('keypress', function (evt) {
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
	    createjs.Ticker.on("tick", function () {
	        stage.update();
	    });
	};

	var setupGame = function setupGame(stage) {
	    var game = new Game();
	    stage.addChild(game);
	};
	var setupScoreboard = function setupScoreboard(stage) {
	    // let textContainer = new createjs.Container();
	    // let shape = new createjs.Shape();
	    // shape.graphics.f('#ADBDB0').dr(0, 0, dimensions.canvasWidth, dimensions.scoreBoardHeight);
	    // textContainer.addChild(shape);
	    // let text = new createjs.Text("Score 0000", "30px Aldrich", '#000');
	    // text.x = dimensions.canvasWidth / 4;
	    // textContainer.addChild(text);
	    var scoreboard = new ScoreBoard();
	    stage.addChild(scoreboard);
	};

	var hideBanners = function hideBanners() {
	    for (var _len = arguments.length, cssClasses = Array(_len), _key = 0; _key < _len; _key++) {
	        cssClasses[_key] = arguments[_key];
	    }

	    var selector = cssClasses.map(function (cssClass) {
	        return '.' + cssClass + ' ';
	    }).join(',');
	    Array.prototype.forEach.call(win.document.querySelectorAll(selector), function (ele) {
	        ele.classList.add('hide-banner');
	    });
	};

	var showBanners = function showBanners() {
	    for (var _len2 = arguments.length, cssClasses = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        cssClasses[_key2] = arguments[_key2];
	    }

	    var selector = cssClasses.map(function (cssClass) {
	        return '.' + cssClass + ' ';
	    }).join(',');
	    Array.prototype.forEach.call(win.document.querySelectorAll(selector), function (ele) {
	        ele.classList.remove('hide-banner');
	    });
	};

	var main = function main() {
	    var offsetHeight = document.getElementById('canvas-container').offsetHeight;
	    var offsetWidth = document.getElementById('canvas-container').offsetWidth;
	    var stage = new createjs.Stage("myCanvas");
	    setupEventsForCommunication();
	    dimensionsSetup.setupDimensions(offsetHeight, offsetWidth);
	    dimensions = dimensionsSetup.getDimensions();
	    setupGame(stage);
	    setupScoreboard(stage);
	    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	    handleEvents(stage);

	    eventBus.subscribe('end', function () {
	        hideBanners('start', 'pause');
	        showBanners('end', 'banner');
	        createjs.Ticker.removeAllEventListeners();
	        stage.removeAllChildren();
	        var game = new Game();
	        stage.addChild(game);
	    });
	    eventBus.subscribe('start', function () {
	        hideBanners('start', 'pause', 'end', 'banner');
	        win.removeEventListener('touchend', touchAndStart);
	    });

	    eventBus.subscribe('pause', function () {
	        hideBanners('start', 'end');
	        showBanners('pause', 'banner');
	    });

	    eventBus.subscribe('continue', function () {
	        hideBanners('start', 'pause', 'end', 'banner');
	    });
	};

	win.addEventListener("load", function () {
	    main();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var BackgroundEntity = __webpack_require__(3);
	var speed = __webpack_require__(6);
	var Player = __webpack_require__(7);
	var Obstacles = __webpack_require__(9);
	var dimensions = __webpack_require__(5).getDimensions();

	var Game = function (_cjs$Container) {
	    _inherits(Game, _cjs$Container);

	    function Game() {
	        _classCallCheck(this, Game);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));

	        _this.speed = speed;
	        _this.speed.setSpeed(dimensions.dim * 0.25);
	        _this.backgroundQueue = [new BackgroundEntity(_this.speed), new BackgroundEntity(_this.speed)];
	        _this.backgroundQueue[1].y = -_this.backgroundQueue[1].height;
	        _this.player = new Player();
	        _this.player.x = dimensions.dim * 2;
	        _this.addChild.apply(_this, _this.backgroundQueue);
	        _this.addChild(new Obstacles(_this.speed));
	        _this.addChild(_this.player);
	        return _this;
	    }

	    return Game;
	}(cjs.Container);

	module.exports = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var eventBus = __webpack_require__(4);
	var dimensions = __webpack_require__(5).getDimensions();

	var BackgroundEntity = function (_cjs$Container) {
	    _inherits(BackgroundEntity, _cjs$Container);

	    function BackgroundEntity(speed) {
	        _classCallCheck(this, BackgroundEntity);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BackgroundEntity).call(this));

	        _this.speed = speed;
	        _this.outerRect = new cjs.Shape();
	        _this.setup();
	        _this.__listener = _this.eventListener.bind(_this);

	        eventBus.subscribe('start', function () {
	            cjs.Ticker.addEventListener("tick", _this.__listener);
	        });
	        eventBus.subscribe('continue', function () {
	            cjs.Ticker.addEventListener("tick", _this.__listener);
	        });
	        eventBus.subscribe('pause', function () {
	            cjs.Ticker.removeEventListener("tick", _this.__listener);
	        });
	        return _this;
	    }

	    _createClass(BackgroundEntity, [{
	        key: 'setup',
	        value: function setup() {
	            this.height = dimensions.backgroundEntityLength * dimensions.dim;
	            for (var i = 0; i < dimensions.backgroundEntityLength; i++) {
	                for (var j = 0; j < dimensions.backgroundEntityWidth; j++) {
	                    if (i % 3 !== 0 && (j == 0 || j === 9)) {
	                        this.outerRect.graphics.f("#020401").dr(dimensions.dim * j, dimensions.dim * i, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).lt(dimensions.dim * (j + 1) - dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).lt(dimensions.dim * (j + 1) - dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness).lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness).lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).es();
	                    } else {
	                        this.outerRect.graphics.f("#A2B2A5").dr(dimensions.dim * j, dimensions.dim * i, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).lt(dimensions.dim * (j + 1) - dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).lt(dimensions.dim * (j + 1) - dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness).lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * (i + 1) - dimensions.lineThickness).lt(dimensions.dim * j + dimensions.lineThickness, dimensions.dim * i + dimensions.lineThickness).es();
	                    }
	                }
	            }
	            this.outerRect.cache(0, 0, dimensions.backgroundEntityWidth * dimensions.dim, this.height);
	            this.addChild(this.outerRect);
	        }
	    }, {
	        key: 'eventListener',
	        value: function eventListener() {
	            if (this.y >= dimensions.backgroundEntityPositionReset) {
	                this.y = -this.height + (this.y - dimensions.backgroundEntityPositionReset);
	            }
	            this.y += this.speed.getSpeed();
	        }
	    }]);

	    return BackgroundEntity;
	}(cjs.Container);

	module.exports = BackgroundEntity;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var topics = {};
	var callbackID = -1;

	var addTopic = function addTopic(topic) {
	    if (!topic || !!topics[topic]) {
	        return false;
	    }
	    topics[topic] = [];
	    return true;
	};

	var removeTopic = function removeTopic(topic) {
	    if (!topic) {
	        return false;
	    }
	    return delete topic[topic];
	};

	var subscribe = function subscribe(topic, callback) {
	    if (!topics[topic]) {
	        return false;
	    }
	    callbackID++;
	    topics[topic].push({
	        token: callbackID.toString(),
	        callback: callback
	    });
	    return callbackID;
	};

	var publish = function publish(topic, args) {
	    if (!topics[topic]) {
	        return false;
	    }
	    topics[topic].forEach(function (subscriber) {
	        subscriber.callback.apply(null, [args]);
	    });
	};

	var unsubscribe = function unsubscribe(token) {
	    for (var m in topics) {
	        if (topics[m]) {
	            for (var i = 0, j = topics[m].length; i < j; i++) {
	                if (topics[m][i].token === token) {
	                    topics[m].splice(i, 1);
	                    return token;
	                }
	            }
	        }
	    }
	    return false;
	};

	module.exports = {
	    addTopic: addTopic,
	    removeTopic: removeTopic,
	    subscribe: subscribe,
	    publish: publish,
	    unsubscribe: unsubscribe
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var carHeight = 4;
	var backgroundEntityLength = 18;
	var backgroundEntityWidth = 10;
	var dimensions = {
	    backgroundEntityLength: backgroundEntityLength,
	    backgroundEntityWidth: backgroundEntityWidth,
	    carHeight: carHeight,
	    levelUpScore: 4
	};

	var setupDimensions = function setupDimensions(offsetHeight, offsetWidth) {
	    var boxDimByOffsetHeight = offsetHeight / (backgroundEntityLength + 1);
	    var boxDimByOffsetWidth = offsetWidth / backgroundEntityWidth;

	    dimensions.dim = Math.min(boxDimByOffsetHeight, boxDimByOffsetWidth);
	    dimensions.lineThickness = dimensions.dim / 20;
	    dimensions.backgroundEntityPositionReset = dimensions.dim * backgroundEntityLength;
	    dimensions.canvasHeight = dimensions.dim * (backgroundEntityLength - 1);
	    dimensions.canvasWidth = dimensions.dim * backgroundEntityWidth;
	    dimensions.scoreBoardHeight = offsetHeight - dimensions.canvasHeight; //need correction
	    dimensions.initialPlayerPosition = { X: dimensions.dim * 2, Y: (dimensions.backgroundEntityLength - 1 - dimensions.carHeight) * dimensions.dim };
	    dimensions.offsetWidth = offsetWidth;
	};

	var getDimensions = function getDimensions() {
	    return dimensions;
	};

	module.exports = {
	    setupDimensions: setupDimensions,
	    getDimensions: getDimensions
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Speed = function () {
	    function Speed(argSpeed) {
	        _classCallCheck(this, Speed);

	        this.__speed = argSpeed | 0;
	    }

	    _createClass(Speed, [{
	        key: "getSpeed",
	        value: function getSpeed() {
	            return this.__speed;
	        }
	    }, {
	        key: "setSpeed",
	        value: function setSpeed(argSpeed) {
	            this.__speed = argSpeed;
	            return this.__speed;
	        }
	    }]);

	    return Speed;
	}();

	var speed = new Speed();

	module.exports = speed;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var doc = window.document;
	var dimensions = __webpack_require__(5).getDimensions();
	var Car = __webpack_require__(8);
	var eventBus = __webpack_require__(4);

	var Player = function (_Car) {
	    _inherits(Player, _Car);

	    function Player() {
	        _classCallCheck(this, Player);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this));

	        _this.disableMovement = false;
	        _this.y = dimensions.initialPlayerPosition.Y;
	        _this.addPlayerMovementEvents();
	        eventBus.subscribe('pause', function () {
	            _this.disableMovement = true;
	        });
	        eventBus.subscribe('start', function () {
	            _this.disableMovement = false;
	        });

	        eventBus.subscribe('continue', function () {
	            _this.disableMovement = false;
	        });

	        return _this;
	    }

	    _createClass(Player, [{
	        key: 'addPlayerMovementEvents',
	        value: function addPlayerMovementEvents() {
	            var _this2 = this;

	            var midPointX = dimensions.offsetWidth / 2;
	            doc.addEventListener('keydown', function (evt) {
	                if (!_this2.disableMovement) {
	                    switch (evt.keyCode) {
	                        case 37:
	                            //left arrow keycode
	                            _this2.x = dimensions.dim * 2;
	                            eventBus.publish('playerPosition', { X: _this2.x, Y: _this2.y });
	                            break;
	                        case 39:
	                            //right arrow keycode
	                            _this2.x = dimensions.dim * 5;
	                            eventBus.publish('playerPosition', { X: _this2.x, Y: _this2.y });
	                    }
	                }
	            });
	            doc.addEventListener('touchend', function (evt) {
	                evt.preventDefault();
	                var finalTouch = evt.changedTouches[evt.changedTouches.length - 1];
	                var finalX = finalTouch.pageX;

	                if (evt.changedTouches.length === 1) {
	                    if (finalX <= midPointX) {
	                        _this2.x = dimensions.dim * 2;
	                        eventBus.publish('playerPosition', { X: _this2.x, Y: _this2.y });
	                    } else if (finalX > midPointX) {
	                        _this2.x = dimensions.dim * 5;
	                        eventBus.publish('playerPosition', { X: _this2.x, Y: _this2.y });
	                    }
	                } else {
	                    var firstTouch = evt.changedTouches[0];
	                    var firstX = firstTouch.pageX;
	                    var direction = finalX - firstX < 0 ? true : false;
	                    if (direction) {
	                        _this2.x = dimensions.dim * 2;
	                        eventBus.publish('playerPosition', { X: _this2.x, Y: _this2.y });
	                    } else {
	                        _this2.x = dimensions.dim * 5;
	                        eventBus.publish('playerPosition', { X: _this2.x, Y: _this2.y });
	                    }
	                }

	                return false;
	            });
	        }
	    }]);

	    return Player;
	}(Car);

	module.exports = Player;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var dimensions = __webpack_require__(5).getDimensions();

	var Car = function (_cjs$Container) {
	    _inherits(Car, _cjs$Container);

	    function Car() {
	        _classCallCheck(this, Car);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Car).call(this));

	        _this.outerRect = new cjs.Shape();
	        _this.outerRect.graphics.f("#020401").dr(dimensions.dim, 0, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(dimensions.dim + dimensions.lineThickness, dimensions.lineThickness).lt(dimensions.dim * 2 - dimensions.lineThickness, dimensions.lineThickness).lt(dimensions.dim * 2 - dimensions.lineThickness, dimensions.dim - dimensions.lineThickness).lt(dimensions.dim + dimensions.lineThickness, dimensions.dim - dimensions.lineThickness).lt(dimensions.dim + dimensions.lineThickness, dimensions.lineThickness).es().dr(0, dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).lt(dimensions.dim - dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).lt(dimensions.dim - dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness).lt(dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness).lt(dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).es().dr(dimensions.dim, dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).lt(dimensions.dim * 2 - dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).lt(dimensions.dim * 2 - dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness).lt(dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness).lt(dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).es().dr(2 * dimensions.dim, dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(2 * dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).lt(dimensions.dim * 3 - dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).lt(dimensions.dim * 3 - dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness).lt(2 * dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim - dimensions.lineThickness).lt(2 * dimensions.dim + dimensions.lineThickness, dimensions.dim + dimensions.lineThickness).es().dr(dimensions.dim, 2 * dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(4, "square").mt(dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim + dimensions.lineThickness).lt(dimensions.dim * 2 - dimensions.lineThickness, 2 * dimensions.dim + dimensions.lineThickness).lt(dimensions.dim * 2 - dimensions.lineThickness, 3 * dimensions.dim - dimensions.lineThickness).lt(dimensions.dim + dimensions.lineThickness, 3 * dimensions.dim - dimensions.lineThickness).lt(dimensions.dim + dimensions.lineThickness, 2 * dimensions.dim + dimensions.lineThickness).es().dr(0, 3 * dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).lt(dimensions.dim - dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).lt(dimensions.dim - dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness).lt(dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness).lt(dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).es().dr(2 * dimensions.dim, 3 * dimensions.dim, dimensions.dim, dimensions.dim).s('#ADBDB0').ss(dimensions.lineThickness, "square").mt(2 * dimensions.dim + dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).lt(3 * dimensions.dim - dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).lt(3 * dimensions.dim - dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness).lt(2 * dimensions.dim + dimensions.lineThickness, 4 * dimensions.dim - dimensions.lineThickness).lt(2 * dimensions.dim + dimensions.lineThickness, 3 * dimensions.dim + dimensions.lineThickness).es();
	        _this.outerRect.cache(0, 0, 3 * dimensions.dim, 4 * dimensions.dim);

	        _this.addChild(_this.outerRect);

	        return _this;
	    }

	    return Car;
	}(cjs.Container);

	module.exports = Car;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var Car = __webpack_require__(8);
	var eventBus = __webpack_require__(4);
	var dimensions = __webpack_require__(5).getDimensions();

	var Obstacles = function (_cjs$Container) {
	    _inherits(Obstacles, _cjs$Container);

	    function Obstacles(speed) {
	        _classCallCheck(this, Obstacles);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Obstacles).call(this));

	        _this.speed = speed;
	        var ob1 = new Car();
	        ob1.y = -(dimensions.dim * 3);
	        ob1.x = 2 * dimensions.dim;

	        var ob2 = new Car();
	        ob2.y = -(dimensions.dim * 13);
	        ob2.x = 5 * dimensions.dim;

	        var ob3 = new Car();
	        ob3.y = -(dimensions.dim * 23);
	        ob3.x = 2 * dimensions.dim;

	        var ob4 = new Car();
	        ob4.y = -(dimensions.dim * 35);
	        ob4.x = 5 * dimensions.dim;
	        _this.objs = [ob1, ob2, ob3, ob4];
	        _this.objs.forEach(function (child) {
	            _this.addChild(child);
	        });
	        _this.tickerListeners = _this.setTickerEventListeners();
	        _this.playerPosition = dimensions.initialPlayerPosition;

	        eventBus.subscribe('start', function () {
	            _this.tickerListeners.map(function (listener) {
	                cjs.Ticker.addEventListener("tick", listener);
	            });
	        });
	        eventBus.subscribe('continue', function () {
	            _this.tickerListeners.map(function (listener) {
	                cjs.Ticker.addEventListener("tick", listener);
	            });
	        });
	        eventBus.subscribe('pause', function () {
	            _this.tickerListeners.map(function (listener) {
	                cjs.Ticker.removeEventListener("tick", listener);
	            });
	        });
	        eventBus.subscribe('playerPosition', function (position) {
	            _this.playerPosition = position;
	        });

	        return _this;
	    }

	    _createClass(Obstacles, [{
	        key: 'getObstaclePosition',
	        value: function getObstaclePosition(index) {
	            var rand1or2 = Math.floor(Math.random() * 2) + 1;
	            var lastPos = index > 1 ? index - 2 : 3;
	            //Math.floor(Math.random()*(max-min+1)+min); max:
	            var yPos = this.objs[lastPos].y - (Math.floor(Math.random() * 4) + 10) * dimensions.dim;
	            return {
	                x: rand1or2 === 1 ? 2 * dimensions.dim : 5 * dimensions.dim,
	                y: yPos
	            };
	        }
	    }, {
	        key: 'setTickerEventListeners',
	        value: function setTickerEventListeners() {
	            var _this2 = this;

	            var listeners = [];
	            var carHeight = dimensions.dim * dimensions.carHeight;
	            // is there a way to map?
	            this.objs.forEach(function (obj, index) {
	                listeners.push(function () {
	                    if (obj.x === _this2.playerPosition.X && obj.y + carHeight >= _this2.playerPosition.Y) {
	                        eventBus.publish('end');
	                        return;
	                    }
	                    if (obj.y > dimensions.canvasHeight) {
	                        var position = _this2.getObstaclePosition(index + 1);
	                        obj.y = position.y;
	                        obj.x = position.x;
	                        eventBus.publish('incrementScore');
	                    }
	                    obj.y += _this2.speed.getSpeed();
	                });
	            });
	            return listeners;
	        }
	    }]);

	    return Obstacles;
	}(cjs.Container);

	module.exports = Obstacles;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var dimensions = __webpack_require__(5).getDimensions();
	var eventBus = __webpack_require__(4);
	var speed = __webpack_require__(6);

	var Scoreboard = function (_cjs$Container) {
	    _inherits(Scoreboard, _cjs$Container);

	    function Scoreboard() {
	        _classCallCheck(this, Scoreboard);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scoreboard).call(this));

	        var shape = new cjs.Shape();
	        shape.graphics.f('#ADBDB0').dr(0, 0, dimensions.canvasWidth, dimensions.scoreBoardHeight);
	        _this.score = 0;
	        var text = new createjs.Text("SCORE 0000", "30px Aldrich", '#000');
	        text.x = dimensions.canvasWidth / 4;
	        _this.addChild(shape);
	        _this.addChild(text);
	        eventBus.subscribe('incrementScore', function () {
	            _this.incrementScore();
	            text.text = _this.scoreText(_this.score);
	            speed.setSpeed(dimensions.dim * (0.25 + Math.floor(_this.score / dimensions.levelUpScore) / 20));
	        });
	        return _this;
	    }

	    _createClass(Scoreboard, [{
	        key: 'incrementScore',
	        value: function incrementScore() {
	            return ++this.score;
	        }
	    }, {
	        key: 'scoreText',
	        value: function scoreText(score) {
	            return "SCORE " + score.toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false });
	        }
	    }]);

	    return Scoreboard;
	}(cjs.Container);

	module.exports = Scoreboard;

/***/ }
/******/ ]);