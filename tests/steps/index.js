'use strict';

let assert = require('assert');
let Pages = require('../pages');
let account = require('../utils/account');
let ajax = require('../utils/ajax');

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
	 * Подписывается на чтение запросов
	 *
	 * @param {string} request
	 */
	static setAjaxLog (request) {
		ajax.registerLogger(request);
	}

	/**
	 * Читает лог запросов
	 *
	 * @param {string} request
	 * @param {Function} predicate
	 */
	static getAjaxLog (request, predicate) {
		let { value } = ajax.getLoggerInfo(request);
		let actual = predicate(value);

		assert(actual, `Условие невыполнено`);
	}
}

module.exports = Steps;
