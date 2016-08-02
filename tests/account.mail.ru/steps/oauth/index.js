'use strict';

let assert = require('assert');

let Steps = require('../../steps');

/** Модуль для работы с шагами внешних сервисов */
class OAuthSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Переопределяем чуть метод, чтобы он отправлял регулярку
	 *
	 * @param {string} url
	 */
	waitForUrl (url) {
		super.waitForUrl(new RegExp(url));
	}

	/**
	 * Вписываем логин
	 *
	 * @param {string} login
	 */
	setLogin (login) {
		this.page.setValue(login, this.page.locators.login);
	}

	/**
	 * Вводим пароль
	 * а до этого дожидаемся появления поля инпут
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		// нужно ждать для некоторых провайдеров например для gmail
		// там пароль появляется не сразу
		this.page.waitElem(this.page.locators.password);
		this.page.setValue(password, this.page.locators.password);
	}

	/**
	 * Клик по кнопке авторизации
	 */
	clickSignInBtn () {
		this.page.clickSignInBtn();
	}

	/**
	 *
	 * Нажатие на кнопку next
	 */
	clickNextBtn () {
		this.outlookPage.clickNextBtn();
	}

	/**
	 * Выполняет все стандартные действия по авторизации
	 * Этот способ например не подойдет гмайлу - там нужно по другому входить
	 *
	 * ожидаем загрузки
	 * вводим сразу логин и пароль
	 * нажимаем кнопку войти
	 *
	 * @param {string} url
	 * @param {string} login
	 * @param {string} password
	 */
	login (url, login, password) {
		// ожидаем урл
		this.waitForUrl(url);

		// ожидаем загрузки страницы
		this.wait();

		// вводим логин пароль
		this.setLogin(login);
		this.setPassword(password);

		this.clickSignInBtn();
	}
}

module.exports = OAuthSteps;
