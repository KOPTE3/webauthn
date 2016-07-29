'use strict';

let LoginPage = require('../login');

/** Модуль для работы с формой страницы логина */
class LoginForm extends LoginPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-login',
			selectedDomain  : '.b-email__domain .b-dropdown__ctrl__text',
			selectControl   : '.b-email__domain .b-dropdown__ctrl',
			providersBlock  : '.b-email-providers__list',
			activeDomain    : '.b-email-providers__list__item_selected',
			select          : '.b-select__dropdown',
			login           : '[name="Username"]',
			form            : '[data-bem="b-form"]',
			password        : '[name="Password"]',
			submit          : '[data-name="submit"]:first-child',
			submitNext      : '.next[data-name="submit"]',
			error           : '.b-login__errors',
			title           : '.b-login__header__title',
			desc            : '.b-login__header__desc',
			rememberState   : '.b-grid_restore [name="saveauth"]',
			rememberText    : '.b-grid_restore .b-checkbox__label',
			forgetLink      : '.b-link_passremind',
			signUpLink      : '[data-name="signup-link"]',
			restoreContainer: '.b-login_container-for-restore',
			restoreBlockTitle: '.b-phone-restore__title',
			restoreFormTitle : '.b-panel__header__text',
			restoreFormSend : '.b-form__controls button',
			restoreFormCancel : '.b-form__controls a',
			captchaDescription: '.b-captha__description',
			captchaLink: '.b-captcha__code__reload',
			captchaImage: '.b-captcha__captcha',

			selectedItem (provider) {
				return `.b-email__domain .b-dropdown__list [data-value="${provider}"]`;
			},

			get restorePhone () {
				return `${this.restoreContainer} .b-segment-input__head`;
			},

			get sendCode () {
				return `${this.restoreContainer} .b-phone-btn__cell button`;
			}
		};
	}

	/**
	 * Получить активный домен
	 *
	 * @returns {string}
	 */
	getActiveDomain () {
		return this.page.getAttribute(this.locators.activeDomain, 'data-provider');
	}

	/**
	 * Проверить активный элемент
	 *
	 * @returns {boolean}
	 */
	checkActiveElement () {
		return this.page.hasFocus(this.locators.login);
	}

	/**
	 * Проверить переход по ссылке восстановления пароля
	 *
	 * @param {string} url
	 * @returns {boolean}
	 */
	clickPassRemindLink (url) {
		this.page.click(this.locators.forgetLink);

		return this.page.waitForUrl(url);
	}

	/**
	 * Проверить переход по ссылке регистрации
	 *
	 * @param {string} url
	 * @returns {boolean}
	 */
	clickSignUpLink (url) {
		this.page.click(this.locators.signUpLink);

		return this.page.waitForUrl(url);
	}

	/**
	 * Выбрать домен по клику
	 *
	 * @param {string} provider
	 */
	clickDomain (provider) {
		this.page.click(`[data-id="${provider}"]`);
	}

	/**
	 * Выбрать домен из списка
	 *
	 * @param {string} provider
	 */
	selectDomain (provider) {
		let { selectControl, selectedItem } = this.locators;

		this.page.click(selectControl);
		this.page.click(selectedItem(provider));
	}

	/**
	 * Отправить форму по клику
	 */
	clickSignInButton () {
		this.page.click(this.locators.submit);
	}

	/**
	 * Клик по кнопке продолжить появляется вместо кнопки войти
	 * когда у нас oauth
	 */
	clickNextButton () {
		this.page.click(this.locators.submitNext);
	}

	/**
	 * Получить состояние видимости блока восстановления телефона
	 *
	 * @returns {boolean}
	 */
	isVisibleRestoreBlock () {
		return this.page.isVisible(this.locators.restoreContainer);
	}

	/**
	 * Получить текст загловка блока с телефоном для восстановления
	 *
	 * @returns {string}
	 */
	textRestoreBlockTitle () {
		return this.page.isVisible(this.locators.restoreBlockTitle);
	}

	/**
	 * Получить текст загловка формы с телефоном для восстановления
	 *
	 * @returns {string}
	 */
	textRestoreFormTitle () {
		return this.page.getText(this.locators.restoreFormTitle);
	}

	/**
	 * Получить текст каптчи
	 *
	 * @returns {string}
	 */
	textRestoreFormCaptcha () {
		return this.page.getText(this.locators.captchaDescription);
	}

	/**
	 * Получить текст ссылки обновления каптчи
	 *
	 * @returns {string}
	 */
	textCaptchaLink () {
		return this.page.getText(this.locators.captchaLink);
	}

	/**
	 * Получить текст кнопки отправки формы телефона для восстановления
	 *
	 * @returns {string}
	 */
	textRestoreFormSend () {
		return this.page.getText(this.locators.restoreFormSend);
	}

	/**
	 * Получить текст кнопки отмены формы телефона для восстановления
	 *
	 * @returns {string}
	 */
	textRestoreFormCancel () {
		return this.page.getText(this.locators.restoreFormCancel);
	}

	/**
	 * Проверить ссылку на изображение с каптчей
	 *
	 * @returns {string}
	 */
	captchaImage () {
		return this.page.getAttribute(this.locators.captchaImage, 'src');
	}

	/**
	 * Переход на форму отправки кода
	 */
	sendCode () {
		this.page.click(this.locators.sendCode);
	}

	/**
	 * Получить текст кнопки отправки кода
	 *
	 * @returns {string}
	 */
	sendCodeText () {
		return this.page.getText(this.locators.sendCode);
	}

	/**
	 * Получить номер телефона для восстановления
	 *
	 * @returns {boolean}
	 */
	getPhoneNumber () {
		return this.page.getText(this.locators.restorePhone);
	}

	/**
	 * Получить состояние видимости списка доменов
	 *
	 * @returns {boolean}
	 */
	isSelectVisible () {
		return this.page.isVisible(this.locators.select);
	}

	/**
	 * Заполнить поле логина
	 *
	 * @param {string} login
	 * @returns {Promise}
	 */
	setLogin (login) {
		return this.page.setValue(this.locators.login, login);
	}

	/**
	 * Заполнить поле пароля
	 *
	 * @param {string} password
	 * @returns {Promise}
	 */
	setPassword (password) {
		return this.page.setValue(this.locators.password, password);
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @returns {string}
	 */
	getError () {
		return this.page.getText(this.locators.error);
	}

	/**
	 * Получить домен, который используется по умолчанию
	 *
	 * @returns {string}
	 */
	getDefaultDomain () {
		return this.page
			.elements(this.locators.providersBlock)
			.getAttribute('data-domain');
	}

	/**
	 * Получить адрес ссылки для восстановления пароля
	 *
	 * @returns {boolean}
	 */
	getPassRemindLink () {
		return this.page.getAttribute(this.locators.forgetLink, 'href');
	}

	/**
	 * Проверить видимость кнопки восстановления пароля
	 *
	 * @returns {boolean}
	 */
	isPassRemindLinkExist () {
		return this.page.isExisting(this.locators.forgetLink);
	}

	/**
	 * Прикинуться мобильным пользователем
	 * Это требуется для пропуска формы дорегистрации
	 */
	meetMeAsMobileUser () {
		for (let field of ['mp', 'mmp']) {
			this.page.addHiddenValue(this.locators.form, field, 1);
		}
	}

	/**
	 * Получить текст контрола "Запомнить почту"
	 *
	 * @returns {boolean}
	 */
	getRememberText () {
		return this.page.getText(this.locators.rememberText);
	}

	/**
	 * Получить состояние контрола "Запомнить почту"
	 *
	 * @returns {boolean}
	 */
	getSessionState () {
		return this.page.isEnabled(this.locators.rememberState);
	}

	/**
	 * Получить имя домена из списка
	 *
	 * @returns {string}
	 */
	getSelectedDomain () {
		return this.page.getText(this.locators.selectedDomain);
	}

	/**
	 * Получить заголовок формы
	 *
	 * @type {string}
	 */
	get title () {
		return this.page.getText(this.locators.title);
	}

	/**
	 * Получить описание формы
	 *
	 * @type {string}
	 */
	get description () {
		return this.page.getText(this.locators.desc);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 * @returns {Promise}
	 */
	send (data) {
		return this.page.fill(this.locators.container, data, true);
	}

	/**
	 * Получить значение из списка доменов
	 */
	getLoginValue () {

	}
}

module.exports = LoginForm;
