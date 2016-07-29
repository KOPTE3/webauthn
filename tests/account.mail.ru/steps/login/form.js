'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let LoginForm = require('../../pages/login/form');
let authorization = require('../../store/authorization');
let store = require('../../store/login/form');
let providers = require('../../store/authorization/providers');

/** Модуль для работы с шагами формы страницы логина */
class LoginFormSteps extends Steps {
	constructor () {
		super();

		this.loginForm = new LoginForm();
	}

	/**
	 * Выбрать домен из списка
	 *
	 * @param {string} provider
	 */
	selectDomain (provider) {
		this.loginForm.selectDomain(provider);
	}

	/**
	 * Получить имя домена из списка
	 *
	 * @param {string} provider
	 */
	getSelectedDomain (provider) {
		let actual = this.loginForm.getSelectedDomain();

		assert.equal(actual, `@${provider}`, 'Имя домена не совпадает');
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
	 * @property {string} username
	 * @property {string} password
	 * @param {boolean} [mobile] — представиться мобильным пользователем
	 */
	setCredentials ({ username, password }, mobile) {
		this.setLogin(username);
		this.setPassword(password);

		if (mobile) {
			this.loginForm.meetMeAsMobileUser();
		}
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

		provider = providers.find(provider);

		if (!provider || !store.providers.buttons.includes(provider)) {
			provider = 'other';
		}

		assert.equal(actual, provider, 'Активный провайдер');
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
	clickDomain (provider) {
		this.loginForm.clickDomain(provider);
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
	 * Отправить форму по клику
	 */
	clickSignInButton () {
		this.loginForm.clickSignInButton();
	}

	/**
	 * Кликнуть по кнопке продолжить
	 * она например появляется при выборе oauth провайдеров
	 */
	clickNextButton () {
		this.loginForm.clickNextButton();
	}

	/**
	 * Получить состояние видимости блока восстановления телефона
	 */
	restoreBlockVisibility () {
		let actual = this.loginForm.isVisibleRestoreBlock();

		assert(actual, 'Видимость блока восстановления телефона');

		actual = this.loginForm.sendCodeText();

		assert(actual, 'Текст кнопки отправки кода');

		actual = this.loginForm.textRestoreBlockTitle();

		assert(actual, 'Текст загловка блока с телефоном для восстановления');
	}

	/**
	 * Получить состояние видимости формы восстановления телефона
	 */
	restoreFormVisibility () {
		let actual = this.loginForm.textRestoreFormTitle();

		assert(actual, 'Код с картинки', 'Текст текста каптчи');

		actual = this.loginForm.textRestoreFormCaptcha();

		assert(actual, 'Восстановление пароля', 'Текст ссылки обновления каптчи');

		actual = this.loginForm.textCaptchaLink();

		assert(actual, 'Не вижу код', 'Текст ссылки обновления каптчи');

		actual = this.loginForm.captchaImage();

		let captcha = authorization.captcha(1);

		actual = actual.startsWith(captcha);

		assert(actual, 'Ссылка на изображение каптчей');

		actual = this.loginForm.textRestoreFormSend();

		assert.equal(actual, 'Продолжить',
			'Текст кнопки отправки формы телефона для восстановления');

		actual = this.loginForm.textRestoreFormCancel();

		assert.equal(actual, 'Отменить',
			'Текст кнопки отмены формы телефона для восстановления');
	}

	/**
	 * Проверить сокрытие последних цифр телефонного номера
	 */
	isMaskedPhoneNumber () {
		let number = this.loginForm.getPhoneNumber(),
			actual = number.endsWith('-**-**');

		assert(actual, '4 последние цифры номера должны быть скрыты');
	}

	/**
	 * Переход на форму отправки кода
	 */
	sendCode () {
		this.loginForm.sendCode();
		this.loginForm.waitForUrl(/recovery/);
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
			.clickSignUpLink(store.links.signUp);

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
