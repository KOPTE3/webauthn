'use strict';

let Store = require('../store');
let URL = require('../utils/url');

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
	open (path, query) {
		let url = URL.request(...arguments);

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

		cookie.forEach(value => {
			browser.setCookie(value);
		});

		console.log(`Used ${login} account`);
	}

	/**
	 * Включение фичи
	 *
	 * @param {string} name — имя фичи
	 * @param {boolean} state — статус фичи (true - включенна)
	 */
	toggleFeature (name, state) {
		this.page.execute(function (fName, fState) {
			var feature = {};
			
			feature[fName] = {state: fState};
			require('features').extend(feature);
		}, name, state);
	}

}

module.exports = PageObject;
