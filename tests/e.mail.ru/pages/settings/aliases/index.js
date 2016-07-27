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
			item: {
				container: id => `${container} .b-list__list .b-settings-aliases [data-id="${id}"]`
			},
			controls: {
				new: `${container} .js-create-alias`
			}
		};
	}

	/**
	 * Создать алиас
	 *
	 * @param {Object} params - данные алиаса
	 * @returns {string} - ID созданного алиаса
	 */
	createAlias (params = {}) {
		let {folder} = params;

		this.newAliasControl();

		this.layerAliasAdd.show();

		let id = this.layerAliasAdd.getAlias();

		this.layerAliasAdd.fillCaptcha();

		if (folder !== void 0) {
			this.layerAliasAdd.setDropdownValue('folder', folder);
		}

		this.layerAliasAdd.apply();

		this.waitAddSuccess(id);

		return id;
	}

	/**
	 * Ждём появление добавленного алиаса в списке
	 *
	 * @param {string} id - ID созданного алиаса
	 */
	waitAddSuccess (id) {
		let {item} = this.locators;

		this.page.waitForExist(item.container(id), 5000,
			'Не дождались появления добавленного алиаса');
	}

	newAliasControl () {
		this.page.click(this.locators.controls.new);
	}
}

module.exports = AliasPage;
