import chalk from 'chalk';
import moment from 'moment';

export default class ConsoleLogger {

	constructor (options) {
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
	log (id, level, messages) {
		let string = `${level} ${id} ${messages}`;

		if (!this.options.muted) console.log(string);
		return string;
	}

	/**
	 *	@param id
	 *	@param level
	 *	@param messages
	 */
	separator (id, level, messages) {
		let string = `${level} ${id} ${messages}`;

		if (!this.options.muted) console.log(string);
		return string;
	}

}

let modes = {
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
