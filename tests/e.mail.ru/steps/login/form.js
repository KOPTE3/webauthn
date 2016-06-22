'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let login = require('../../pages/login');

class Login extends Steps {
	constructor () {
		super();
	}

	/**
	 * Выбрать домен в списке
	 *
	 * @param {string} provider
	 */
	selectDomain (provider) {
		let actual = login.getSelectedDomain(provider);

		assert(actual.value, `Не удалось найти элемент с заданным провайдером: ${provider}`);
	}

	/**
	 * Получить значение поля логина
	 *
	 * @param {string} provider
	 */
	getLoginValue (provider) {
		if (provider === 'other') {
			provider = 'mail.ru'
		}

		assert.equal(login.getLoginValue, provider,
			`Не удалось найти значение для заданного провайдера ${provider}`);
	}

	/**
	 * Сверить активный домен
	 *
	 * @param {string} provider
	 */
	getActiveDomain (provider) {
		assert.equal(login.activeDomain, provider,
			`Передан неверный провайдер ${provider}`);
	}

	/**
	 * Проверить текст ссылки "Узнать больше"
	 */
	checkHelpText () {
		assert.equal(login.getHelpText, 'Узнать больше',
			`Проверка ссылки "Узнать больше"`);
	}

	/**
	 * Проверить текст ссылки "Узнать больше"
	 */
	checkHelpLink () {
		assert.equal(login.getHelpLink, 'http://mailblog.mail.ru/vvp-ios-and/',
			`Проверка ссылки "Узнать больше"`);
	}

	/**
	 * Проверить текст контрола "Запомнить почту"
	 */
	checkRememberText () {
		assert.equal(login.getRememberText, 'запомнить почту',
			`Проверка текста контрола "Запомнить почту"`);
	}

	/**
	 * Проверить состояние контрола "Запомнить почту"
	 */
	checkRememberState () {
		assert.equal(login.getRememberState, '1',
			`Проверка состояние контрола "Запомнить почту"`);
	}

	/**
	 * Выбрать домен
	 *
	 * @param {string} provider
	 */
	clickByDomain (provider) {
		let actual = login.clickByDomain(provider);

		assert(actual.value, `Не удалось найти элемент для провайдера ${provider}`);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 */
	send (data) {
		let actual = login.send(data);

		assert(actual.value, `Не удалось отправить форму c переданными данными ${data}`);
	}

	/**
	 * Получить заголовок формы
	 *
	 * @returns {string}
	 */
	checkTitle () {
		assert.equal(login.title, 'Вход в почту',
			'Не удалось проверить заголовок формы');
	}

	/**
	 * Получить описание формы
	 *
	 * @returns {string}
	 */
	checkDescription () {
		assert.equal(login.description, 'Вы можете войти в почту с помощью аккаунта любого почтового сервиса и легко переключаться между ними, не выходя из почты. Узнать больше', 'Не удалось проверить описание формы');
	}

	/**
	 * Получить ссылку на восстановление пароля
	 *
	 * @property
	 * @returns {string}
	 */
	get checkPassRemindLink () {
		assert.equal(this.getPassRemindLink, 'https://e.mail.ru/cgi-bin/passremind',
			'Некорректная ссылка на восстановление пароля');
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @param {string} text
	 */
	getError (expected) {
		assert.equal(login.getError, expected, `Сообщение ошибки`);
	}

	/**
	 * Проверить видимость списка доменов
	 *
	 * @param {string} provider
	 */
	isSelectVisible () {
		assert(!login.isSelectVisible, `Видимость списка доменов под вопросом`);
	}
}

module.exports = new Login();
