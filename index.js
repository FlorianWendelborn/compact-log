var fs = require('fs');
var path = require('path');
var util = require('util');

var color = require('cli-color');
var mkdirp = require('mkdirp');
var moment = require('moment');

var logLevel = {
	0: {
		color: false,
		name: 'none'
	},
	1: {
		color: color.bgRed,
		name: 'emergency'
	},
	2: {
		color: color.redBright,
		name: 'alert'
	},
	3: {
		color: color.red,
		name: 'critical'
	},
	4: {
		color: color.yellow,
		name: 'error'
	},
	5: {
		color: color.yellowBright,
		name: 'warning'
	},
	6: {
		color: color.blueBright,
		name: 'notice'
	},
	7: {
		color: color.white,
		name: 'info'
	},
	8: {
		color: color.bgWhite.black,
		name: 'debug'
	},
	NONE: 0, NO: 0,
	EMERGENCY: 1, EMER: 1, MRGC: 1, EM: 1,
	ALERT: 2, ALER: 2, ALRT: 2, AL: 2,
	CRITICAL: 3, CRIT: 3, CRTC: 3, CR: 3,
	ERROR: 4, ERRO: 4, RROR: 4, ER: 4,
	WARNING: 5, WARN: 5, WRNG: 5, WA: 5,
	NOTICE: 6, NOTI: 6, NOTC: 6, NO: 6,
	INFO: 7, IN: 7,
	DEBUG: 8, DEBU: 8, DBUG: 8, DE: 8,
	time: {
		color: color.green
	}
};

var compressedTime = {
	0: {
		short: 'YYYY-MM-DD HH:mm:ss',
		long: false,
		startOf: false,
		message: false
	},
	1: {
		short: 'MM-DD HH:mm:ss',
		long: 'YYYY',
		startOf: 'year',
		message: 'current year'
	},
	2: {
		short: 'DD HH:mm:ss',
		long: 'YYYY-MM',
		startOf: 'month',
		message: 'current month'
	},
	3: {
		short: 'HH:mm:ss',
		long: 'YYYY-MM-DD',
		startOf: 'day',
		message: 'current day'
	},
	4: {
		short: 'mm:ss',
		long: 'YYYY-MM-DD HH',
		startOf: 'hour',
		message: 'current hour'
	},
	5: {
		short: 'ss',
		long: 'YYYY-MM-DD HH:mm',
		startOf: 'minute',
		message: 'current minute'
	},
	6: {
		short: false,
		long: 'YYYY-MM-DD HH:mm:ss',
		startOf: 'second',
		message: 'current second'
	},
	NONE: 0,
	YEAR: 1,
	MONTH: 2,
	DAY: 3,
	HOUR: 4,
	MINUTE: 5,
	SECOND: 6
};

var levelMode = {
	0: ['[EMER]','[ALER]','[CRIT]','[ERRO]','[WARN]','[NOTI]','[INFO]','[DEBU]','[TIME]'],
	1: ['[MRGC]','[ALRT]','[CRTC]','[RROR]','[WRNG]','[NOTC]','[INFO]','[DBUG]','[TIME]'],
	2: ['[EMERGENCY]','[ALERT]','[CRITICAL]','[ERROR]','[WARNING]','[NOTICE]','[INFO]','[DEBUG]','[TIME]'],
	3: ['[EM]','[AL]','[CR]','[ER]','[WA]','[NO]','[IN]','[DE]','[TI]'],
	4: ['EMER','ALER','CRIT','ERRO','WARN','NOTI','INFO','DEBU','TIME'],
	5: ['MRGC','ALRT','CRTC','RROR','WRNG','NOTC','INFO','DBUG','TIME'],
	6: ['EMERGENCY','ALERT','CRITICAL','ERROR','WARNING','NOTICE','INFO','DEBUG','TIME'],
	7: ['EM','AL','CR','ER','WA','NO','IN','DE','TI'],
	8: ['1','2','3','4','5','6','7','8','T'],
	9: ['M','A','C','R','W','N','I','D','T'],
	SHORT: 0,
	SMART: 1,
	FULL: 2,
	TINY: 3,
	SHORTNOBRACKETS: 4,
	SMARTNOBRACKETS: 5,
	FULLNOBRACKETS: 6,
	TINYNOBRACKETS: 7,
	NUMBERS: 8,
	SINGLE: 9
};

