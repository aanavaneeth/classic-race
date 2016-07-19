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

	/**
	 * Created by navaneeth on 29-06-2016.
	 */

	var win = window;
	var Game = __webpack_require__(1);
	var eventBus = __webpack_require__(3);
	var dimensions = __webpack_require__(4);

	var setupEventsForCommunication = function setupEventsForCommunication() {
	    eventBus.addTopic('start');
	    eventBus.addTopic('end');
	    eventBus.addTopic('pause');
	    eventBus.addTopic('continue');
	    eventBus.addTopic('playerPosition');
	};

	var setCanvasSize = function setCanvasSize(parent, stage) {
	    stage.canvas.width = dimensions.canvasWidth;
	    stage.canvas.height = dimensions.canvasHeight;
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
	    createjs.Ticker.on("tick", function () {
	        stage.update();
	    });
	};

	var setupGame = function setupGame(stage) {
	    var game = new Game();
	    stage.addChild(game);
	};
	var setupScoreboard = function setupScoreboard(stage) {
	    var textContainer = new createjs.Container();
	    var shape = new createjs.Shape();
	    shape.graphics.f('#ADBDB0').dr(0, 0, dimensions.canvasWidth, 40);
	    textContainer.addChild(shape);
	    var text = new createjs.Text("Score 0000", "30px Aldrich", '#000');
	    text.x = dimensions.canvasWidth / 4;
	    textContainer.addChild(text);
	    stage.addChild(textContainer);
	};
	var main = function main() {
	    var stage = new createjs.Stage("myCanvas");
	    setupEventsForCommunication();
	    setupGame(stage);
	    setupScoreboard(stage);
	    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	    handleEvents(stage);
	    eventBus.subscribe('end', function () {
	        createjs.Ticker.removeAllEventListeners();
	    });
	};

	win.addEventListener("load", function () {
	    main();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var BackgroundEntity = __webpack_require__(2);
	var Speed = __webpack_require__(5);
	var Player = __webpack_require__(6);
	var Obstacles = __webpack_require__(8);
	var dimensions = __webpack_require__(4);
	var dim = dimensions.dim;

	var Game = function (_cjs$Container) {
	    _inherits(Game, _cjs$Container);

	    function Game() {
	        _classCallCheck(this, Game);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));

	        _this.speed = new Speed(45);
	        _this.backgroundQueue = [new BackgroundEntity(_this.speed), new BackgroundEntity(_this.speed)];
	        _this.backgroundQueue[1].y = -_this.backgroundQueue[1].height;
	        _this.player = new Player();
	        _this.player.x = dim * 2;
	        _this.addChild.apply(_this, _this.backgroundQueue);
	        _this.addChild(new Obstacles(_this.speed));
	        _this.addChild(_this.player);
	        return _this;
	    }

	    return Game;
	}(cjs.Container);

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var eventBus = __webpack_require__(3);
	var dimensions = __webpack_require__(4);
	var dim = dimensions.dim;
	var lineThickness = dimensions.lineThickness;
	var backgroundEntityLength = dimensions.backgroundEntityLength;
	var backgroundEntityWidth = dimensions.backgroundEntityWidth;
	var backgroundEntityPositionReset = dimensions.backgroundEntityPositionReset;

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
	            this.height = backgroundEntityLength * dim;
	            for (var i = 0; i < backgroundEntityLength; i++) {
	                for (var j = 0; j < backgroundEntityWidth; j++) {
	                    if (i % 3 !== 0 && (j == 0 || j === 9)) {
	                        this.outerRect.graphics.f("#020401").dr(dim * j, dim * i, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(dim * j + lineThickness, dim * i + lineThickness).lt(dim * (j + 1) - lineThickness, dim * i + lineThickness).lt(dim * (j + 1) - lineThickness, dim * (i + 1) - lineThickness).lt(dim * j + lineThickness, dim * (i + 1) - lineThickness).lt(dim * j + lineThickness, dim * i + lineThickness).es();
	                    } else {
	                        this.outerRect.graphics.f("#A2B2A5").dr(dim * j, dim * i, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(dim * j + lineThickness, dim * i + lineThickness).lt(dim * (j + 1) - lineThickness, dim * i + lineThickness).lt(dim * (j + 1) - lineThickness, dim * (i + 1) - lineThickness).lt(dim * j + lineThickness, dim * (i + 1) - lineThickness).lt(dim * j + lineThickness, dim * i + lineThickness).es();
	                    }
	                }
	            }
	            this.outerRect.cache(0, 0, backgroundEntityWidth * dim, this.height);
	            this.addChild(this.outerRect);
	        }
	    }, {
	        key: 'eventListener',
	        value: function eventListener() {
	            if (this.y >= backgroundEntityPositionReset) {
	                this.y = -this.height + (this.y - backgroundEntityPositionReset);
	            }
	            this.y += this.speed.getSpeed();
	        }
	    }]);

	    return BackgroundEntity;
	}(cjs.Container);

	module.exports = BackgroundEntity;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var dim = 60;
	var lineThickness = 2.5;
	var backgroundEntityLength = 17;
	var backgroundEntityWidth = 10;
	//
	// let dim = 30;
	// let lineThickness = 1.5;
	// let backgroundEntityLength = 20;
	// let backgroundEntityWidth = 10;

	var carHeight = 4;
	var backgroundEntityPositionReset = dim * backgroundEntityLength;
	var canvasHeight = dim * (backgroundEntityLength - 1);
	var canvasWidth = dim * backgroundEntityWidth;

	module.exports = {
	  dim: dim,
	  lineThickness: lineThickness,
	  backgroundEntityLength: backgroundEntityLength,
	  backgroundEntityWidth: backgroundEntityWidth,
	  backgroundEntityPositionReset: backgroundEntityPositionReset,
	  canvasHeight: canvasHeight,
	  canvasWidth: canvasWidth,
	  carHeight: carHeight
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (argSpeed) {

	    var speed = argSpeed | 0;
	    this.getSpeed = function () {
	        return speed;
	    };
	    this.setSpeed = function (argSpeed) {
	        speed = argSpeed;
	        return speed;
	    };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by navaneeth on 13-07-2016.
	 */

	var doc = window.document;
	var dimensions = __webpack_require__(4);
	var Car = __webpack_require__(7);
	var eventBus = __webpack_require__(3);

	var dim = dimensions.dim;
	var playerPosition = (dimensions.backgroundEntityLength - 1 - dimensions.carHeight) * dim;

	var Player = function (_Car) {
	    _inherits(Player, _Car);

	    function Player() {
	        _classCallCheck(this, Player);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this));

	        _this.disableMovement = false;
	        _this.y = playerPosition;
	        _this.addKeyBoardEvent();
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
	        key: 'addKeyBoardEvent',
	        value: function addKeyBoardEvent() {
	            var _this2 = this;

	            doc.addEventListener('keydown', function (evt) {
	                if (!_this2.disableMovement) {
	                    switch (evt.keyCode) {
	                        case 37:
	                            //left arrow keycode
	                            _this2.x = dim * 2;
	                            eventBus.publish('playerPosition', _this2.x);
	                            break;
	                        case 39:
	                            //right arrow keycode
	                            _this2.x = dim * 5;
	                            eventBus.publish('playerPosition', _this2.x);
	                    }
	                }
	            });
	        }
	    }]);

	    return Player;
	}(Car);

	module.exports = Player;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var dimensions = __webpack_require__(4);
	var dim = dimensions.dim;
	var lineThickness = dimensions.lineThickness;

	var Car = function (_cjs$Container) {
	    _inherits(Car, _cjs$Container);

	    function Car() {
	        _classCallCheck(this, Car);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Car).call(this));

	        _this.outerRect = new cjs.Shape();
	        _this.outerRect.graphics.f("#020401").dr(dim, 0, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(dim + lineThickness, lineThickness).lt(dim * 2 - lineThickness, lineThickness).lt(dim * 2 - lineThickness, dim - lineThickness).lt(dim + lineThickness, dim - lineThickness).lt(dim + lineThickness, lineThickness).es().dr(0, dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(lineThickness, dim + lineThickness).lt(dim - lineThickness, dim + lineThickness).lt(dim - lineThickness, 2 * dim - lineThickness).lt(lineThickness, 2 * dim - lineThickness).lt(lineThickness, dim + lineThickness).es().dr(dim, dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(dim + lineThickness, dim + lineThickness).lt(dim * 2 - lineThickness, dim + lineThickness).lt(dim * 2 - lineThickness, 2 * dim - lineThickness).lt(dim + lineThickness, 2 * dim - lineThickness).lt(dim + lineThickness, dim + lineThickness).es().dr(2 * dim, dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(2 * dim + lineThickness, dim + lineThickness).lt(dim * 3 - lineThickness, dim + lineThickness).lt(dim * 3 - lineThickness, 2 * dim - lineThickness).lt(2 * dim + lineThickness, 2 * dim - lineThickness).lt(2 * dim + lineThickness, dim + lineThickness).es().dr(dim, 2 * dim, dim, dim).s('#ADBDB0').ss(4, "square").mt(dim + lineThickness, 2 * dim + lineThickness).lt(dim * 2 - lineThickness, 2 * dim + lineThickness).lt(dim * 2 - lineThickness, 3 * dim - lineThickness).lt(dim + lineThickness, 3 * dim - lineThickness).lt(dim + lineThickness, 2 * dim + lineThickness).es().dr(0, 3 * dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(lineThickness, 3 * dim + lineThickness).lt(dim - lineThickness, 3 * dim + lineThickness).lt(dim - lineThickness, 4 * dim - lineThickness).lt(lineThickness, 4 * dim - lineThickness).lt(lineThickness, 3 * dim + lineThickness).es().dr(2 * dim, 3 * dim, dim, dim).s('#ADBDB0').ss(lineThickness, "square").mt(2 * dim + lineThickness, 3 * dim + lineThickness).lt(3 * dim - lineThickness, 3 * dim + lineThickness).lt(3 * dim - lineThickness, 4 * dim - lineThickness).lt(2 * dim + lineThickness, 4 * dim - lineThickness).lt(2 * dim + lineThickness, 3 * dim + lineThickness).es();
	        _this.outerRect.cache(0, 0, 3 * dim, 4 * dim);

	        _this.addChild(_this.outerRect);

	        return _this;
	    }

	    return Car;
	}(cjs.Container);

	module.exports = Car;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cjs = createjs;
	var Car = __webpack_require__(7);
	var eventBus = __webpack_require__(3);
	var dimensions = __webpack_require__(4);
	var dim = dimensions.dim;

	var Obstacles = function (_cjs$Container) {
	    _inherits(Obstacles, _cjs$Container);

	    function Obstacles(speed) {
	        _classCallCheck(this, Obstacles);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Obstacles).call(this));

	        _this.speed = speed;

	        var ob1 = new Car();
	        ob1.y = -300;
	        ob1.x = 2 * dim;

	        var ob2 = new Car();
	        ob2.y = -800;
	        ob2.x = 5 * dim;

	        var ob3 = new Car();
	        ob3.y = -1200;
	        ob3.x = 2 * dim;

	        var ob4 = new Car();
	        ob4.y = -1800;
	        ob4.x = 5 * dim;
	        _this.objs = [ob1, ob2, ob3, ob4];
	        _this.objs.forEach(function (child) {
	            _this.addChild(child);
	        });
	        _this.tickerListeners = _this.setTickerEventListeners();
	        _this.playerPosition = 2 * dim;

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
	            var yPos = this.objs[lastPos].y - (Math.floor(Math.random() * 6) + 8) * dim;
	            return {
	                x: rand1or2 === 1 ? 2 * dim : 5 * dim,
	                y: yPos
	            };
	        }
	    }, {
	        key: 'setTickerEventListeners',
	        value: function setTickerEventListeners() {
	            var _this2 = this;

	            var listeners = [];
	            // is there a way to map?
	            this.objs.forEach(function (obj, index) {
	                listeners.push(function () {
	                    obj.y += _this2.speed.getSpeed();
	                    if (obj.y > dimensions.canvasHeight) {
	                        var position = _this2.getObstaclePosition(index + 1);
	                        obj.y = position.y;
	                        obj.x = position.x;
	                    }
	                });
	            });
	            return listeners;
	        }
	    }]);

	    return Obstacles;
	}(cjs.Container);

	module.exports = Obstacles;

/***/ }
/******/ ]);