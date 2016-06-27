'use strict';

let Store = require('../store');
let URL = require('../utils/url');

let features = [];

/** @namespace browser */
class PageObject {
	constructor () {
		this.store = new Store();
	}

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
	 * @param {string} path — метод запроса
	 * @param {Object} [query] — параметры запроса
	 */
	open (path, query = {}) {
		if (features.length) {
			query.ftrs = features.join(' ');
			features = [];
		}

		let url = URL.request(path, query);

		this.page.url(url);
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
	 */
	auth (type) {
		let { account } = this.store;

		this.page.url('/login');

		let login = account.get('login');
		let cookie = account.get('cookies');

		this.page.setCookies(cookie);
		console.log(`Used ${login} account`);
	}

	addFeature (name) {
		features.push(name);
	}

}

module.exports = PageObject;