function Module (options) {
	// set logLevel
	this.logLevel = 8;

	if (options.logLevel) {
		if (typeof options.logLevel == 'string') {
			this.logLevel = logLevel[options.logLevel.toUpperCase()];
		} else {
			this.logLevel = options.logLevel;
		}
	}

	// set consoleLogLevel
	this.consoleLogLevel = this.logLevel;

	if (options.consoleLogLevel) {
		if (typeof options.consoleLogLevel == 'string') {
			this.consoleLogLevel = logLevel[options.consoleLogLevel.toUpperCase()];
		} else {
			this.consoleLogLevel = options.consoleLogLevel;
		}
	}

	// set fileLogLevel
	this.fileLogLevel = this.logLevel;

	if (options.fileLogLevel) {
		if (typeof options.fileLogLevel == 'string') {
			this.fileLogLevel = logLevel[options.fileLogLevel.toUpperCase()];
		} else {
			this.fileLogLevel = options.fileLogLevel;
		}
	}

	// set separatorLogLevel
	this.separatorLogLevel = this.logLevel;

	if (options.separatorLogLevel) {
		if (typeof options.separatorLogLevel == 'string') {
			this.separatorLogLevel = logLevel[options.separatorLogLevel.toUpperCase()];
		} else {
			this.separatorLogLevel = options.separatorLogLevel;
		}
	}

	// set compressedTime
	this.compressedTime = 3;

	if (options.compressedTime) {
		if (typeof options.compressedTime == 'string') {
			this.compressedTime = compressedTime[options.compressedTime.toUpperCase()];
		} else {
			this.compressedTime = options.compressedTime;
		}
	}

	// set levelMode
	this.levelMode = 4;

	if (options.levelMode) {
		if (typeof options.levelMode == 'string') {
			this.levelMode = levelMode[options.levelMode.toUpperCase()];
		} else {
			this.levelMode = options.levelMode;
		}
	}

	// other options
	this.path = options.path || false;
	this.compressedTimeAsSeparator = options.compressedTimeAsSeparator || true;
	this.prettyJSON = options.prettyJSON || true;

	// check log path
	if (this.path) {
		if (!fs.existsSync(this.path)) {
			mkdirp.sync(this.path);
		}
	}

	// create logFile
	if (this.path && this.fileLogLevel) {
		this.logFile = fs.createWriteStream(path.join(this.path, moment().format('YYYY-MM-DD.HH-mm-ss') + '.log'));
	}
};

Module.prototype.emergency = Module.prototype.emer = Module.prototype.mrgc = Module.prototype.em = function () {
	this.applyLogLevel(1,arguments);
};

Module.prototype.alert = Module.prototype.aler = Module.prototype.alrt = Module.prototype.al = function () {
	this.applyLogLevel(2,arguments);
};

Module.prototype.critical = Module.prototype.crit = Module.prototype.crtc = Module.prototype.cr = function () {
	this.applyLogLevel(3,arguments);
};

Module.prototype.error = Module.prototype.erro = Module.prototype.rror = Module.prototype.er = function () {
	this.applyLogLevel(4,arguments);
};

Module.prototype.warning = Module.prototype.warn = Module.prototype.wrng = Module.prototype.wa = function () {
	this.applyLogLevel(5,arguments);
};

Module.prototype.notice = Module.prototype.noti = Module.prototype.notc = Module.prototype.no = function () {
	this.applyLogLevel(6, arguments);
};

Module.prototype.info = Module.prototype.in = function () {
	this.applyLogLevel(7, arguments);
};

Module.prototype.debug = Module.prototype.debu = Module.prototype.dbug = Module.prototype.de = function () {
	this.applyLogLevel(8, arguments);
};

