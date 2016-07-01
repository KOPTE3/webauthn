'use strict';

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
		return locators[operandName] + ' ' + locators[element];
	}
}

module.exports = PortalSearch;
