'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let FoldersPage = require('../../pages/folders');

/** Модуль для работы с шагами списка папкок */
class FoldersSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new FoldersPage();
	}
}

module.exports = FoldersSteps;
