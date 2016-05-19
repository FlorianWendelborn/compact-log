import expect from 'expect.js';

import {level} from '../build/';
import ConsoleLogger from '../build/console-logger';

describe('console-logger', () => {

	let logger;

	describe('basics', () => {

		it('create instance', () => {
			logger = new ConsoleLogger({
				muted: true
			});
			expect(logger).to.be.an(ConsoleLogger);
		});

	});

	describe('log levels', () => {

		it('emergency', () => {
			expect(
				logger.log(0, level.EMERGENCY, 'something something')
			).to.be(
				'MRGC 0 something something'
			);
		});

		it('alert', () => {
			expect(
				logger.log(0, level.ALERT, 'something something')
			).to.be(
				'ALRT 0 something something'
			);
		});

		it('critical', () => {
			expect(
				logger.log(0, level.CRITICAL, 'something something')
			).to.be(
				'CRTC 0 something something'
			);
		});

		it('error', () => {
			expect(
				logger.log(0, level.ERROR, 'something something')
			).to.be(
				'RROR 0 something something'
			);
		});

		it('warning', () => {
			expect(
				logger.log(0, level.WARNING, 'something something')
			).to.be(
				'WRNG 0 something something'
			);
		});

		it('notice', () => {
			expect(
				logger.log(0, level.NOTICE, 'something something')
			).to.be(
				'NOTC 0 something something'
			);
		});

		it('info', () => {
			expect(
				logger.log(0, level.INFO, 'something something')
			).to.be(
				'INFO 0 something something'
			);
		});

		it('debug', () => {
			expect(
				logger.log(0, level.DEBUG, 'something something')
			).to.be(
				'DBUG 0 something something'
			);
		});

	});

});