Module.prototype.separator = Module.prototype.sepa = Module.prototype.se = function(text, sll) {
	// apply separatorLogLevel
	l = this.separatorLogLevel;
	if (sll) {
		if (typeof sll == 'string') {
			l = logLevel[sll.toUpperCase()];
		} else {
			l = sll;
		}
	}
	
	// log the separator
	if (this.consoleLogLevel >= l) {
		var width = process.stdout.columns;
		var time = this.time();
		if (text) {
			var half = (width-text.length-this.level(l-1).length-time.length+1)/2;
			console.log(
				logLevel[l].color(this.level(l-1)) + ' '
				+ time
				+ logLevel[l].color((Array(Math.floor(half)).join('-')
				+ text
				+ Array(Math.ceil(half)).join('-')))
			);
		} else {
			console.log(
				logLevel[l].color(this.level(l-1)) + ' '
				+ time
				+ logLevel[l].color(Array(width-this.level(l-1).length-time.length).join('-'))
			);
		}
	}
};

// namespaces
Module.prototype.createNamespace = function(options) {
	var ns = new this.Namespace(options);
	ns.logLevel = this.logLevel;
	ns.consoleLogLevel = this.consoleLogLevel;
	ns.separatorLogLevel = this.separatorLogLevel;
	ns.fileLogLevel = this.fileLogLevel;
	ns.compressedTime = this.compressedTime;
	ns.levelMode = this.levelMode;
	ns.name = options.name;
	ns.parent = this;
	return ns;
};

Module.prototype.Namespace = function () {};

Module.prototype.Namespace.prototype.time = function() {
	// return short time
	if (this.compressedTime) this.parent.updateCompressedTime();
	if (!compressedTime[this.compressedTime].short) return '';
	return moment().format(compressedTime[this.compressedTime].short + ' ');
};

Module.prototype.Namespace.prototype.level = function (level) {
	// return log level string
	return levelMode[this.levelMode][level];
};

Module.prototype.Namespace.prototype.emergency = Module.prototype.Namespace.prototype.emer = Module.prototype.Namespace.prototype.mrgc = Module.prototype.Namespace.prototype.em = function () {
	this.applyLogLevel(1, arguments);
};

Module.prototype.Namespace.prototype.alert = Module.prototype.Namespace.prototype.aler = Module.prototype.Namespace.prototype.alrt = Module.prototype.Namespace.prototype.al = function () {
	this.applyLogLevel(2, arguments);
};

Module.prototype.Namespace.prototype.critical = Module.prototype.Namespace.prototype.crit = Module.prototype.Namespace.prototype.crtc = Module.prototype.Namespace.prototype.cr = function () {
	this.applyLogLevel(3, arguments);
};

Module.prototype.Namespace.prototype.error = Module.prototype.Namespace.prototype.erro = Module.prototype.Namespace.prototype.rror = Module.prototype.Namespace.prototype.er = function () {
	this.applyLogLevel(4, arguments);
};

Module.prototype.Namespace.prototype.warning = Module.prototype.Namespace.prototype.warn = Module.prototype.Namespace.prototype.wrng = Module.prototype.Namespace.prototype.wa = function () {
	this.applyLogLevel(5, arguments);
};

Module.prototype.Namespace.prototype.notice = Module.prototype.Namespace.prototype.noti = Module.prototype.Namespace.prototype.notc = Module.prototype.Namespace.prototype.no = function () {
	this.applyLogLevel(6, arguments);
};

Module.prototype.Namespace.prototype.info = Module.prototype.Namespace.prototype.in = function () {
	this.applyLogLevel(7, arguments);
};

Module.prototype.Namespace.prototype.debug = Module.prototype.Namespace.prototype.dbug = Module.prototype.Namespace.prototype.de = function () {
	this.applyLogLevel(8, arguments);
};

