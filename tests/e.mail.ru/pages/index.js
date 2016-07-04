'use strict';

let Store = require('../store');
let URL = require('../utils/url');
let merge = require('deepmerge');

let cache = {
	user    : null,
	features: []
};

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
	 * Проверяет залогинен ли пользователь
	 *
	 * @param {string} email
	 * @return {boolean}
	 */
	isActiveUser (email) {
		return browser.waitUntil(function async () {
			return browser.executeAsync(function (user, resolve) {
				if (window.__PH) {
					if (window.__PH.activeUser() === user) {
						resolve(true);
					}
				}
			}, email);
		});
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

		if (user) {
			return this.isActiveUser(user);
		}

		return true;
	}

	/**
	 * Авторизация
	 *
	 * @param {string} type — типа авторизации
	 */
	static auth (type = 'basic') {
		this.page.store.session({ type });

		let { account } = this.page.store;

		cache.user = account.get('email');

		browser.url('/login');

		try {
			let cookie = account.get('cookie');

			if (!cookie.length) {
				throw new Error();
			}

			browser.setCookies(cookie);
		} catch (error) {
			throw new Error('Could not found cookie to continue');
		}

		console.log(`Used ${cache.user} account`);
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
	 * Включение фичи
	 *
	 * @param {Array} list — список фич, которые требуется включить
	 */
	features (list) {
		cache.features.push(...list);
	}
}

module.exports = PageObject;
