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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(4);

	var _compression2 = _interopRequireDefault(_compression);

	var _bodyParser = __webpack_require__(5);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(7);

	var _reactRouter = __webpack_require__(8);

	var _reactRouterRedux = __webpack_require__(9);

	var _reactRedux = __webpack_require__(10);

	var _redux = __webpack_require__(11);

	var _reduxThunk = __webpack_require__(12);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _index = __webpack_require__(13);

	var _index2 = _interopRequireDefault(_index);

	var _configureStore = __webpack_require__(16);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _routes = __webpack_require__(18);

	var _routes2 = _interopRequireDefault(_routes);

	var _api = __webpack_require__(22);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var os = __webpack_require__(26);
	var fs = __webpack_require__(27);

	var globalConfig = __webpack_require__(28);

	var GlobalPort = process.argv[2];
	var GlobalEnv = process.argv[3];

	var GlobalTotal = globalConfig[GlobalEnv];

	process.env.GlobalEnv = JSON.stringify(GlobalTotal);

	//console.log( EnvConfig )

	/**
	 * PORT 60010
	 * Env production 生产
	 * Env development 开发
	 * Env phoenix 代理
	 * @type {*|number}
	 */

	// store


	// router


	// app
	var app = (0, _express2.default)(); // app
	app.use((0, _compression2.default)()); // gzip
	app.use(_bodyParser2.default.json()); // for parsing application/json
	app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	// serve our static stuff like index.css
	var totalCacheTime = 86400000 / 2;

	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { index: false, maxAge: totalCacheTime }));

	function renderFullPage(parameters) {

	    /**
	     * HTML HTML
	     * STORE REACT-REDUX
	     * DATA TIME
	     * HASH CSS JS
	     */

	    console.log(parameters.STORE);

	    return '\n    <!doctype html public="SOA">\n    <html>\n    <head>\n        <meta charset="UTF-8">\n        <link type="image/x-icon" href="http://s3.sephorastatic.cn/wcsfrontend/members/common/favicon.ico" rel="shortcut icon">\n        <meta name="description" content="' + parameters.STORE.SEO.results.description + '">\n        <meta name="keywords" content="' + parameters.STORE.SEO.results.keywords + '">\n        <title>' + parameters.STORE.SEO.results.title + '</title>\n        <link rel=stylesheet href=' + parameters.HASH.main.css + ('>\n    </head>\n    </body>\n        <div id=root>' + parameters.HTML + '</div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(parameters.STORE) + ';\n            window.__INITIAL_ENV__ = ' + JSON.stringify(parameters.ENV) + '\n        </script>\n        <script src="') + parameters.HASH.vendor.js + '"></script>\n        <script src="/soa/js/jquery.min.js"></script>\n        <script src="/soa/js/jquery.cookie.js"></script>\n        <script src="/soa/js/initialize.min.js"></script>\n        <script src="' + parameters.HASH.main.js + '"></script>\n    </body>\n    </html>\n   ';
	}

	// api router
	// send all requests to index.html so browserHistory works
	app.use(/^\/api/, _api2.default);
	app.get('*', function (req, res) {

	    var Hash = __webpack_require__(29);

	    // server scope
	    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
	        if (error) {
	            res.status(500).send(error.message);
	        } else if (redirectLocation) {
	            res.redirectLocation(redirectLocation.pathname + redirectLocation.search);
	        } else if (renderProps) {

	            // PathName
	            var Address = renderProps.location.pathname;

	            var preloadedState = {};

	            preloadedState['SEO'] = {};
	            preloadedState['SEO']['status'] = 0;
	            preloadedState['SEO']['message'] = "Defaults";
	            preloadedState['SEO']['results'] = {};
	            preloadedState['SEO']['results']["title"] = "Title";
	            preloadedState['SEO']['results']['description'] = "Description";
	            preloadedState['SEO']['results']['keywords'] = "Keywords";

	            var store = (0, _configureStore2.default)(preloadedState);
	            var html = (0, _server.renderToString)(_react2.default.createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	            ));

	            res.end(renderFullPage({
	                "HTML": html,
	                "STORE": store.getState(),
	                "HASH": Hash,
	                "ENV": GlobalTotal
	            }));
	        } else {
	            res.type('html').status(404).send('Not Found - Node');
	        }
	    });
	});

	app.listen(GlobalPort, function (error) {
	    if (error) {
	        console.error(error);
	    } else {
	        console.info('==> \uD83C\uDF0E  Listening on port' + GlobalPort + ' . Open up http://localhost:' + GlobalPort + '/ in your browser.');
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(11);

	var _reactRouterRedux = __webpack_require__(9);

	var _SEO = __webpack_require__(14);

	var _SEO2 = _interopRequireDefault(_SEO);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	    SEO: _SEO2.default,
	    routing: _reactRouterRedux.routerReducer
	});

	exports.default = rootReducer;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    switch (action.type) {
	        default:
	            return state;
	    }
	};

	var _ActionTypes = __webpack_require__(15);

	var initialState = {};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * INIT
	 * @type {string}
	 */
	var SEO = exports.SEO = "SEO";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;

	var _reducers = __webpack_require__(13);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _redux = __webpack_require__(11);

	var _reduxThunk = __webpack_require__(12);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(17);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// debugtools

	var loggerMiddleware = (0, _reduxLogger2.default)();

	var logger = function logger(store) {
	    return function (next) {
	        return function (action) {
	            console.log('dispatching', action);
	            next(action);
	            console.log('next state', store.getState());
	        };
	    };
	};

	function configureStore(preloadedState) {
	    var store = (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware, logger));
	    return store;
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("redux-logger");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(8);

	var _Home = __webpack_require__(19);

	var _Home2 = _interopRequireDefault(_Home);

	var _ = __webpack_require__(20);

	var _2 = _interopRequireDefault(_);

	var _Category = __webpack_require__(21);

	var _Category2 = _interopRequireDefault(_Category);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/' },
	    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	    _react2.default.createElement(
	        _reactRouter.Route,
	        { path: 'Category', component: _Category2.default },
	        _react2.default.createElement(_reactRouter.Route, { path: ':userID', component: _Category2.default })
	    ),
	    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _2.default })
	);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HOME = function (_React$Component) {
	    _inherits(HOME, _React$Component);

	    function HOME(props) {
	        _classCallCheck(this, HOME);

	        return _possibleConstructorReturn(this, (HOME.__proto__ || Object.getPrototypeOf(HOME)).call(this, props));
	    }

	    _createClass(HOME, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'render',
	        value: function render() {

	            return _react2.default.createElement(
	                'div',
	                null,
	                'HOME'
	            );
	        }
	    }]);

	    return HOME;
	}(_react2.default.Component);

	exports.default = HOME;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Error = function (_React$Component) {
	    _inherits(Error, _React$Component);

	    function Error() {
	        _classCallCheck(this, Error);

	        return _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).apply(this, arguments));
	    }

	    _createClass(Error, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                'Not Found - React Router'
	            );
	        }
	    }]);

	    return Error;
	}(_react2.default.Component);

	exports.default = Error;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Category = function (_React$Component) {
	    _inherits(Category, _React$Component);

	    function Category() {
	        _classCallCheck(this, Category);

	        return _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).apply(this, arguments));
	    }

	    _createClass(Category, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                'Category'
	            );
	        }
	    }]);

	    return Category;
	}(_react2.default.Component);

	exports.default = Category;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Tools = __webpack_require__(23);

	__webpack_require__(24);

	var express = __webpack_require__(2);
	var router = express.Router();

	// Ajax -- es6-promise
	__webpack_require__(25).polyfill();


	router.get('/', function (req, res) {
	    res.send('obligate apis');
	});

	router.get('/UI/GET/:ui/', function (req, res) {
	    var ui = req.params.ui;
	    var method = "GET";

	    var locationHost = JSON.parse(process.env.GlobalEnv)["restfulUrl"];

	    switch (ui) {
	        case "queryCurrentMonthWord":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                getFetch(locationHost + '/v1/wcs/product/queryCurrentMonthWord', {
	                    "method": method,
	                    "headers": {
	                        UID: UID,
	                        Token: Token
	                    }
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	        case "getOfflineShopInfo":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                // 顶部文字轮播器 海涛 10001
	                getFetch(locationHost + '/v1/offlineShop/getOfflineShopInfo', {
	                    "method": method,
	                    "headers": {
	                        UID: UID,
	                        Token: Token
	                    }
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	    }
	});

	router.post('/', function (req, res) {
	    res.send("json");
	});

	router.post('/UI/POST/:ui/', function (req, res) {
	    var ui = req.params.ui;
	    var key = req.query.key;
	    var body = req.body;
	    var bodyStringify = JSON.stringify(body);
	    var method = "POST";

	    var locationHost = JSON.parse(process.env.GlobalEnv)["restfulUrl"];

	    switch (ui) {
	        case "quickView":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                // QuickView Tim
	                getFetch(locationHost + '/v1/product/productQuickView', {
	                    "method": method,
	                    "headers": { UID: UID, Token: Token },
	                    "body": '{ "queryBody":{"catentryId":' + body.productId + '}}',
	                    "timeout": 3000
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	        case "autoSuggest":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                // 顶部文字轮播器 海涛 10001
	                getFetch(locationHost + '/v1/product/autoSuggest', {
	                    "method": method,
	                    "headers": { UID: UID, Token: Token },
	                    "body": bodyStringify
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	        case "topScroll":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                // 顶部文字轮播器 海涛 10001
	                getFetch(locationHost + '/v1/marketing/imgKeyActivity/getResourcesOnline', {
	                    "method": method,
	                    "headers": { UID: UID, Token: Token },
	                    "body": '{ "queryBody" :{ "adPositionCode": "10001", "channel": 1, "currentDate": "2016-08-28T03:20:08.681Z", "limit": 10, "userGroup": "1" }}'
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	        case "guessYouLikeSlider":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                // 猜你喜欢轮播器 Roger
	                getFetch(locationHost + '/v1/crm/product/queryGuessYouLikeProducts', {
	                    "method": method,
	                    "headers": { UID: UID, Token: Token },
	                    "body": '{"queryBody":{"userId":' + UID + ',"storeId":"10001"}}'
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	        case "guessYouLikeTags":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                // 顶部文字轮播器 海涛 10001
	                getFetch(locationHost + '/v1/marketing/imgKeyActivity/getResourcesOnline', {
	                    "method": method,
	                    "headers": { UID: UID, Token: Token },
	                    "body": '{ "queryBody" :{ "adPositionCode": "10004", "channel": 1, "currentDate": "2016-08-28T03:20:08.681Z", "limit": 10, "userGroup": "1" }}'
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	        case "guessYouLikeMore":
	            getCookie({ "Cookie": req.headers.cookie }, function (UID, Token) {
	                // 猜你喜欢右侧更多 10005 海涛
	                getFetch(locationHost + '/v1/marketing/imgKeyActivity/getResourcesOnline', {
	                    "method": method,
	                    "headers": { UID: UID, Token: Token },
	                    "body": '{ "queryBody" :{ "adPositionCode": "10005", "channel": 1, "currentDate": "2016-08-28T03:20:08.681Z", "limit": 10, "userGroup": "1" }}'
	                }, function (rel) {
	                    res.send(rel);
	                });
	            });
	            break;
	        case "QuickView":
	            break;
	    }
	});

	// Not Match
	router.get('/*', function (req, res) {
	    res.send({
	        "status": 1,
	        "message": "参数错误"
	    });
	});

	router.post('/*', function (req, res) {
	    res.send({
	        "status": 1,
	        "message": "参数错误"
	    });
	});

	module.exports = router;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GetEnv = GetEnv;
	exports.GetSingleCookie = GetSingleCookie;
	exports.GetCookie = GetCookie;
	exports.GetFetch = GetFetch;
	function GetEnv(title) {
	    switch (title) {
	        case "node":
	            return JSON.parse(process.env.GlobalEnv)["localhost"][title];
	            break;
	        case "browser":
	            return window.__INITIAL_ENV__["localhost"][title];
	            break;
	    }
	}

	function GetSingleCookie(cookies) {
	    var arr = document.cookie.match(new RegExp("(^| )" + cookies + "=([^;]*)(;|$)"));
	    if (arr != null) return unescape(arr[2]);
	    return null;
	}

	function GetCookie(params, callback) {
	    // prototype
	    var relCookieID = 'ghost';
	    var relCookieToken = null;

	    if (!params.Cookie) {
	        // NO Cookie Callback Ghost
	        callback(null, null);
	        return;
	    }

	    // split F
	    var cookies = params.Cookie.split('; ');

	    // split S
	    for (var i = 0; i < cookies.length; i++) {
	        var tmpCookie = cookies[i].split('=');

	        // match F => WCS
	        if (tmpCookie[0].match(/^WCS_USERACTIVITY_\d*/)) {
	            relCookieID = tmpCookie[0].replace('WCS_USERACTIVITY_', '');
	            relCookieToken = tmpCookie[1];

	            // if match Callback Return
	            callback(relCookieID, relCookieToken);
	            return;
	        }

	        // match F => SOA
	        if (tmpCookie[0].match(/^SOA_USERACTIVITY_\d*/)) {
	            relCookieID = tmpCookie[0].replace('SOA_USERACTIVITY_', '');
	            relCookieToken = tmpCookie[1];

	            // if match Callback Return
	            callback(relCookieID, relCookieToken);
	            return;
	        }
	    }

	    // NO match Callback Ghost
	    callback(null, null);
	}

	function GetFetch(url, params, callback) {

	    if (!url.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/) == null) {
	        callback({ "status": 1, "message": "error format Url" });
	        return;
	    }

	    if (Object.prototype.toString.call(params) != "[object Object]") {
	        callback({ "status": 1, "message": "error format Patams" });
	        return;
	    }

	    if (params["method"] == null) {
	        callback({ "status": 1, "message": "error Params Method" });
	        return;
	    }

	    if (!params["headers"]) {
	        params["headers"] = {};
	    }

	    params["headers"]["Content-Type"] = "application/json";

	    fetch(url, params).then(function (response) {
	        if (response.status >= 200 && response.status < 300) {
	            return Promise.resolve(response);
	        } else {
	            return Promise.reject(new Error(response.statusText));
	        }
	    }).then(function (json) {
	        return json.json();
	    }).then(function (data) {
	        callback({
	            "status": data.status,
	            "results": data.results
	        });
	    }).catch(function (error) {
	        callback({
	            "status": 1,
	            "results": error
	        });
	        console.log({ url: url, params: params, error: error });
	    });
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("es6-promise");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {
		"production": {},
		"stage": {},
		"qa1": {},
		"qa2": {}
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {
		"vendor": {
			"js": "/soa/bundle/d217fc9d185977df6c65.vendor.js"
		},
		"main": {
			"js": "/soa/bundle/d217fc9d185977df6c65.bundle.js"
		}
	};

/***/ }
/******/ ]);