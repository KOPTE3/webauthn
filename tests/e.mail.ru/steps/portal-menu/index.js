'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let PortalMenuPage = require('../../pages/portal-menu');

/** Модуль для работы с шагами синей шапки */
class PortalMenuSteps extends Steps {
	constructor () {
		super();

		this.page = new PortalMenuPage();
	}

	/**
	 * Нажать на кнопку
	 *
	 * @param {string} name - (inbox|addressbook|files|themes|settings|blog|help|videohelp|
	 * mobile|biz|agent|more|calendar|cloud)
	 */
	clickButton (name) {
		this.page.clickButton(name);
	}

	/**
	 * Проверить, что меню "Ещё" открыто
	 */
	isMoreVisible () {
		let actual = this.page.isMoreVisible();

		assert(actual, 'Меню "Ещё" не видно');
	}

	/**
	 * Проверить, что все элементы меню "Ещё" находятся поверх всего остального.
	 */
	isMoreItemsAboveAll () {
		this.page.moreItems.forEach((name) => {
			['top', 'center', 'bottom'].forEach((position) => {
				// Наводим на края и на середину элемента и проверяем, что появился ховер
				this.page.selectMoreItem(name, position);

				let actual = this.page.isMoreItemSelected(name);

				assert(actual, `Элемент ${name} чем-то перекрыт`);
			});
		});
	}
}

module.exports = PortalMenuSteps;
