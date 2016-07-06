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
		let toolbar = '.ui-toolbar-active';

		return this.extend(super.locators, {
			container: toolbar,
			draft    : `${toolbar} [data-name="saveDraft"]`,
			cancel   : `${toolbar} [data-name="cancel"]`,
			template : `${toolbar} [data-name="saveTemplate"]`,
			send     : `${toolbar} [data-name="send"]`
		});
	}

	/**
	 * Сохранить черновик
	 */
	draft () {
		this.page.click(this.locators.draft);
	}

	/**
	 * Написать письмо
	 */
	send () {
		this.page.click(this.locators.send);
	}

	/**
	 * Отменить письмо
	 * */
	cancel () {
		this.page.click(this.locators.cancel);

		try {
			// алерт может быть не показан в некоторых случаях
			this.page.alertAccept();
		} catch (error) {}
	}

}

module.exports = ComposeControls;
