import {constants} from './';
import {EventEmitter} from 'events';

export default class Namespace extends EventEmitter {

	constructor (options) {
		super();

		this.options = Object.assign({
			main: this
		}, options);

		this.id = this.options.id;
		this.main = this.options.main;
	}

	createNamespace (options) {
		return this.main.addNamespace(this.id, options);
	}

	emergency (message) {
		this.main.emit('log', constants.EMERGENCY, message);
	}

	alert (message) {
		this.main.emit('log', constants.ALERT, message);
	}

	critical (message) {
		this.main.emit('log', constants.CRITICAL, message);
	}

	error (message) {
		this.main.emit('log', constants.ERROR, message);
	}

	warning (message) {
		this.main.emit('log', constants.WARNING, message);
	}

	notice (message) {
		this.main.emit('log', constants.NOTICE, message);
	}

	info (message) {
		this.main.emit('log', constants.INFO, message);
	}

	debug (message) {
		this.main.emit('log', constants.DEBUG, message);
	}

	separator (message, level = constants.DEBUG) {
		this.main.emit('separator', level, message);
	}

	getParents () {
		return this.main.lookupParents(this.id);
	}

}
