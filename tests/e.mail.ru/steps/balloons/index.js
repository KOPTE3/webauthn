'use strict';

let assert = require('assert');

let BalloonsPage = require('../../pages/balloons');
let Steps = require('..');

let page = new BalloonsPage();

class BalloonsSteps extends Steps {
	static get page () {
		return page;
	}

	static isBalloonVisible (id) {
		let actual = this.page.isBalloonVisible(id);

		assert(actual, `Бабл ${id} должен быть видим`);
	}

	static isBalloonNotVisible (id) {
		let actual = this.page.isBalloonVisible(id);

		assert(!actual, `Бабл ${id} должен быть скрыт`);
	}
}

module.exports = BalloonsSteps;
