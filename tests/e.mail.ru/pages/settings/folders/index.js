'use strict';

let PageObject = require('../../../pages');
let ControlsPage = require('./controls');
let FieldsPage = require('./fields');
let DropdownsPage = require('./dropdowns');
let LayerFolderAdd = require('../../../steps/layers/folderAdd');

class FoldersPage extends PageObject {
	constructor () {
		super();

		this.controlsPage = new ControlsPage();
		this.fieldsPage = new FieldsPage();
		this.dropdownsPage = new DropdownsPage();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings/folders';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-folders',
			item: '.b-folders__item',
			itemWithParam: '.b-folders__item-col_title'
		};
	}

	/**
	 * Создать папку
	 *
	 * @param {Object} params - данные папки
	 * @returns {string} - ID созданной папки
	 */
	createFolder (params) {
		let {name, parent} = params;

		this.controlsPage.newFolder();
		LayerFolderAdd.show();
		this.fieldsPage.setFieldValue('name', name);
		this.dropdownsPage.setDropdownValue('parent', parent);
		LayerFolderAdd.apply();

		return this.waitAddSuccess(params);
	}

	waitAddSuccess (params) {
		let {parent, name} = params;
		let {container, item} = this.locators;
		let locator = `${container} ${item} [data-parent="${parent}"]`;
		let folderId;

		this.page.waitUntil(() => {
			return this.page.elements(locator).value.find(item => {
				let elementId = item.ELEMENT;
				let result = this.page.elementIdText(elementId).value === name;

				if (result) {
					folderId = this.page.elementIdAttribute(elementId, 'data-id').value;
				}

				return result;
			});
		});

		return folderId;
	}
}

module.exports = FoldersPage;
