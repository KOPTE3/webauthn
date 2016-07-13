'use strict';

let assert = require('assert');

let PortalMenuSteps = require('../../steps/portal-menu');

let PortalSearch = require('../../pages/portal-menu/portal-search');
let Advanced = require('../../pages/portal-menu/advanced');
let Search = require('../../pages/search');

let PortalSearchStore = require('../../store/portal-menu/portal-search');

let actions = require('../../utils/actions');


/** Модуль для работы с представлением страницы поиска писем */
class PortalSearchSteps extends PortalMenuSteps {
	constructor () {
		super();

		this.portalSearch = new PortalSearch();
		this.advanced = new Advanced();
		this.search = new Search();
	}

	/**
	 * Поменять ответ АПИ
	 *
	 * @param {*[]} body - тело ответа
	 */
	mock (body = []) {
		actions.mockRPC('messages/search/requests', {
			status: '200',
			body
		});
	}

	/**
	 * Нажать на кнопку расширенного поиска
	 *
	 * @see this.portalSearch.toggleAdvanced
	 */
	toggleAdvanced () {
		let visible = this.advanced.isVisible();
		let actual = visible ?
			this.portalSearch.hideAdvanced() :
			this.portalSearch.showAdvanced();

		assert(actual, 'Расширенный поиск не переключился');
	}

	/**
	 * Кликнуть на лупу
	 */
	clickSearchButton () {
		this.portalSearch.clickSearchButton();

		let actual = this.search.wait();

		assert(actual, 'Не удалось дождаться открытия страницы поиска');
	}

	/**
	 * Кликнуть в поле поиска
	 */
	clickSearchField () {
		this.portalSearch.clickSearchField();

		this.isFocusInBlank();
	}

	/**
	 * Кликнуть куда-нибудь наружу поиска
	 */
	clickOutside () {
		this.portalSearch.clickBody();
	}

	/**
	 * Проверка наличия операнда
	 *
	 * @param {string} name - имя операнда
	 */
	hasOperand (name) {
		let actual = this.portalSearch.hasOperand(name);

		assert(actual, `Операнд ${name} не появился`);
	}

	/**
	 * Проверка отсутсвия операнда
	 *
	 * @param {string} name - имя операнда
	 */
	noOperand (name) {
		let actual = this.portalSearch.hasOperand(name, true);

		assert(actual, `Операнд ${name} не исчез`);
	}

	/**
	 * Проверить, что у операнда есть иконка
	 *
	 * @param {string} name - имя операнда (unread|flag|attach)
	 */
	operandHasIcon (name) {
		let actual = this.portalSearch.operandHasIcon(name);

		assert(actual, `У операнда ${name} нет иконки`);
	}

	/**
	 * Проверить, что у операнда есть крестик
	 *
	 * @param {string} name - имя операнда
	 */
	operandHasClose (name) {
		let actual = this.portalSearch.operandHasClose(name);

		assert(actual, `У операнда ${name} нет кнопки закрыть`);
	}

	/**
	 * Проверить текст операнда
	 *
	 * @param {string} name - имя операнда
	 * @param {string} text - текст
	 */
	checkOperandText (name, text) {
		let actual = this.portalSearch.getOperandText(name);

		assert(actual === text, `Текст операнда ${name} не равен "${text}"`);
	}

	/**
	 * Ввести текст в операнд.
	 * Операнд должен быть создан.
	 *
	 * @param {string} name - имя операнда
	 * @param {string} value - что печатать
	 */
	setOperandText (name, value = '') {
		this.portalSearch.setOperandText(name, value);
	}

	checkDateOperandLapse (text) {
		let actual = this.portalSearch.getOperandDateLapse();

		assert(actual === text, `Текст разброса даты не равен ${text}`);
	}

	/**
	 * Кликнуть в операнд
	 *
	 * @param {string} name - имя операнда
	 */
	clickOperand (name) {
		this.portalSearch.clickOperand(name);

		let actual = this.portalSearch.isOperandActive(name);

		if (PortalSearchStore.flagOperands.indexOf(name) > -1) {
			// Операнд-флаг не должен кликаться,
			assert(!actual, `По клику операнд ${name} активен`);
		} else {
			// а обычный операнд должен кликаться
			assert(actual, `По клику операнд ${name} не активен`);
		}
	}

