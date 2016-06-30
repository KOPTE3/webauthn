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
	 */
	open (query = {}) {
		if (features.length) {
			query.ftrs = features.join(' ');
			features = [];
		}

		let url = URL.request(this.location, query);

		this.page.url(url);
		this.wait();
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
	 */
	wait () {
		this.page.waitForExist(this.locators.container);
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
	static auth (type) {
		let { account } = new Store();

		browser.url('/login');

		let login = account.get('login');

		try {
			let cookie = account.get('cookies');

			if (!cookie.length) {
				throw new Error();
			}

			browser.setCookies(cookie);
		} catch (error) {
			throw new Error('Could not found cookie to continue');
		}

		console.log(`Used ${login} account`);

		/*
		return browser.execute(function () {
			return window.patron.username;
		});
		*/
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