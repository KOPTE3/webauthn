'use strict';

let ComposePage = require('../compose');

/** Модуль для работы с контролами страницы написания письма */
class ComposeControls extends ComposePage {
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
		let toolbar = '[data-mnemo="toolbar-compose"]';

		return this.extend(super.locators, {
			container: toolbar,
			saveStatus: `${toolbar} [data-mnemo="saveStatus"]`,
			draft    : `${toolbar} [data-name="saveDraft"]`,
			cancel   : `${toolbar} [data-name="cancel"]`,
			template : `${toolbar} [data-name="saveTemplate"]`,
			send     : `${toolbar} [data-name="send"]`,
			templates: `${toolbar} [data-group="templates"]`,
			templateItem: `${toolbar} .b-dropdown__group .b-dropdown__list__item`
		});
	}

	/**
	 * Сохранить черновик
	 */
	draft () {
		this.clickAll(this.locators.draft);
		this.page.waitForVisible(this.locators.saveStatus);
	}

	/**
	 * Написать письмо
	 */
	send () {
		this.clickAll(this.locators.send);
	}

	/**
	 * Отменить письмо
	 * */
	cancel () {
		this.clickAll(this.locators.cancel);

		try {
			// алерт может быть не показан в некоторых случаях
			this.page.alertAccept();
		} catch (error) {}
	}

	applyTemplate () {
		this.page.click(this.locators.templates);

		this.page.click(this.locators.templateItem);
	}

}

module.exports = ComposeControls;
