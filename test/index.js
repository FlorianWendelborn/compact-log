import {EventEmitter} from 'events';

import expect from 'expect.js';

import CompactLog from '../';
import Namespace from '../build/namespace';

describe('basics', () => {

	it('create instance', () => {
		let instance = new CompactLog();
		expect(instance).to.be.an(CompactLog);
		expect(instance).to.be.an(Namespace);
		expect(instance).to.be.an(EventEmitter);
	});

});

let log = new CompactLog();
let ns;

describe('namespaces', () => {

	it('create instance', () => {
		ns = log.createNamespace();
		expect(ns).to.be.an(Namespace);
		expect(ns.id).to.be(1);
	});

	it('create multiple instances', () => {
		for (let i = 0; i < 10; i++) {
			let ns = log.createNamespace();
			expect(ns).to.be.an(Namespace);
			expect(ns.id).to.be(i+2);
		}
	});

	it('gets parents', () => {
		expect(log.getParents()).to.eql([]);
		expect(ns.getParents()).to.eql([0]);
	});

	it('gets parents (multiple)', () => {
		let cLog = new CompactLog();
		let subNS = cLog.createNamespace();
		let sub2NS1 = subNS.createNamespace();
		let sub2NS2 = subNS.createNamespace();
		let sub2NS3 = subNS.createNamespace();
		let sub3NS = sub2NS2.createNamespace();
		let sub4NS = sub3NS.createNamespace();

		expect(cLog.getParents()).to.eql([]);
		expect(subNS.getParents()).to.eql([0]);
		expect(sub2NS1.getParents()).to.eql([1, 0]);
		expect(sub2NS2.getParents()).to.eql([1, 0]);
		expect(sub2NS3.getParents()).to.eql([1, 0]);
		expect(sub3NS.getParents()).to.eql([3, 1, 0]);
		expect(sub4NS.getParents()).to.eql([5, 3, 1, 0]);
	});

});
