import Namespace from './namespace';

import ConsoleLogger from './console-logger';

export default class Module extends Namespace {

	constructor (options) {
		options = Object.assign({
			id: 0
		}, options);

		super(options);

		this.options = options;

		this.on('log', console.log);

		this.index = 0;
		this.list = [0];
		this.parentList = [[]];
	}

	generateID (parent) {
		this.list[++this.index] = parent;
		this.parentList[this.index] = this.findParents(this.index);
		return this.index;
	}

	findParents (index) {
		let finished = false;
		let result = [];
		while (!finished) {
			index = this.list[index];
			result.push(index);
			if (index === 0) finished = true;
		}
		return result;
	}

	lookupParents (id) {
		return this.parentList[id];
	}

	addNamespace (parent, options) {
		return new Namespace(Object.assign({
			id: this.generateID(parent),
			main: this
		}, options));
	}

}

export let level = {
	EMERGENCY: 7,
	ALERT: 6,
	CRITICAL: 5,
	ERROR: 4,
	WARNING: 3,
	NOTICE: 2,
	INFO: 1,
	DEBUG: 0
};

export let logger = {
	Console: ConsoleLogger
};
