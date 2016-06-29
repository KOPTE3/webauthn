'use strict';

let Store = require('../store');
let URL = require('../utils/url');
let merge = require('deepmerge');

let features = [];

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
	 * Открытие страницы
	 *
	 * @param {Object} [query] — параметры запроса
	 * @returns {boolean}
	 */
	open (query = {}) {
		if (features.length) {
			query.ftrs = features.join(' ');
			features = [];
		}

		let url = URL.request(this.location, query);

		this.page.url(url);

		return this.wait();
	}

	/**
	 * Расширяет объект
	 *
	 * @param {Object} object
	 * @returns {Object}
	 */
	extend (object) {
		return merge(...arguments);
	}

	/**
	 * Дождаться появления требуемого элемента
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container);
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
	 * Авторизация
	 *
	 * @param {string} type — типа авторизации
	 * @returns {boolean}
	 */
	static auth (type) {
		let { account } = new Store();

		browser.url('/login');

		let login = account.get('login');
		let cookie = account.get('cookies');

		browser.setCookies(cookie);
		console.log(`Used ${login} account`);

		return browser.execute(function () {
			return window.patron.username;
		});
	}

	/**
	 * Включение фичи
	 *
	 * @param {string} name — типа авторизации
	 */
	addFeature (name) {
		features.push(name);
	}
}

module.exports = PageObject;
