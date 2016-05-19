'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.constants = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _namespace = require('./namespace');

var _namespace2 = _interopRequireDefault(_namespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Module = function (_Namespace) {
	_inherits(Module, _Namespace);

	function Module(options) {
		_classCallCheck(this, Module);

		options = Object.assign({
			id: 0
		}, options);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Module).call(this, options));

		_this.options = options;

		_this.on('log', console.log);

		_this.index = 0;
		_this.list = [0];
		_this.parentList = [[]];
		return _this;
	}

	_createClass(Module, [{
		key: 'generateID',
		value: function generateID(parent) {
			this.list[++this.index] = parent;
			this.parentList[this.index] = this.findParents(this.index);
			return this.index;
		}
	}, {
		key: 'findParents',
		value: function findParents(index) {
			var finished = false;
			var result = [];
			while (!finished) {
				index = this.list[index];
				result.push(index);
				if (index === 0) finished = true;
			}
			return result;
		}
	}, {
		key: 'lookupParents',
		value: function lookupParents(id) {
			return this.parentList[id];
		}
	}, {
		key: 'addNamespace',
		value: function addNamespace(parent, options) {
			return new _namespace2.default(Object.assign({
				id: this.generateID(parent),
				main: this
			}, options));
		}
	}]);

	return Module;
}(_namespace2.default);

exports.default = Module;
var constants = exports.constants = {
	EMERGENCY: 7,
	ALERT: 6,
	CRITICAL: 5,
	ERROR: 4,
	WARNING: 3,
	NOTICE: 2,
	INFO: 1,
	DEBUG: 0,
	SEPARATOR: 'separator'
};