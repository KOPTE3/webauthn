'use strict';

let PageObject = require('../../../pages');
let LayerFolderAdd = require('../../../steps/layers/folder/add');
let LayerFolderEdit = require('../../../steps/layers/folder/edit');
let LayerFolderRemove = require('../../../steps/layers/folder/remove');

class FoldersPage extends PageObject {
	constructor () {
		super();

		this.layerFolderAdd = new LayerFolderAdd();
		this.layerFolderEdit = new LayerFolderEdit();
		this.layerFolderRemove = new LayerFolderRemove();
	}

	/**
	 * Сколько ждать методу wait
	 *
	 * @returns {number}
	 */
	get waitTime () {
		return 3000;
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
				edit: '[data-name="edit"][data-id]',
				remove: '[data-name="remove"][data-id]'
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

		this.waitEditSuccess(params);
	}

	/**
	 * Удалить папку
	 *
	 * @param {string} folderId - ID папки
	 */
	removeFolder (folderId) {
		this.removeFolderControl(folderId);

		this.layerFolderRemove.show();
		this.layerFolderRemove.apply();

		this.waitRemoveSuccess(folderId);
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
		}, 3000, 'Не дождались появления добавленной папки');

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
			}, 3000, 'Не дождались появления отредактированной папки');
		}
	}

	waitRemoveSuccess (folderId) {
		let {container, item} = this.locators;
		let locator = `${container} ${item} [data-id="${folderId}"]`;

		this.page.waitUntil(() => {
			return !this.page.isExisting(locator);
		}, 3000, 'Не дождались удаления папки');
	}

	newFolderControl () {
		this.page.click(this.locators.controls.new);
	}

	editFolderControl (folderId) {
		let {container, controls} = this.locators;
		let locator = `${container} ${controls.edit}[data-id="${folderId}"]`;
		let control = this.page.element(locator);
		let elementId = control.value.ELEMENT;

		this.page.moveTo(elementId);
		this.page.elementIdClick(elementId);
	}

	removeFolderControl (folderId) {
		let {container, controls} = this.locators;
		let locator = `${container} ${controls.remove}[data-id="${folderId}"]`;
		let control = this.page.element(locator);
		let elementId = control.value.ELEMENT;

		this.page.moveTo(elementId);
		this.page.elementIdClick(elementId);
	}
}

module.exports = FoldersPage;