Module.prototype.Namespace.prototype.separator = Module.prototype.Namespace.prototype.sepa = Module.prototype.Namespace.prototype.se = function (text, sll) {
	// apply separatorLogLevel
	l = this.separatorLogLevel;
	if (sll) {
		if (typeof sll == 'string') {
			l = logLevel[sll.toUpperCase()];
		} else {
			l = sll;
		}
	}
	
	// log the separator
	if (this.consoleLogLevel >= l) {
		var width = process.stdout.columns;
		var time = this.time();
		if (text) {
			var half = (width-text.length-this.name.length-this.level(l-1).length-time.length)/2;
			console.log(
				logLevel[l].color(this.level(l-1)) + ' '
				+ time
				+ color.bgWhite.black(this.name) + ' '
				+ logLevel[l].color((Array(Math.floor(half)).join('-')
				+ text
				+ Array(Math.ceil(half)).join('-')))
			);
		} else {
			console.log(
				logLevel[l].color(this.level(l-1)) + ' '
				+ time
				+ color.bgWhite.black(this.name) + ' '
				+ logLevel[l].color(Array(width-this.level(l-1).length-this.name.length-time.length-1).join('-'))
			);
		}
	}
};

Module.prototype.Namespace.prototype.applyLogLevel = function (l, args) {
	if (this.consoleLogLevel > l-1 || (this.logFile && this.fileLogLevel > l-1)) {
		var message = util.format.apply(null, args);
		if (this.consoleLogLevel > l-1) {
			console.log(
				logLevel[l].color(this.level(l-1)) + ' '
				+ this.time()
				+ color.bgWhite.black(this.name) + ' '
				+ message
			);
		}
		if (this.fileLogLevel > l-1 && this.parent.logFile) {
			this.parent.logger(l, args, this);
		}
	}
};

// internal

Module.prototype.updateCompressedTime = function() {
	// log compressed time if needed
	var currentTime = moment().startOf(compressedTime[this.compressedTime].startOf);
	if (!this.lastLog || currentTime.isAfter(this.lastLog)) {
		this.lastLog = currentTime;

		if (this.compressedTimeAsSeparator) { // time as separator
			var text = compressedTime[this.compressedTime].message + ': '
				+ moment().format(compressedTime[this.compressedTime].long);
			var width = process.stdout.columns;
			var half = (width-this.level(8).length-text.length+1)/2;
			var message = this.level(8) + ' '
				+ Array(Math.floor(half)).join('-')
				+ text
				+ Array(Math.ceil(half)).join('-');
		} else { // default
			var message = levelMode[this.levelMode][8] + ' '
				+ compressedTime[this.compressedTime].message + ': '
				+ moment().format(compressedTime[this.compressedTime].long)
		}

		// log it
		console.log(logLevel.time.color(message));
	}
};

Module.prototype.applyLogLevel = function(l, args) {
	if (this.consoleLogLevel > l-1 || (this.logFile && this.fileLogLevel > l-1)) {
		var message = util.format.apply(null, args);
		if (this.consoleLogLevel > l-1) {
			console.log(
				logLevel[l].color(this.level(l-1)) + ' '
				+ this.time()
				+ message
			);
		}
		if (this.fileLogLevel > l-1 && this.logFile) {
			this.logger(l, args);
		}
	}
};

Module.prototype.logger = function (l, args, namespace) {
	if (this.logFile) {
		var dump = [];
		var realArgs = [];
		for (var i = 0; i < args.length; i++) {
			if (typeof args[i] == 'object') {
				dump.push(args[i]);
				if (typeof args[0] == 'string' && args[0].search('%j') != -1) realArgs.push(args[i]);
			} else {
				realArgs.push(args[i]);
			}
		}

		var time = moment();

		var o = {
			time: {}
		};
		o.time.human = time.format('YYYY-MM-DD HH:mm:ss Z');
		o.time.stamp = time.valueOf();
		o.level = logLevel[l].name;

		if (namespace) o.namespace = namespace.name;
		o.message = util.format.apply(null, realArgs);
		if (dump.length) o.dump = dump;

		var spacer = null;
		if (this.prettyJSON) spacer = '\t';

		this.logFile.write(
			JSON.stringify(o, null, spacer) +
			'\n'
		);
	}
};

Module.prototype.time = function() {
	// return short time
	if (this.compressedTime) this.updateCompressedTime();
	if (!compressedTime[this.compressedTime].short) return '';
	return moment().format(compressedTime[this.compressedTime].short + ' ');
};

Module.prototype.level = function (level) {
	// return log level string
	return levelMode[this.levelMode][level];
};

module.exports = Module;
