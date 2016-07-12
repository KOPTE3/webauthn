'use strict';

let PageObject = require('../../../pages');
let LayerFolderAdd = require('../../../steps/layers/folderAdd');
let LayerFolderEdit = require('../../../steps/layers/folderEdit');

class FoldersPage extends PageObject {
	constructor () {
		super();

		this.layerFolderAdd = new LayerFolderAdd();
		this.layerFolderEdit = new LayerFolderEdit();
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
			itemWithParam: '.b-folders__item-col_title',
			controls: {
				new: '[data-name="newFolder"]',
				edit: '[data-name="edit"][data-id]'
			}
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

		this.newFolderControl();

		this.layerFolderAdd.show();
		this.layerFolderAdd.setFieldValue('name', name);
		this.layerFolderAdd.setDropdownValue('parent', parent);
		this.layerFolderAdd.apply();

		return this.waitAddSuccess(params);
	}

	/**
	 * Редактировать папку
	 *
	 * @param {Object} params - данные папки
	 */
	editFolder (params) {
		let {id, name, parent} = params;

		this.editFolderControl(id);

		this.layerFolderEdit.show();

		if (name !== void 0) {
			this.layerFolderEdit.setFieldValue('name', name);
		}

		if (parent !== void 0) {
			this.layerFolderEdit.setDropdownValue('parent', parent);
		}

		this.layerFolderEdit.apply();

		return this.waitEditSuccess(params);
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

	waitEditSuccess (params) {
		let {id, parent, name} = params;
		let {container, item} = this.locators;
		let locator = `${container} ${item} [data-id="${id}"]`;

		if (parent !== void 0) {
			locator = `${locator}[data-parent="${parent}"]`;
		}

		if (name === void 0) {
			this.page.waitForExist(locator);
		} else {
			this.page.waitUntil(() => {
				return this.page.elements(locator).value.find(item => {
					let elementId = item.ELEMENT;

					return this.page.elementIdText(elementId).value === name;
				});
			});
		}
	}

	newFolderControl () {
		this.page.click(this.locators.controls.new);
	}

	editFolderControl (folderId) {

		let {container} = this.locators;
		let {edit} = this.locators.controls;

		this.page.click(`${container} ${edit}[data-id="${folderId}"]`);
	}
}

module.exports = FoldersPage;
