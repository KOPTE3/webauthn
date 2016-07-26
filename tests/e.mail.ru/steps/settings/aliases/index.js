'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let SettingsAliasesPage = require('../../../pages/settings/aliases');

class Aliases extends Steps {

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
	 * @returns {string} - ID созданного алиаса
	 */
	static createAlias (params) {
		let aliasId = this.page.createAlias(params);

		assert(aliasId, 'createAlias должен вернуть aliasId');

		return aliasId;
	}
}

module.exports = Aliases;
