'use strict';

let portalSearchStore = require('../../store/portal-menu/portal-search');

/** Утилиты для работы с поиском в синей шапке */
module.exports = {
	/**
	 * Собрать локатор для элемента в операнде
	 *
	 * @param {Object} locators - локаторы операндов
	 * @param {string} operandName - имя операнда
	 * @param {string} element - имя элемента
	 * @returns {string}
	 */
	getOperandLocator (locators, operandName, element) {
		return `${locators[operandName]} ${locators[element]}`;
	},

	/**
	 * Собрать локатор для инпута в операнде
	 *
	 * @param {Object} locators - локаторы операндов
	 * @param {string} operandName - имя операнда
	 * @return {string}
	 */
	getOperandInputLocator (locators, operandName) {
		let inputName = operandName === 'date' ? 'dateInput' : 'input';

		return this.getOperandLocator(locators, operandName, inputName);
	},

	/**
	 * Получить имя локатора операнда из значения атрибута операнда
	 *
	 * @param {string} attrName - значение из атрибута
	 * @returns {string}
	 */
	getOperandName (attrName) {
		return portalSearchStore.fieldNames[attrName];
	}
};
