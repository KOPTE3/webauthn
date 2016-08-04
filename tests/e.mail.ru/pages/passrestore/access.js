'use strict';

let PassrestoreSelectPage = require('../passrestore/select');
let phoneUtils = require('../../utils/phones');

/** Модуль для работы со страницей на восстановлении доступа (mrim) */
class AccessViewPage extends PassrestoreSelectPage {
	constructor () {
		super();
	}

	wait () {
		return this.page.waitForVisible(this.locators.form);
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.js-view-access-type',
			form = '.js-form-access-type',
			error = '.password-recovery__remind__new-tabs__header_error';

		return this.extend(super.locators, {
			container,
			form,
			tabError: `${form} ${error}`,

			phoneCaptchaImg: '#password-recovery__access_captcha',
			phoneCaptchaField: `${container} .js-captcha`
		});
	}

	getLastRegTokenId () {
		return phoneUtils.getAccessRestoreRegTokenId();
	}
}

module.exports = AccessViewPage;
