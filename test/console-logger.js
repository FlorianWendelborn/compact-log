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
				'7 0 something something'
			);
		});

		it('alert', () => {
			expect(
				logger.log(0, level.ALERT, 'something something')
			).to.be(
				'6 0 something something'
			);
		});

		it('critical', () => {
			expect(
				logger.log(0, level.CRITICAL, 'something something')
			).to.be(
				'5 0 something something'
			);
		});

		it('error', () => {
			expect(
				logger.log(0, level.ERROR, 'something something')
			).to.be(
				'4 0 something something'
			);
		});

		it('warning', () => {
			expect(
				logger.log(0, level.WARNING, 'something something')
			).to.be(
				'3 0 something something'
			);
		});

		it('notice', () => {
			expect(
				logger.log(0, level.NOTICE, 'something something')
			).to.be(
				'2 0 something something'
			);
		});

		it('info', () => {
			expect(
				logger.log(0, level.INFO, 'something something')
			).to.be(
				'1 0 something something'
			);
		});

		it('debug', () => {
			expect(
				logger.log(0, level.DEBUG, 'something something')
			).to.be(
				'0 0 something something'
			);
		});

	});

});
