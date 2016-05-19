import chalk from 'chalk';
import moment from 'moment';

export default class ConsoleLogger {

	constructor (options) {
		options = Object.assign({
			muted: false,
			mode: mode.smart
		}, options);

		this.mode = options.mode;
		this.muted = options.muted;

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
		let string = `${modes[this.mode][level]} ${id} ${messages}`;

		if (!this.muted) console.log(string);
		return string;
	}

	/**
	 *	@param id
	 *	@param level
	 *	@param messages
	 */
	separator (id, level, messages) {
		let string = `${modes[this.mode][level]} ${id} ${messages}`;

		if (!this.muted) console.log(string);
		return string;
	}

}

let modes = [
	['DEBUG','INFO','NOTICE','WARNING','ERROR','CRITICAL','ALERT','EMERGENCY','TIME'],
	['EMER','ALER','CRIT','ERRO','WARN','NOTI','INFO','DEBU','TIME'],
	['DBUG','INFO','NOTC','WRNG','RROR','CRTC','ALRT','MRGC','TIME'],
	['EM','AL','CR','ER','WA','NO','IN','DE','TI'],
	['1','2','3','4','5','6','7','8','T'],
	['M','A','C','R','W','N','I','D','T']
];

export let mode = {
	full: 0,
	short: 1,
	smart: 2,
	tiny: 3,
	numbers: 4,
	single: 5
};
