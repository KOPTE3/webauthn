'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let form = require('../../pages/login/form');
let providers = require('../../store/collectors/providers');

class Form extends Steps {
	constructor () {
		super();
	}

	/**
	 * Выбрать домен в списке
	 *
	 * @param {string} provider
	 */
	selectDomain (provider) {
		let actual = form.getSelectedDomain(provider);

		assert.equal(actual.state, 'success',
			`Не удалось найти элемент с заданным провайдером: ${provider}`);
	}

	/**
	 * Проверить домен, который используется по умолчанию
	 *
	 * @param {string} provider
	 */
	checkDefaultDomain (provider) {
		form.getActiveDomain('mail.ru');
	}

	/**
	 * Выбрать домен в списке
	 *
	 * @param {string} login
	 */
	setLogin (login) {
		let actual = form.setLogin(login);

		assert.equal(actual.state, 'success',
			`Не удалось найти элемент с заданным провайдером: ${login}`);
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

		assert.equal(form.getLoginValue, provider,
			`Не удалось найти значение для заданного провайдера ${provider}`);
	}

	/**
	 * Сверить активный домен
	 *
	 * @param {string} provider
	 */
	getActiveDomain (provider) {
		assert.equal(form.activeDomain, provider,
			`Передан неверный провайдер ${provider}`);
	}

	/**
	 * Проверить текст ссылки "Узнать больше"
	 */
	checkHelpText () {
		assert.equal(form.getHelpText, 'Узнать больше',
			`Проверка ссылки "Узнать больше"`);
	}

	/**
	 * Проверить текст ссылки "Узнать больше"
	 */
	checkHelpLink () {
		assert.equal(form.getHelpLink, 'http://mailblog.mail.ru/vvp-ios-and/',
			`Проверка ссылки "Узнать больше"`);
	}

	/**
	 * Проверить текст контрола "Запомнить почту"
	 */
	checkRememberText () {
		assert.equal(form.getRememberText, 'запомнить почту',
			`Проверка текста контрола "Запомнить почту"`);
	}

	/**
	 * Проверить состояние контрола "Запомнить почту"
	 */
	checkRememberState () {
		assert.equal(form.getRememberState, '1',
			`Проверка состояние контрола "Запомнить почту"`);
	}

	/**
	 * Выбрать домен
	 *
	 * @param {string} provider
	 */
	clickByDomain (provider) {
		let actual = form.clickByDomain(provider);

		assert.equal(actual.state, 'success',
			`Не удалось найти элемент для провайдера ${provider}`);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 */
	send (data) {
		let actual = form.send(data);

		assert.equal(actual.state, 'success',
			'Не удалось отправить форму c переданными данными');
	}

	/**
	 * Получить заголовок формы
	 */
	checkTitle () {
		assert.equal(form.title, 'Вход в почту',
			'Не удалось проверить заголовок формы');
	}

	/**
	 * Получить описание формы
	 */
	checkDescription () {
		assert.equal(form.description, 'Вы можете войти в почту с помощью аккаунта ' +
			'любого почтового сервиса и легко переключаться между ними, не выходя из почты. ' +
			'Узнать больше', 'Не удалось проверить описание формы');
	}

	/**
	 * Получить ссылку на восстановление пароля
	 */
	checkPassRemindLink () {
		assert.equal(form.getPassRemindLink, 'https://e.mail.ru/cgi-bin/passremind',
			'Некорректная ссылка на восстановление пароля');
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @param {string} expected
	 */
	getError (expected) {
		assert.equal(form.getError, expected, `Сообщение ошибки`);
	}

	/**
	 * Проверить видимость списка доменов
	 */
	isSelectVisible () {
		assert(!form.isSelectVisible, `Видимость списка доменов под вопросом`);
	}
}

module.exports = new Form();
