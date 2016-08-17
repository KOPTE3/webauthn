'use strict';

let deepmerge = require('deepmerge');
let account = require('../utils/account');
let URL = require('../utils/url');

let cache = {
	session : false,
	features: []
};

/** @namespace browser */
class PageObject {
	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#LEGO'
		};
	}

	/**
	 * Ссылка на объект страницы
	 *
	 * @type {Promise}
	 */
	get page () {
		return browser;
	}

	/**
	 * Получить заголовок страницы
	 *
	 * @type {string}
	 */
	get title () {
		this.page.getTitle();
	}

	/**
	 * Метод проверяет, что контейнер урла был открыт
	 *
	 * @returns {boolean}
	 */
	isVisible () {
		return this.page.isVisible(this.locators.container);
	}

	/**
	 * Дождаться появления требуемого элемента
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForVisible(this.locators.container);
	}

	/**
	 * Включение фичи
	 *
	 * @param {Array} list — список фич, которые требуется включить
	 */
	features (list) {
		cache.features.push(...list);
	}

	/**
	 * Открытие страницы
	 *
	 * @param {string} [path] - путь, который нужно подставить к location
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (path, query = {}) {
		if (typeof path === 'object' && path !== null) {
			query = path;
			path = null;
		}

		if (!path) {
			path = this.location;
		}

		let { user, features } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		let url = URL.format(path, query);

		this.page.url(url);
		this.wait();

		if (cache.session) {
			return account.isActiveUser();
		}

		return true;
	}

	/**
	 * Авторизация
	 *
	 * @param {string} type — тип авторизации
	 * @param {Object} [credentials] — авторизационые данные
	 */
	static auth (type, credentials) {
		cache.session = account.session(...arguments);
	}

	/**
	 * Обновить страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	refresh (query = {}) {
		let { features } = cache;
		let url = this.page.getUrl();

		if (features.length) {
			query.ftrs = features.join(' ');
		}

		url = URL.format(url, query);

		this.page.url(url);
	}

	/** Сбросить текущую сессию */
	reload () {
		this.page.reload();
	}

	/**
	 * Расширяет объект
	 *
	 * @see deepmerge
	 * @returns {Object}
	 */
	extend (/** ... */) {
		return deepmerge(...arguments);
	}

	/**
	 * Дожидается требуемного адреса
	 *
	 * @param {string|RegExp|Function} value
	 * @param {string} [query]
	 * @param {number|string} [options] — timeout, revert
	 * @returns {boolean}
	 */
	waitForUrl (value, query, ...options) {
		if (typeof value === 'string') {
			value = URL.format(...arguments);
		}

		try {
			return this.page.waitForUrl(value, ...options);
		} catch (error) {
			return false;
		}
	}

	setViewportSize ({width = 1200, height = 600}) {
		this.page.setViewportSize({ width, height });
	}

	/**
	 * Метод пробует кликнуть по элементу несколько раз (осторожно костыль)
	 *
	 * @param {string} locator - локатор элемента
	 * @param {number} count - количество попыток (по умолчанию 10)
	 * @param {number} interval - интервал в ms, через который делать
	 * попытки (по умолчанию 500ms)
	 *
	 * @returns {boolean}
	 */
	clickWithRetry (locator, count = 3, interval = 1000) {
		let page = this.page;

		let tryClick = () => {
			try {
				page.waitForExist(locator);
				let links = page.elements(locator);

				page.elementIdClick(links.value[0].ELEMENT);

				return true;
			} catch (error) {
				browser.pause(interval);

				return false;
			}
		};

		while (count--) {
			if (tryClick()) {
				return true;
			}
		}

		throw new Error('Can\'t click to element ' + locator);
	}

	/**
	 * Метод обновляет страницу пока условие не будет выполнено
	 *
	 * @param {Function} conditionFunc
	 * @param {number} count - количество попыток (по умолчанию 10)
	 * @param {number} interval - интервал в ms, через который делать
	 * 							  попытки (по умолчанию 500ms)
	 *
	 * @returns {boolean}
	 */
	refreshUntilCondition (conditionFunc, count = 3, interval = 1000) {
		let page = this.page;
		let tryRefresh = () => {
			if (conditionFunc()) {
				return true;
			} else {
				browser.pause(interval);
				page.refresh();
				this.wait();

				return false;
			}
		};

		while (count--) {
			if (tryRefresh()) {
				return true;
			}
		}

		throw new Error('Can\'t refresh on condition');
	}

	/**
	 * Метод пробует кликнуть по всем найденным селектором элементам
	 *
	 * @param {string} locator - куда кликнуть
	 */
	clickAll (locator) {
		let elements = this.page.elements(locator);
		let clicked = false;
		
		elements.value.forEach(element => {
			if (clicked) {
				return;
			}

			try {
				this.page.elementIdClick(element.ELEMENT);
				clicked = true;
			} catch (error) {}
		});

		if (!clicked) {
			throw new Error('Can\'t click to all elements' + locator);
		}
	}

	/**
	 * Откладывает выполнение следюущего шага на заданное время
	 *
	 * @param {number} ms
	 */
	pause (ms) {
		this.page.pause(ms);
	}

	/** Подтвердить алерт */
	alertAccept () {
		this.page.alertAccept();
	}

	/**
	 * Получить текст алерта
	 *
	 * @returns {string}
	 */
	getAlertText () {
		return this.page.alertText();
	}

	/**
	 * Получить элемент контейнера
	 *
	 * @returns {Element}
	 */
	getContainerElement () {
		return this.page.element(this.locators.container);
	}

	/** Переключиться на ближайшую вкладку */
	switchToNextTab () {
		this.page.switchToNextTab();
	}
}

module.exports = PageObject;
