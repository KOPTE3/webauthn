'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let SettingsAliasesPage = require('../../../pages/settings/aliases');

class Aliases extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SettingsAliasesPage();
	}

	/**
	 * Создать алиас
	 *
	 * @param {Object} params - данные алиаса
	 * @returns {string} - ID созданной папки
	 */
	static createAlias (params) {
		let folderId = this.page.createAlias(params);

		assert(folderId, 'createFolder должен вернуть folderId');

		return folderId;
	}
}

module.exports = Aliases;
