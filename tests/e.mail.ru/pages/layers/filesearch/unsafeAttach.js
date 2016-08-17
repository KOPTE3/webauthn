'use strict';

let Layer = require('../');

/** Модуль для работы с лером прикрепления аттачей */
class UnsafeAttach extends Layer {

	get locator () {
		return '.is-unsafeAttach_in';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = this.locator;

		return this.extend(super.locators, {
			container,
			fields: {
				agree: `${container} [name="agree"]`
			}
		});
	}

	clickAgree () {
		this.page.waitForVisible(this.locators.fields.agree);
		this.page.click(this.locators.fields.agree);
		this.page.waitForVisible(this.locators.apply);
	}

	isAgreed () {
		return this.page.isSelected(this.locators.fields.agree);
	}


}

module.exports = UnsafeAttach;
