'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let LoginForm = require('../../pages/login/form');

/** Модуль для работы с шагами формы страницы логина */
class LoginFormSteps extends Steps {
	constructor () {
		super();

		this.loginForm = new LoginForm();
	}

	/**
	 * Выбрать домен в списке
	 *
	 * @param {string} provider
	 */
	selectDomain (provider) {
		let actual = this.loginForm.getSelectedDomain(provider);

		assert.equal(actual.state, 'success',
			`Не удалось найти элемент с заданным провайдером: ${provider}`);
	}

	/**
	 * Проверить домен, который используется по умолчанию
	 *
	 * @param {string} provider
	 */
	checkDefaultDomain (provider) {
		this.getActiveDomain('mail.ru');
	}

	/**
	 * Выбрать домен в списке
	 *
	 * @param {string} login
	 */
	setLogin (login) {
		this.loginForm.setLogin(login);
	}

	/**
	 * Получить значение поля логина
	 *
	 * @param {string} provider
	 */
	getLoginValue (provider) {
		if (provider === 'other') {
			provider = 'mail.ru';
		}

		let actual = this.loginForm.getLoginValue();

		assert.equal(actual, provider,
			`Не удалось найти значение для заданного провайдера ${provider}`);
	}

	/**
	 * Сверить активный домен
	 *
	 * @param {string} provider
	 */
	getActiveDomain (provider) {
		let actual = this.loginForm.getActiveDomain();

		assert.equal(actual, provider,
			`Передан неверный провайдер ${provider}`);
	}

	/**
	 * Проверить текст контрола "Запомнить почту"
	 */
	checkRememberText () {
		let actual = this.loginForm.getRememberText();

		assert.equal(actual, 'запомнить почту',
			`Проверка текста контрола "Запомнить почту"`);
	}

	/**
	 * Проверить состояние контрола "Запомнить почту"
	 */
	checkSessionState () {
		let actual = this.loginForm.getSessionState();

		assert.equal(actual, '1',
			`Проверка состояние контрола "Запомнить почту"`);
	}

	/**
	 * Проверить активный элемент
	 */
	checkActiveElement () {
		let actual = this.loginForm.checkActiveElement();

		assert(actual, `Неверный активный элемент`);
	}

	/**
	 * Выбрать домен
	 *
	 * @param {string} provider
	 */
	clickByDomain (provider) {
		let actual = this.loginForm.clickByDomain(provider);

		assert.equal(actual.state, 'success',
			`Не удалось найти элемент для провайдера ${provider}`);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 */
	send (data) {
		let actual = this.loginForm.send(data);

		assert.equal(actual.state, 'success',
			'Не удалось отправить форму c переданными данными');
	}

	/**
	 * Получить заголовок формы
	 */
	checkTitle () {
		assert.equal(this.loginForm.title, 'Добавить почтовый ящик',
			'Не удалось проверить заголовок формы');
	}

	/**
	 * Получить описание формы
	 */
	checkDescription () {
		let actual = this.loginForm.description;

		assert.equal(actual, 'Авторизуйтесь несколькими почтовыми ' +
			'ящиками, и вы сможете легко переключаться между ними.',
			'Не удалось проверить описание формы');
	}

	/**
	 * Получить ссылку на восстановление пароля
	 */
	checkPassRemindLink () {
		let actual = this.loginForm.getPassRemindLink();

		assert.equal(actual, 'https://e.mail.ru/password/restore/',
			'Некорректная ссылка на восстановление пароля');
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @param {string} expected
	 */
	getError (expected) {
		let actual = this.loginForm.getError();

		assert.equal(actual, expected, `Сообщение ошибки`);
	}

	/**
	 * Проверить видимость списка доменов
	 */
	isSelectVisible () {
		let actual = this.loginForm.isSelectVisible();

		assert(!actual, `Видимость списка доменов под вопросом`);
	}
}

module.exports = new LoginFormSteps();