	/**
	 * Нажать на крестик в операнде
	 *
	 * @param {string} name - имя операнда
	 */
	clickOperandClose (name) {
		this.portalSearch.clickOperandClose(name);

		let actual = this.portalSearch.hasOperand(name, true);

		assert(actual, `Операнд ${name} не удалился`);
	}

	/**
	 * Удалить все операнды
	 */
	removeAllOperands () {
		this.portalSearch.removeAllOperands();
	}

	/**
	 * Фокус находится в операнде
	 *
	 * @param {string} name - имя операнда
	 */
	operandHasFocus (name) {
		let actual = this.portalSearch.operandHasFocus(name);

		assert(actual, `Фокус не находится в операнде ${name}`);
	}

	/**
	 * Фокус находится в пустом операнде
	 */
	isFocusInBlank () {
		this.operandHasFocus('blank');
	}

	/**
	 * Проверка, что инпут операнда нередактируемый
	 *
	 * @param {string} name - имя операнда
	 */
	isOperandInputReadonly (name) {
		let actual = this.portalSearch.getOperandInputReadonly(name);

		assert(!!actual, `Операнд ${name} редактируемый`);
	}

	/**
	 * Саджесты показаны
	 */
	hasSuggests () {
		let actual = this.portalSearch.hasSuggests();

		assert(actual, 'Саджесты не показались');
	}

	/**
	 * Саджесты не показаны
	 */
	noSuggests () {
		let actual = this.portalSearch.hasSuggests(true);

		assert(actual, 'Саджесты не показались');
	}

	/**
	 * Проверить, что тип саджестов - сохраненные запросы
	 */
	isRequestsSuggest () {
		let actual = this.portalSearch.getSuggestsTitle();

		assert(actual === 'ВЫ НЕДАВНО ИСКАЛИ',
			`Вместо сохраненных запросов показаны саджесты "${actual}"`);
	}

	/**
	 * Проверить, что тип саджестов - люди
	 */
	isPeopleSuggest () {
		let actual = this.portalSearch.getSuggestsTitle();

		assert(actual === 'ЛЮДИ', `Вместо саджестов с людьми показаны саджесты "${actual}"`);
	}

	/**
	 * Проверить, что тип саджестов - в письме
	 */
	isQuerySuggest () {
		let actual = this.portalSearch.getSuggestsTitle();

		assert(actual === 'В ПИСЬМЕ', `Вместо саджестов "В письме" показаны саджесты "${actual}"`);
	}

	/**
	 * Проверить текст выбранного пункта в саджестах
	 *
	 * @param {string} text
	 */
	checkSelectedSuggestText (text) {
		let actual = this.portalSearch.getSelectedSuggestText();

		assert(actual === text, `В саджестах выбран "${actual}" вместо "${text}"`);
	}

	/**
	 * Выбрать стрелкой вниз саджест с заданным текстом
	 *
	 * @param {string} text
	 * @param {string} operandName - операнд, для которого показаны саджесты
	 */
	selectSuggestByArrowDown (text, operandName = 'blank') {
		let counter = 0;
		let done = false;
		let currentText;

		while (counter++ < 10) {
			currentText = this.portalSearch.getSelectedSuggestText();

			if (currentText === text) {
				done = true;
				break;
			}

			this.portalSearch.operandArrowKey(operandName, 'Down');
		}

		assert(done, `Не удалось выбрать пункт ${text} в саджестах`);
	}

	/**
	 * Нажать на расширенный поиск в саджестах сохраненных запросов
	 */
	clickRequestsSuggestsAdvanced () {
		this.portalSearch.clickRequestsSuggestsAdvanced();
	}

	/**
	 * Выполнить простой поиск "в письме"
	 * @param {string} query - текст запроса
	 */
	simpleSearch (query = 'test') {
		this.removeAllOperands();
		this.clickSearchField();
		this.setOperandText('blank', query);
		this.clickSearchButton();
	}

	/**
	 * Если нужно добавить операнд, неважно какой
	 * Будет создан операнд 'message'
	 */
	addAnyOperand () {
		this.clickSearchField();
		this.setOperandText('blank', PortalSearchStore.anyOperandText);
		this.clickOutside();
		this.hasOperand('message');
	}
}

module.exports = PortalSearchSteps;
