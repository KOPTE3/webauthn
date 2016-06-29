'use strict';

let PortalMenuSteps = require('../../steps/portal-menu');
let Advanced = require('../../pages/portal-menu/advanced');

let assert = require('assert');

/** Модуль для работы с представлением страницы поиска писем */
class AdvancedSteps extends PortalMenuSteps {
	constructor () {
		super();

		this.advanced = new Advanced();
	}

	/**
	 * Проверка видимости формы
	 */
	isVisible () {
		let visible = this.advanced.isVisible();

		assert(visible, 'Видимость расширенного поиска');
	}
}

module.exports = new AdvancedSteps();
