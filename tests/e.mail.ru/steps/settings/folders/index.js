'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let SettingsFoldersPage = require('../../../pages/settings/folders');
let authStore = require('../../../store/authorization');

class Folders extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SettingsFoldersPage();
	}

	/**
	 * Создать папку
	 *
	 * @param {Object} params - данные папки
	 * @returns {string} - ID созданной папки
	 */
	static createFolder (params) {
		let folderId = this.page.createFolder(params);

		assert(folderId, 'createFolder должен вернуть folderId');

		return folderId;
	}

	/**
	 * Редактировать папку
	 *
	 * @param {Object} params - данные папки
	 */
	static editFolder (params) {
		this.page.editFolder(params);
	}

	/**
	 * Удалить папку
	 *
	 * @param {string} folderId - ID папки
	 */
	static removeFolder (folderId) {
		this.page.removeFolder(folderId);
	}

	/**
	 * Открыть попап редактирования папки
	 *
	 * @param {string} id - folderId
	 */
	static openEditLayer (id) {
		this.page.openEditLayer(id);
	}

	/**
	 * Сохранить изменения в попапе редактирования
	 */
	static submitEditLayer () {
		this.page.submitEditLayer();

		assert(!this.page.layerFolderEdit.isVisible(), 'Попап не скрылся');
	}

	/**
	 * Заполнить попап редактирования
	 * Проверить, что приизменения поля secret меняется вид
	 *
	 * @param {Object} params
	 */
	static fillEditLayer (params) {
		if (params.userPassword) {
			params.userPassword = authStore.account.get('password');
		}

		this.page.fillEditLayer(params);
		this.checkEditLayerField('secret', params.secret);
		this.checkEditLayerField('userPassword', params.userPassword);
	}

	/**
	 * Проверка поля в попапе редактирования
	 *
	 * @param {Object} field
	 */
	static checkEditLayerField (field) {
		const {name, value} = field;
		const fields = this.page.layerFolderEdit.getFields();

		if (name === 'secret' && value === false) {
			const hidden = ['folderPassword', 'folderRepassword', 'question', 'answer'];
			const visible = ['userPassword'];

			hidden.forEach(name => {
				assert(!fields[name].isVisible(), `Поле ${name} не скрыто`);
			});

			visible.forEach(name => {
				assert(fields[name].isVisible(), `Поле ${name} скрыто`);
			});
		} else if (name === 'userPassword' && value) {
			assert(fields[name].isVisbile(), `Поле ${name} скрыто`);
		}
	}

	/**
	 * Проверяет наличие у папки иконки
	 *
	 * @param {number} id - folderId
	 * @param {string} type - user | secret | secretOpen
	 */
	static checkFolderIcon (id, type) {
		const element = this.page.getFolderIcon(id, type);

		assert(element.isVisible(), `Иконка не ${type}`);
	}

	/**
	 * Ожидает появление нотивая с таким типом и текстом
	 *
	 * @param {string} type - 'ok'
	 * @param {string} text - текст в попапе
	 */
	static waitForNotify (type, text) {
		const element = this.page.getNotify(type);

		assert(element.isVisible(), 'Нотифай не показался');
		assert.equal(element.getText(), text, 'Текст не совпал');
	}
}

module.exports = Folders;
