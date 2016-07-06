'use strict';

let URL = require('../utils/url');
let Support = require('../utils/support');

let cache = {
	session : false,
	features: []
};

let support = new Support();

/** @namespace browser */
class PageObject {
	constructor () { }

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
		if (!path) {
			path = this.location;
		}

		if (typeof path === 'object') {
			query = path;
			path = null;
		}

		let { user, features } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
			cache.features = [];
		}

		let url = URL.request(path, query);

		this.page.url(url);
		this.wait();

		if (cache.session) {
			return support.isActiveUser();
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
		cache.session = support.session(...arguments);
	}

	/**
	 * Обновить страницу
	 *
	 */
	refresh () {
		this.open(this.page.getUrl());
	}

	/**
	 * Расширяет объект
	 *
	 * @param {Object} object
	 * @returns {Object}
	 */
	extend (object) {
		return support.extend(...arguments);
	}

	/**
	 * Метод пробует кликнуть по элементу несколько раз (осторожно костыль)
	 *
	 * @param {string} locator - локатор элемента
	 * @param {number} count - количество попыток (по умолчанию 10)
	 * @param {number} interval - интервал в ms, через который делать
	 * 							  попыкти (по умолчанию 500ms)
	 *
	 * @returns {boolean}
	 * */
	clickWithRetry (locator, count = 3, interval = 500) {
		let page = this.page;

		let tryClick = () => {
			try {
				page.waitForExist(locator);

				if (!page.isVisible(locator)) {
					page.scroll(locator);
				}

				let links = page.elements(locator);

				page.elementIdClick(links.value[0].ELEMENT);

				return true;
			} catch (error) {
				browser.pause(interval);

				return false;
			}
		};

		for (let attempt = 0; i < count; attempt++) {
			if (tryClick()) {
				return true;
			}
		}

		throw new Error('Can\'t click to element ' + locator);
	};
}

module.exports = PageObject;
