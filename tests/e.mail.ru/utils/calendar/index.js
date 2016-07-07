'use strict';

let PortalSearch = require('../../pages/portal-menu/portal-search');
let Advanced = require('../../pages/portal-menu/advanced');

let CalendarSteps = require('../../steps/calendar');

/** Модуль для работы с календарем */
class CalendarFactory {
	/**
	 * Создать экземпляр CalendarSteps
	 *
	 * @param {string} name - (advanced|operands) имя контейнера,
	 * в котором находится календарь
	 *
	 * @returns {CalendarSteps}
	 */
	static create (name) {
		let parent = this.getParent(name);

		return new CalendarSteps(parent);
	}

	/**
	 * Получить локатор контейнера, в который помещен календарь
	 *
	 * @param {string} name - (advanced|operands)
	 * @returns {string}
	 */
	static getParent (name) {
		let parent = 'body';

		switch (name) {
			case 'advanced':
				parent = new Advanced().locators.container;
				break;
			case 'operands':
				parent = new PortalSearch().locators.operands.date;
				break;
			default:
				break;
		}

		return parent;
	}
}

module.exports = CalendarFactory;
