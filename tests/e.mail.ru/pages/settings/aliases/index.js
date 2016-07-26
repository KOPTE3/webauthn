'use strict';

let PageObject = require('../../../pages');
let LayerAliasAdd = require('../../../steps/layers/alias/add');

class AliasPage extends PageObject {
	constructor () {
		super();

		this.layerAliasAdd = new LayerAliasAdd();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings/aliases';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#aliases';

		return {
			container,
			item: `${container} .b-list__list .b-settings-aliases`,
			controls: {
				new: `${container} .js-create-alias`
			}
		};
	}

	/**
	 * Создать алиас
	 *
	 * @param {Object} params - данные алиаса
	 * @returns {string} - ID созданной папки
	 */
	createAlias (params) {
		this.newAliasControl();

		this.layerAliasAdd.show();

		let id = this.layerAliasAdd.getAlias();

		this.layerAliasAdd.fillCaptcha();
		this.layerAliasAdd.apply();

		this.waitAddSuccess(id);

		return id;
	}

	waitAddSuccess (id) {
		let {item} = this.locators;
		let locator = `${item} [data-id="${id}"]`;

		this.page.waitForExist(locator, 5000, 'Не дождались появления добавленного алиаса');
	}

	newAliasControl () {
		this.page.click(this.locators.controls.new);
	}
}

module.exports = AliasPage;
