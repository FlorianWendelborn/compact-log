import {level} from './';
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

	emergency (...messages) {
		this.main.emit('log', this.id, level.EMERGENCY, messages);
	}

	alert (...messages) {
		this.main.emit('log', this.id, level.ALERT, messages);
	}

	critical (...messages) {
		this.main.emit('log', this.id, level.CRITICAL, messages);
	}

	error (...messages) {
		this.main.emit('log', this.id, level.ERROR, messages);
	}

	warning (...messages) {
		this.main.emit('log', this.id, level.WARNING, messages);
	}

	notice (...messages) {
		this.main.emit('log', this.id, level.NOTICE, messages);
	}

	info (...messages) {
		this.main.emit('log', this.id, level.INFO, messages);
	}

	debug (...messages) {
		this.main.emit('log', this.id, level.DEBUG, messages);
	}

	separator (level = level.DEBUG, ...messages) {
		this.main.emit('separator', this.id, level, messages);
	}

	getParents () {
		return this.main.lookupParents(this.id);
	}

}
