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
		value: function emergency(message) {
			this.main.emit('log', _.constants.EMERGENCY, message);
		}
	}, {
		key: 'alert',
		value: function alert(message) {
			this.main.emit('log', _.constants.ALERT, message);
		}
	}, {
		key: 'critical',
		value: function critical(message) {
			this.main.emit('log', _.constants.CRITICAL, message);
		}
	}, {
		key: 'error',
		value: function error(message) {
			this.main.emit('log', _.constants.ERROR, message);
		}
	}, {
		key: 'warning',
		value: function warning(message) {
			this.main.emit('log', _.constants.WARNING, message);
		}
	}, {
		key: 'notice',
		value: function notice(message) {
			this.main.emit('log', _.constants.NOTICE, message);
		}
	}, {
		key: 'info',
		value: function info(message) {
			this.main.emit('log', _.constants.INFO, message);
		}
	}, {
		key: 'debug',
		value: function debug(message) {
			this.main.emit('log', _.constants.DEBUG, message);
		}
	}, {
		key: 'separator',
		value: function separator(message) {
			var level = arguments.length <= 1 || arguments[1] === undefined ? _.constants.DEBUG : arguments[1];

			this.main.emit('separator', level, message);
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