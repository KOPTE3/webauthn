'use strict';

let assert = require('assert');
let Pages = require('../pages');
let account = require('../utils/account');

let pages = new Pages();

/**
 * @class Steps
 */
class Steps {
	/**
	 * Авторизация
	 *
	 * @param {string} [type] — типа авторизации
	 * @param {string} [credentials] — авторизационные данные
	 * @returns {boolean}
	 */
	static auth (type, credentials) {
		return Pages.auth(...arguments);
	}

	/**
	 * Регистрация пользователя
	 *
	 * @param {string} [type] — тип авторизации
	 * Из-за отсутствия других реализаций пока не используется, но зарезервирован
	 * @param {Object} [options] — авторизационые данные
	 * @returns {Object}
	 */
	static register (type, options) {
		return account.register(type, options);
	}

	/**
	 * Открыть страницу
	 *
	 * @param {string} path
	 * @param {Object} [query]
	 * @see Pages.open
	 */
	static open (path, query) {
		let actual = this.page.open(...arguments);

		// Игнорируем обращения к локаторам если исключение возникает
		// до вызова степа в самом тесте.
		try {
			if (!this.page.locators.container) {
				throw new Error('container');
			}
		} catch (error) {
			assert.equal(error.name, 'container',
				`"${this.name || ''}" не определен основной элемент страницы в "pages/<page>/locators.container"`);
		}

		this.page.wait();

		assert(actual, 'Не удалось авторизоваться');
	}

	/**
	 * Локаторы
	 *
	 * @param {string[]} list — список фич, которые требуется включить
	 */
	static features (...list) {
		pages.features(...list);
	}

	/**
	 * Скрипты, выполняемые сразу после page.url
	 */
	static inject () {
		pages.inject(...arguments);
	}

	/**
	 * @deprecated
	 * @param {number} ms
	 * @see pause
	 */
	static pause (ms) {
		pages.pause(ms);
	}

	/**
	 * @deprecated
	 * @see refresh
	 * @param {Object} query
	 */
	static refresh (query) {
		pages.refresh(query);
	}

	/**
	 * @deprecated
	 * @see alertAccept
	 */
	static alertAccept () {
		pages.alertAccept();
	}

	/**
	 * @deprecated
	 * @see getAlertText
	 * @returns {string}
	 */
	static getAlertText () {
		return pages.alertText();
	}

	/**
	 * @deprecated
	 * @see reload
	 */
	static reload () {
		pages.reload();
	}

	/**
	 * @deprecated
	 * @see wait
	 */
	static wait () {
		this.page.wait();
	}

	/**
	 * @deprecated
	 * @see disableConfirm
	 */
	static disableConfirm () {
		this.page.disableConfirm();
	}

	/**
	 * @deprecated
	 * @see setViewportSize
	 * @param {Object} size
	 */
	static setViewportSize (size) {
		pages.setViewportSize(size);
	}

	/**
	 * @deprecated
	 * @see isActiveUser
	 * @param {string} [email]
	 * @param {number} [timeout]
	 */
	static isActiveUser (email, timeout) {
		let actual = account.isActiveUser(...arguments);

		assert(actual, `Пользователь "${email}" не авторизован`);
	}

	/**
	 * Перезагружает текущую страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	refresh (query) {
		pages.refresh(query);
	}

	/** Сбросить текущую сессию */
	reload () {
		pages.reload();
	}

	/**
	 * Разлогинизация,
	 * если не передать email то берется текущий аккаунт
	 *
	 * @param {string} email
	 * @param {number} timeout
	 */
	logout (email, timeout) {
		account.logout(...arguments);
	}

	/** Подтвердить алерт */
	alertAccept () {
		pages.alertAccept();
	}

	/**
	 * Получить текст алерта
	 *
	 * @returns {string}
	 */
	getAlertText () {
		return pages.alertText();
	}

	/**
	 * Дождатся загрузки страницы
	 */
	wait () {
		this.page.wait();
	}

	/**
	 * Выключает на текущей странице обработчик onbeforeunload
	 *
	 * например - в почте пишем письмо в compose
	 * и если закрываем окно, то выходит сообщение, иногда оно не нужно т.к.
	 * webdriver в этом случае не сможет закрыть это сообщение и выдаст ошибку
	 */
	disableConfirm () {
		this.page.disableConfirm();
	}

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @param {number} ms
	 */
	pause (ms) {
		pages.pause(ms);
	}

