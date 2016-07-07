'use strict';

let PortalMenu = require('../portal-menu');

/** Модуль для работы с расширенным поиском */
class Advanced extends PortalMenu {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#popup_advanced-search';

		return this.extend(super.locators, {
			container,
			form: `${container} form`,
			checkboxes: {
				unread:	 `${container} [name="q_read"]`,
				flag:	 `${container} [name="q_flag"]`,
				attach:	 `${container} [name="q_attach"]`
			},
			textFields: {
				'from':		 `${container} [name="q_from"]`,
				'to':		 `${container} [name="q_to"]`,
				'subject':	 `${container} [name="q_subj"]`,
				'message':	 `${container} [name="q_query"]`
			},
			suggests: {
				'from':		 '.b-dropdown__list_suggest[data-original-name="q_from"]',
				'to':		 '.b-dropdown__list_suggest[data-original-name="q_to"]',
				'subject':	 `${container} [name="q_subj"]+.js-suggest`,
				'message':	 `${container} [name="q_query"]+.js-suggest`
			},
			date: {
				select: `${container} [name="q_date_lapse"]`,
				selectText: `${container} .form__select__box__text`,
				input: `${container} [name="q_date"]`
			}
		});
	}

	/**
	 * Видимость формы
	 *
	 * @returns {boolean}
	 */
	isVisible () {
		return this.page.isVisible(this.locators.form);
	}

	/**
	 * Кликнуть в текстовое поле
	 *
	 * @param {string} name - имя поля
	 */
	clickField (name) {
		this.page.click(this.locators.textFields[name]);
	}

	/**
	 * Кликнуть в чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 */
	clickCheckbox (name) {
		this.page.click(this.locators.checkboxes[name]);
	}

	/**
	 * Кликнуть в селект выбора разброса даты
	 */
	clickDateSelect () {
		this.page.click(this.locators.date.select);
	}

	/**
	 * Кликнуть в поле даты
	 */
	clickDateField () {
		this.page.click(this.locators.date.input);
	}

	/**
	 * Выбрать разброс даты
	 *
	 * @param {string} value - (0|1|3|7|30)
	 */
	selectDateLapse (value) {
		this.page.selectByValue(this.locators.date.select, value);
	}

	/**
	 * Выбран ли чекбокс
	 *
	 * @param {string} name - unread|flag|attach
	 * @returns {boolean}
	 */
	isChecked (name) {
		let checkbox = this.page.element(this.locators.checkboxes[name]);

		return !!checkbox.getAttribute('checked');
	}

	/**
	 * Проверка, что курсор в поле
	 *
	 * @param {string} name - имя поля
	 * @returns {boolean}
	 */
	isFocusInField (name) {
		return this.page.hasFocus(this.locators.textFields[name]);
	}


	/**
	 * Получить выбранное значение разброса даты
	 *
	 * @returns {string}
	 */
	getSelectDateValue () {
		return this.page.getValue(this.locators.date.select);
	}

	/**
	 * Получить текст выбранного значения разброса даты
	 *
	 * @returns {string}
	 */
	getSelectDateText () {
		return this.page.getText(this.locators.date.selectText);
	}

	/**
	 * Получить текст поля даты
	 *
	 * @returns {string}
	 */
	getDateFieldText () {
		return this.page.getValue(this.locators.date.input);
	}

	/**
	 * Показаны саджесты для поля
	 *
	 * @param {string} name - имя поля
	 * @param {boolean} reverse - нет ли саджестов
	 * @returns {boolean}
	 */
	hasSuggests (name, reverse = false) {
		return this.page.waitForVisible(this.locators.suggests[name], void 0, reverse);
	}
}

module.exports = Advanced;
