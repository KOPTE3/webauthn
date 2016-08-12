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

	get LayerFolderEdit () {
		return this.layerFolderEdit;
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
			icons: {
				container: '.ico_folder',
				user: '.ico_folder_user',
				secret: '.ico_folder_secret',
				secretOpen: '.ico_folder_secret_open'
			},
			itemWithParam: '.b-folders__item-col_title',
			controls: {
				new: '[data-name="newFolder"]',
				edit: '[data-name="edit"][data-id]',
				remove: '[data-name="remove"][data-id]'
			},
			notify: {
				container: '.notify',
				ok: '.notify-message__title__text_ok',
				error: '.notify-message__title__text_error'
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
		this.openEditLayer(params.id);
		this.fillEditLayer(params);
		this.submitEditLayer();
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

	openEditLayer (id) {
		this.editFolderControl(id);
		this.layerFolderEdit.show();
	}

	fillEditLayer (params) {
		let {name, parent, secret, userPassword} = params;

		if (name !== void 0) {
			this.layerFolderEdit.setFieldValue('name', name);
		}

		if (parent !== void 0) {
			this.layerFolderEdit.setDropdownValue('parent', parent);
		}

		if (secret !== void 0) {
			this.layerFolderEdit.setCheckboxValue('secret', secret);
		}

		if (userPassword !== void 0) {
			this.layerFolderEdit.setFieldValue('userPassword', userPassword);
		}
	}

	submitEditLayer () {
		this.layerFolderEdit.apply();
	}

	getFolderElement (id) {
		const item = this.locators.itemWithParam.replace('.', '');
		const xpath = `//*[contains(@class, "${item}")][@data-id="${id}"]/..`;

		return this.page.element(xpath);
	}

	getFolderIcon (id, type) {
		const element = this.getFolderElement(id);

		return element.element(this.locators.icons[type]);
	}

	getNotify (type) {
		let notify = this.locators.notify;
		let locator = `${notify.container}`;

		if (notify[type]) {
			locator += ` ${notify[type]}`;
		}

		this.page.waitForVisible(locator);

		return this.page.element(locator);
	}
}

module.exports = FoldersPage;