	/**
	 * Перейти по урлу
	 *
	 * @param {string} url — url
	 * @param {Object} [query] — параметры запроса
	 */
	url (url, query = {}) {
		pages.url(...arguments);
	}

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @param {string} [email]
	 */
	isActiveUser (email) {
		let actual = account.isActiveUser(...arguments);

		assert(actual, `Пользователь "${email}" не авторизован`);
	}

	/**
	 * Дожидается требуемного адреса
	 *
	 * @param {string|RegExp} url
	 * @param {string} [query]
	 * @param {number|string} [options] — timeout, revert
	 */
	waitForUrl (url, query, ...options) {
		let actual = pages.waitForUrl(...arguments);

		assert(actual, `Не найдено соответствие с ожидаемым адресом ${url}`);
	}

	/**
	 * Установить размер вьюпорта
	 *
	 * @param {Object} size {width, height}
	 * @param {boolean} confirm — дождаться изменений размеров вьюпорта
	 */
	setViewportSize (size, confirm) {
		pages.setViewportSize(size);

		if (confirm) {
			this.waitForViewport(size);
		}
	}

	/**
	 * Получить размер вьюпорта
	 *
	 * @returns {Object} {width, height}
	 */
	getViewportSize () {
		return pages.getViewportSize();
	}

	/**
	 * Дожидается заданных размеров вьюпорта
	 *
	 * @param {Object} expected {width, height}
	 * @returns {Object}
	 */
	waitForViewport (expected) {
		let { page } = pages;

		return this.waitUntil(() => {
			let actual = this.getViewportSize();

			try {
				return !assert.deepEqual(actual, expected);
			} catch (error) {}
		}, page.options.waitforTimeout,
			'Не удалось дождаться требуемого размера вьюпорта');
	}

	/**
	 * Переключиться на ближайшую вкладку
	 */
	switchToNextTab () {
		pages.switchToNextTab();
	}

	/**
	 * Регрессионное сравнение документа
	 *
	 * @see browser.checkDocument
	 * @see browser.saveDocumentScreenshot
	 * @param {Object} options
	 *
	 *  Доступные опции:
	 *     options.hide {string[]}              Скрывает заданные элементы
	 *     options.remove {string[]}            Удаляет заданные элементы
	 *     options.widths {number[]}            Задает размер изображениям (desktop)
	 *     options.orientations {number[]}      Устанавливает ориентацию (mobile)
	 *     options.misMatchTolerance {number}   Задает границы поиска несоотвествий (от 0 до 100)
	 *     options.viewportChangePause {number} Устанавливает время ожидания после
	 *                                          изменения раземеров вьюпорта
	 */
	compareDocument (options) {
		let images = pages.compareDocument(options),
			actual = images.every(image => image.isExactSameImage);

		assert(actual, 'Не найдено соответствие документа с ожидаемым изображением');
	}

	/**
	 * Регрессионное сравнение вьюпорта
	 *
	 * @see browser.checkViewport
	 * @see browser.saveViewportScreenshot
	 * @param {Object} options
	 */
	compareViewport (options) {
		let images = pages.compareViewport(options),
			actual = images.every(image => image.isExactSameImage);

		assert(actual, 'Не найдено соответствие вьюпорта с ожидаемым изображением');
	}

	/**
	 * Регрессионное сравнение элемента
	 *
	 * @see browser.checkElement
	 * @see browser.saveElementScreenshot
	 * @param {string} locator
	 * @param {Object} options
	 */
	compareElement (locator, options) {
		let images = pages.compareElement(locator, options),
			actual = images.every(image => image.isExactSameImage);

		assert(actual, 'Не найдено соответствие элемента с ожидаемым изображением');
	}

	/**
	 * Дождаться выполнения какого-либо действия
	 * Если событие асинхронное, то колбек должен иметь имя async
	 *
	 * Пример:
	 *
	 * waitUntil(function async () {
	 *    // ...
	 * }, 10 * 1000, 'Время на выполнение операции вышло');
	 *
	 * @see browser.waitUntil
	 * @param {Function} callback
	 * @param {number} [timeout]
	 * @param {string} [message]
	 * @returns {*}
	 */
	waitUntil (callback, timeout, message) {
		return pages.waitUntil(...arguments);
	}

	/**
	 * Ожидаем алерт
	 *
	 * @param {number} timeout
	 * @param {string} message
	 * @param {boolean} reverse
	 */
	waitAlert (timeout, message, reverse) {
		pages.waitAlert(...arguments);
	}
}

module.exports = Steps;
