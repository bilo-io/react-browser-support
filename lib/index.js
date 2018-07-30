'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.detectBrowser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semverCompare = require('semver-compare');

var _semverCompare2 = _interopRequireDefault(_semverCompare);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('detect-browser'),
    detect = _require.detect;

var detectBrowser = exports.detectBrowser = function detectBrowser() {
    return _extends({}, detect(), {
        message: '',
        supported: true
    });
};

var BrowserSupport = function (_Component) {
    _inherits(BrowserSupport, _Component);

    function BrowserSupport() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BrowserSupport);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BrowserSupport.__proto__ || Object.getPrototypeOf(BrowserSupport)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            browser: {},
            message: '',
            supported: true
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BrowserSupport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var browser = detect();
            this.determineBrowserSupport(browser);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                style = _props.style;


            return this.state && !this.state.supported ? _react2.default.createElement(
                'div',
                {
                    className: !style ? className || 'warning-callout' : '',
                    style: style || {} },
                children ? children : _react2.default.createElement(
                    'div',
                    null,
                    this.state.message
                )
            ) : null;
        }
    }, {
        key: 'determineBrowserSupport',
        value: function determineBrowserSupport(browser) {
            var supported = this.props.supported;

            if (!browser) {
                console.log('could not detect browser');
            } else {
                if (!supported[browser.name]) {
                    this.setAsUnsupported(browser);
                } else {
                    var browserVersion = supported[browser.name];
                    if ((0, _semverCompare2.default)(browser.version, browserVersion) < 0) {
                        this.setAsUnsupported(browser);
                    } else {
                        this.setAsSupported(browser);
                    }
                }
            }
        }
    }, {
        key: 'setAsUnsupported',
        value: function setAsUnsupported(browser) {
            var _this2 = this;

            this.setState({
                browser: browser,
                supported: false,
                message: browser.name + ' version ' + browser.version + ' is not currently supported'
            }, function () {
                return console.log(_this2.state);
            });
        }
    }, {
        key: 'setAsSupported',
        value: function setAsSupported(browser) {
            var _this3 = this;

            this.setState({
                browser: browser,
                supported: true,
                message: browser.name + ' version ' + browser.version + ' is supported'
            }, function () {
                return console.log(_this3.state);
            });
        }
    }]);

    return BrowserSupport;
}(_react.Component);

BrowserSupport.propTypes = {
    supported: _react.PropTypes.object.isRequired
};
exports.default = BrowserSupport;