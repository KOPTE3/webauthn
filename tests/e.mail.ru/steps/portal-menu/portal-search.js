'use strict';

let PortalMenuSteps = require('../../steps/portal-menu');
let PortalSearch = require('../../pages/portal-menu/portal-search');
let Advanced = require('../../pages/portal-menu/advanced');

let assert = require('assert');

/** Модуль для работы с представлением страницы поиска писем */
class PortalSearchSteps extends PortalMenuSteps {
	constructor () {
		super();

		this.portalSearch = new PortalSearch();
		this.advanced = new Advanced();
	}

	/**
	 * Нажать на кнопку расширенного поиска
	 *
	 * @see this.portalSearch.toggleAdvanced
	 */
	toggleAdvanced () {
		let visible = this.advanced.isVisible();
		let result = visible ? this.portalSearch.hideAdvanced() : this.portalSearch.showAdvanced();

		assert(result, 'toggle advanced search');
	}

	/**
	 * Проверка наличия операнда
	 *
	 * @param {string} name - имя операнда
	 */
	hasOperand (name) {
		let hasOperand = this.portalSearch.hasOperand(name);

		assert(hasOperand, `операнд ${name} не появился`);
	}

	/**
	 * Проверить, что у операнда есть иконка
	 *
	 * @param {string} name - имя операнда (unread|flag|attach)
	 */
	operandHasIcon (name) {
		let hasIcon = this.portalSearch.operandHasIcon(name);

		assert(hasIcon, `у операнда ${name} нет иконки`);
	}

	/**
	 * Проверить, что у операнда есть крестик
	 *
	 * @param {string} name - имя операнда
	 */
	operandHasClose (name) {
		let hasClose = this.portalSearch.operandHasClose(name);

		assert(hasClose, `у операнда ${name} нет кнопки закрыть`);
	}
}

module.exports = new PortalSearchSteps();
