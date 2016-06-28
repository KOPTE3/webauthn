'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let ComposePage = require('../../pages/compose');

/** Модуль для работы с шагами страницы написания письма */
class ComposeSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new ComposePage();
	}
}

module.exports = ComposeSteps;
