'use strict';

let assert = require('assert');

let ComposeAttachesPage = require('../compose/attaches');

/** Модуль для работы с прикреплением файлов написания письма */
class ComposeAttaches extends ComposeAttachesPage {
	constructor () {
		super();
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.compose-attachments';
		let attachments = '//*[contains(@class, "js-content")]';

		return this.extend(super.locators, {
			container,
			attachField: `${container} .compose-attachments__input`,
			cloud: `${container} [data-source="cloud"]`,
			mail: `${container} [data-source="mail"]`,
			slider: `${container} .compose-attachments__content`,
			remove: `${container} .ico_compose_remove`,
			progress: `${container} .compose-attachment__progress-mask`,

			attachments,
			attachmentByName: filename => `${attachments}[.//*[text()="${filename}"]]`
		});
	}

}

module.exports = ComposeAttaches;
