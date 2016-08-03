'use strict';

let Pages = require('../../pages');

/** Модуль для работы с представлениями внешних сервисов */
class OAuthPage extends Pages {
	constructor () {
		super();
	}

	/**
	 * Устанавливаем значение в элемент
	 * работает с тэгами input
	 *
	 * @param {string} value
	 * @param {string} locator
	 */
	setValue (value, locator) {
		this.page.setValue(locator, value);
	}

	/**
	 * Ждем пока элемент появится
	 * например у гугла пароль появляется не сразу поэтому это нужно
	 *
	 * @param {string} locator
	 */
	waitElem (locator) {
		this.page.waitForVisible(locator);
	}

	/**
	 * Клик по кнопке "Войти"
	 *
	 * @returns {*}
	 */
	clickSignInBtn () {
		return this.page.click(this.locators.signIn);
	}

	/**
	 * Клик по кнопке Продолжить
	 *
	 * @returns {*}
	 */
	clickNextBtn () {
		return this.page.click(this.locators.nextBtn);
	}
}

module.exports = OAuthPage;
