'use strict';

let assert = require('assert');

let PortalMenuSteps = require('../../steps/portal-menu');

let PortalSearch = require('../../pages/portal-menu/portal-search');
let Advanced = require('../../pages/portal-menu/advanced');
let Search = require('../../pages/search');

let PortalSearchStore = require('../../store/portal-menu/portal-search');

let actions = require('../../utils/actions');

const constants = require('../../utils/constants');

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
	 * Проверить порядок операндов
	 *
	 * @param {string[]} names - массив с именами операндов
	 */
	checkOperandsOrder (names) {
		let actual = this.portalSearch.getAllOperandsNames();

		actual = actual.filter(name => name !== 'blank');

		assert.deepEqual(actual, names, `Порядок операндов не соответствует ${names}`);
	}

	/**
	 * Проверить, что при открытии расширенного поиска
	 * не дергаются операнды
	 */
	checkScrollOnToggleAdvanced () {
		let scrolled = false;
		let toggled = false;

		try {
			browser.waitUntil(() => {
				if (!toggled) {
					toggled = true;
					this.portalSearch.toggleAdvanced();
				}

				if (this.portalSearch.getFieldScroll() > 0) {
					scrolled = true;

					return true;
				}
			}, 1000, '', 50);
		} catch (error) {
			// В данном случае exception в waitUntil - ожидаемое поведение
		}

		assert(!scrolled, `При открытии расширенного поиска дергаются операнды`);
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

	/**
	 * Нажать в операнде на enter
	 *
	 * @param {string} name - имя операнда
	 */
	setOperandEnter (name) {
		this.portalSearch.operandKeys(name, constants.UNICODE_CHARACTERS.Enter);

		this.search.wait();
	}

	checkDateOperandLapse (text) {
		let actual = this.portalSearch.getOperandDateLapse();

		assert(actual === text, `Текст разброса даты не равен ${text}`);
	}

	/**
	 * Проверить, что когда появился новый операнд,
	 * старый операнд скрылся (не должно быть одновременно два операнда)
	 *
	 * @param {string} newName - имя нового операнда
	 * @param {string} oldName - имя старого операнда
	 */
	checkOperandSwitch (newName, oldName) {
		this.portalSearch.hasOperand(newName);
		let actual = !this.portalSearch.hasOperandImmediate(oldName);

		assert(actual, `В момент появления ${newName} операнд ${oldName} еще виден`);
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
	 * Нажать на дропдаун в операнде
	 *
	 * @param {string} name - имя операнда
	 */
	clickOperandDropdown (name) {
		this.portalSearch.clickOperandDropdown(name);
	}

	/**
	 * Нажать на элемент дропдауна в операнде
	 *
	 * @param {string} name - имя операнда
	 * @param {string} item - пункт меню дродпауна (message|subject|from|to)
	 */
	clickOperandDropdownItem (name, item) {
		this.portalSearch.clickOperandDropdownItem(name, item);
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
	 * Операнд свернут
	 *
	 * @param {string} name - имя операнда
	 */
	operandNotActive (name) {
		let actual = this.portalSearch.isOperandActive(name);

		assert(!actual, `Операнд ${name} активен`);
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
	 * Видно начало длинного текста в операнде
	 *
	 * @param {string} name - имя операнда
	 */
	isOperandTextStartVisible (name) {
		let actual = this.portalSearch.getOperandInputScroll(name);

		assert(actual === 0, `Начало текста операнда ${name} не видно`);
	}

	/**
	 * Курсор стоит в конце текста операнда
	 *
	 * @param {string} name - имя операнда
	 */
	isOperandCursorAtEnd (name) {
		let actual = this.portalSearch.getOperandInputSelection(name);
		let text = this.portalSearch.getOperandText(name);

		assert(actual.start === text.length, `Курсор не в конце текста операнда ${name}`);
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
	 * У саджестов емейлов текст состоит из двух строчек с \n
	 *
	 * @param {string} text
	 */
	selectSuggestByArrowDown (text) {
		const downKey = constants.UNICODE_CHARACTERS.Down;
		let counter = 0;
		let done = false;
		let currentText;
		let operandName;

		while (counter++ < 10) {
			currentText = this.portalSearch.getSelectedSuggestText();

			if (currentText === text) {
				done = true;
				break;
			}

			operandName = this.portalSearch.getActiveOperandName();

			this.portalSearch.operandKeys(operandName, downKey);
		}

		assert(done, `Не удалось выбрать пункт ${text} в саджестах`);
	}

	/**
	 * Кликнуть на саджест с заданным текстом
	 *
	 * @param {string} text
	 */
	clickSuggest (text) {
		let actual = this.portalSearch.clickSuggest(text);

		assert(actual, `Не удалось кликнуть по саджесту ${text}`);

		this.search.wait();
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
