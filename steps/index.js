'use strict';

let assert = require('assert');
let Pages = require('../pages');
let account = require('../utils/account');

let pages = new Pages();

class Steps {
	/**
	 * Локаторы
	 *
	 * @param {Array} list — список фич, которые требуется включить
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
	 * Обновить страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	static refresh (query) {
		pages.refresh(query);
	}

	/** Подтвердить алерт */
	static alertAccept () {
		pages.alertAccept();
	}

	/**
	 * Получить текст алерта
	 *
	 * @returns {string}
	 */
	static getAlertText () {
		return pages.alertText();
	}

	/** Сбросить текущую сессию */
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
	 * Выключает на текущей странице обработчик onbeforeunload
	 *
	 * например - в почте пишем письмо в compose
	 * и если закрываем окно, то выходит сообщение, иногда оно не нужно т.к.
	 * webdriver в этом случае не сможет закрыть это сообщение и выдаст ошибку
	 */
	static disableConfirm () {
		this.page.disableConfirm();
	}

	/**
	 * Дождатся загрузки страницы
	 */
	wait () {
		this.page.wait();
	}

	/**
	 * Авторизация
	 *
	 * @param {string} type — типа авторизации
	 * @param {string} credentials — авторизационные данные
	 * @returns {boolean}
	 */
	static auth (type, credentials) {
		return Pages.auth(...arguments);
	}

	/**
	 * Регистрация пользователя
	 *
	 * @param {Object} user - объект пользователя
	 * @returns {Object}
	 */
	static register (user) {
		return Pages.register(user);
	}

	/**
	 * Открыть страницу
	 *
	 * @see Pages.open
	 */
	static open (/** path, query */) {
		try {
			if (!this.page.locators.container) {
				throw new Error();
			}
		} catch (error) {
			assert(false, 'Не определен основной элемент страницы в ' +
				'"locators.container"');
		}

		let actual = this.page.open(...arguments);

		assert(actual, 'Не удалось авторизоваться');
	}

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @param {number} ms
	 */
	static pause (ms) {
		pages.pause(ms);
	}

	/**
	 * Проверяет залогинен ли пользователь
	 *
	 * @param {string} [email]
	 * @param {number} [timeout]
	 */
	static isActiveUser (email, timeout) {
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
	 * Установить размер окна
	 *
	 * @deprecated
	 * @param {Object} size
	 * @param {number} size.width
	 * @param {number} size.height
	 */
	static setViewportSize (size) {
		pages.setViewportSize(size);
	}

	/**
	 * Установить размер окна
	 *
	 * @param {Object} size
	 * @param {number} size.width
	 * @param {number} size.height
	 */
	setViewportSize (size) {
		pages.setViewportSize(size);
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
}

module.exports = Steps;
