'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let store = require('../../store/login/form');
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
	 * Отправить форму по клику
	 *
	 * @returns {Promise}
	 */
	clickBySignInButton () {
		return this.loginForm.clickBySignInButton();
	}

	/**
	 * Заполнить поле логина
	 *
	 * @param {string} login
	 */
	setLogin (login) {
		this.loginForm.setLogin(login);
	}

	/**
	 * Заполнить поле пароля
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.loginForm.setPassword(password);
	}

	/**
	 * Заполнить авторизационные поля
	 *
	 * @param {Object} credentials
	 */
	setCredentials ({ username, password }) {
		this.setLogin(username);
		this.setPassword(password);
	}

	/**
	 * Получить активный домен
	 *
	 * @param {string} provider
	 */
	clickByDomain (provider) {
		this.loginForm.clickByDomain(provider);
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
			'Проверка текста контрола "Запомнить почту"');
	}

	/**
	 * Проверить состояние контрола "Запомнить почту"
	 */
	checkSessionState () {
		let actual = this.loginForm.getSessionState();

		assert.equal(actual, '1',
			'Проверка состояние контрола "Запомнить почту"');
	}

	/**
	 * Проверить активный элемент
	 */
	checkActiveElement () {
		let actual = this.loginForm.checkActiveElement();

		assert(actual, 'Неверный активный элемент');
	}

	/**
	 * Выбрать домен
	 *
	 * @param {string} provider
	 */
	clickByDomain (provider) {
		this.loginForm.clickByDomain(provider);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 */
	send (data) {
		this.loginForm.send(data);
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
	 * Проверить ссылку восстановления пароля
	 */
	clickPassRemindLink () {
		let actual = this.loginForm
			.clickPassRemindLink(store.links.passwordRestore);

		assert(actual, 'Указана неверная ссылка восстановления пароля');
	}

	/**
	 * Проверить ссылку восстановления пароля
	 */
	clickSignUpLink () {
		let actual = this.loginForm
			.clickPassRemindLink(store.links.clickSignUpLink);

		assert(actual, 'Указана неверная ссылка на регистрацию');
	}

	/**
	 * Проверить видимость кнопки восстановления пароля
	 */
	isPassRemindLinkNotExist () {
		let actual = this.loginForm.isPassRemindLinkExist();

		assert(actual, 'Некорректная видимость кнопки восстановления пароля');
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @param {string} expected
	 */
	getError (expected) {
		let actual = this.loginForm.getError();

		assert.equal(actual, expected, 'Сообщение ошибки');
	}

	/**
	 * Проверить видимость списка доменов
	 */
	isSelectVisible () {
		let actual = this.loginForm.isSelectVisible();

		assert(!actual, 'Видимость списка доменов под вопросом');
	}
}

module.exports = LoginFormSteps;
