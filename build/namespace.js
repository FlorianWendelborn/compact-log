'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Namespace = function (_EventEmitter) {
	_inherits(Namespace, _EventEmitter);

	function Namespace(options) {
		_classCallCheck(this, Namespace);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Namespace).call(this));

		_this.options = Object.assign({
			main: _this
		}, options);

		_this.id = _this.options.id;
		_this.main = _this.options.main;
		return _this;
	}

	_createClass(Namespace, [{
		key: 'createNamespace',
		value: function createNamespace(options) {
			return this.main.addNamespace(this.id, options);
		}
	}, {
		key: 'emergency',
		value: function emergency() {
			for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
				messages[_key] = arguments[_key];
			}

			this.main.emit('log', this.id, level.EMERGENCY, messages);
		}
	}, {
		key: 'alert',
		value: function alert() {
			for (var _len2 = arguments.length, messages = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				messages[_key2] = arguments[_key2];
			}

			this.main.emit('log', this.id, level.ALERT, messages);
		}
	}, {
		key: 'critical',
		value: function critical() {
			for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				messages[_key3] = arguments[_key3];
			}

			this.main.emit('log', this.id, level.CRITICAL, messages);
		}
	}, {
		key: 'error',
		value: function error() {
			for (var _len4 = arguments.length, messages = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				messages[_key4] = arguments[_key4];
			}

			this.main.emit('log', this.id, level.ERROR, messages);
		}
	}, {
		key: 'warning',
		value: function warning() {
			for (var _len5 = arguments.length, messages = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				messages[_key5] = arguments[_key5];
			}

			this.main.emit('log', this.id, level.WARNING, messages);
		}
	}, {
		key: 'notice',
		value: function notice() {
			for (var _len6 = arguments.length, messages = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				messages[_key6] = arguments[_key6];
			}

			this.main.emit('log', this.id, level.NOTICE, messages);
		}
	}, {
		key: 'info',
		value: function info() {
			for (var _len7 = arguments.length, messages = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				messages[_key7] = arguments[_key7];
			}

			this.main.emit('log', this.id, level.INFO, messages);
		}
	}, {
		key: 'debug',
		value: function debug() {
			for (var _len8 = arguments.length, messages = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
				messages[_key8] = arguments[_key8];
			}

			this.main.emit('log', this.id, level.DEBUG, messages);
		}
	}, {
		key: 'separator',
		value: function separator() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? level.DEBUG : arguments[0];

			for (var _len9 = arguments.length, messages = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
				messages[_key9 - 1] = arguments[_key9];
			}

			this.main.emit('separator', this.id, level, messages);
		}
	}, {
		key: 'getParents',
		value: function getParents() {
			return this.main.lookupParents(this.id);
		}
	}]);

	return Namespace;
}(_events.EventEmitter);

exports.default = Namespace;