'use strict';

let Page = require('..');

class BalloonsPage extends Page {
	get locators () {
		return this.extend(super.locators, {
			'close': '.balloon__icon',

			/* eslint-disable max-len */
			'balloon-cleaner-archive': './/div[contains(@class, "balloon")][.//div[contains(., "Ваши рассылки и уведомления из")]]'

			/* eslint-enable */
		});
	}

	getBalloonElement (id) {
		return this.page.element(this.locators[id]);
	}

	isBalloonVisible (id) {
		let element = this.getBalloonElement(id);

		return element.value && this.page.elementIdDisplayed(element.value.ELEMENT).value;
	}

	clickBalloon (id) {
		let element = this.getBalloonElement(id);

		return this.page.elementIdClick(element.value.ELEMENT).value;
	}

	clickBalloonClose (id) {
		let element = this.getBalloonElement(id).element(this.locators.close);

		return this.page.elementIdClick(element.value.ELEMENT).value;
	}

	clickOutside () {
		this.page.click(this.locators.container);
	}
}

module.exports = BalloonsPage;
