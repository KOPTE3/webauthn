'use strict';

let ComposeSteps = require('../../steps/compose');
let Compose2Page = require('../../pages/compose2');

/** Модуль для работы с шагами страницы написания письма */
class Compose2Steps extends ComposeSteps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new Compose2Page();
	}
}

module.exports = Compose2Steps;
