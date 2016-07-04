'use strict';

let PortalSearchStore = require('../../store/portal-menu/portal-search');

/** Утилиты для работы с поиском в синей шапке */
class PortalSearch {
	/**
	 * Собрать локатор для элемента в операнде
	 *
	 * @param {object} locators - локаторы операндов
	 * @param {string} operandName - имя операнда
	 * @param {string} element - имя элемента
	 * @return {string}
	 */
	static getOperandLocator (locators, operandName, element) {
		return `${locators[operandName]} ${locators[element]}`;
	}

	/**
	 * Получить имя локатора операнда из значения атрибута операнда
	 *
	 * @param {string} attrName - значение из атрибута
	 * @return {string}
	 */
	static getOperandName (attrName) {
		let map = PortalSearchStore.fieldNames;

		return map[attrName];
	}
}

module.exports = PortalSearch;
