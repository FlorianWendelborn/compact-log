'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsoleLogger = function () {
	function ConsoleLogger(options) {
		_classCallCheck(this, ConsoleLogger);

		this.options = Object.assign({
			muted: false
		}, options);

		if (options.instance) {
			options.instance.on('log', this.log);
			options.instance.on('separator', this.separator);
		}
	}

	/**
  *	@param id
  *	@param level
  *	@param messages
  */


	_createClass(ConsoleLogger, [{
		key: 'log',
		value: function log(id, level, messages) {
			var string = level + ' ' + id + ' ' + messages;

			if (!this.options.muted) console.log(string);
			return string;
		}

		/**
   *	@param id
   *	@param level
   *	@param messages
   */

	}, {
		key: 'separator',
		value: function separator(id, level, messages) {
			var string = level + ' ' + id + ' ' + messages;

			if (!this.options.muted) console.log(string);
			return string;
		}
	}]);

	return ConsoleLogger;
}();

exports.default = ConsoleLogger;


var modes = {
	short: {},
	smart: {},
	full: {},
	tiny: {},
	shortNoBrackets: {},
	smartNoBrackets: {},
	fullNoBrackets: {},
	numbers: {},
	single: {}
};