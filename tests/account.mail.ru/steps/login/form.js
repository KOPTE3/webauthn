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
		assert.equal(this.loginForm.getActiveDomain(), provider,
			`Передан неверный провайдер ${provider}`);
	}

	/**
	 * Проверить текст контрола "Запомнить почту"
	 */
	checkRememberText () {
		assert.equal(this.loginForm.getRememberText(), 'запомнить почту',
			`Проверка текста контрола "Запомнить почту"`);
	}

	/**
	 * Проверить состояние контрола "Запомнить почту"
	 */
	checkSessionState () {
		assert.equal(this.loginForm.getSessionState(), '1',
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
		assert.equal(this.loginForm.description, 'Авторизуйтесь несколькими почтовыми ' +
			'ящиками, и вы сможете легко переключаться между ними.',
			'Не удалось проверить описание формы');
	}

	/**
	 * Получить ссылку на восстановление пароля
	 */
	checkPassRemindLink () {
		assert.equal(this.loginForm.getPassRemindLink(), 'https://e.mail.ru/password/restore/',
			'Некорректная ссылка на восстановление пароля');
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @param {string} expected
	 */
	getError (expected) {
		assert.equal(this.loginForm.getError(), expected, `Сообщение ошибки`);
	}

	/**
	 * Проверить видимость списка доменов
	 */
	isSelectVisible () {
		assert(!this.loginForm.isSelectVisible(), `Видимость списка доменов под вопросом`);
	}
}

module.exports = new LoginFormSteps();
