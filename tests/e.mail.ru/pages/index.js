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
	 * Дождаться появления требуемого элемента
	 */
	wait () {
		this.page.waitForExist(this.locators.container);
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
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query = {}) {
		let { user, features } = cache;

		if (features.length) {
			query.ftrs = features.join(' ');
			cache.features = [];
		}

		let url = URL.request(this.location, query);

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
			} catch (error) {
				if (count-- === 0) {
					console.log(locator);
					throw error;
				}

				console.log(count);
				browser.pause(interval);
				tryClick();
			}
		};

		tryClick();
	};
}

module.exports = PageObject;
