'use strict';

let ComposeFields = require('../../pages/compose/fields');
let composeFieldsStore = require('../../store/compose/fields');

/** Модуль для работы с формой страницы написания письма */
class Compose2Fields extends ComposeFields {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * Здесь только переопределение отличающихся от старого композа локаторов
	 *
	 * @type {Object}
	 */
	get locators () {
		/* eslint-disable max-len */
		return this.extend(super.locators, {
			container: '.compose-head',
			fields: {
				priority: '[data-blockid="priority"]',
				receipt : '[data-blockid="receipt"]',
				remind  : '[data-blockid="remind"]',
				from    : '[data-label="compose_sender"]',
				to      : '.compose-head__field [data-original-name="To"]',
				cc      : '.compose-head__field [data-original-name="CC"]',
				bcc     : '.compose-head__field [data-original-name="BCC"]',
				subject : '.compose-head__field [name="Subject"]'
			},
			fieldsValues: {
				priority: '[name="Priority"]',
				receipt : '[name="Receipt"]',
				remind  : '[name="remind"]',
				from    : '[data-label="compose_sender"]',
				to      : '.compose-head__field [data-original-name="To"]',
				cc      : '.compose-head__field [data-original-name="CC"]',
				bcc     : '.compose-head__field [data-original-name="BCC"]',
				subject : '.compose-head__field [name="Subject"]'
			},
			selectFieldItems: {
				from: '.compose__controls [data-for="compose_sender"]',
				cc: '.compose__controls [data-for="compose_cc"]',
				bcc: '.compose__controls [data-for="compose_bcc"]'
			},
			hideFieldItems: {
				from: '.compose-head__row-collapse[data-collapse="compose_sender"]',
				cc: '.compose-head__row-collapse[data-collapse="compose_cc"]',
				bcc: '.compose-head__row-collapse[data-collapse="compose_bcc"]'
			},
			dropdowns: {
				fromEmail: {
					ctrl: '.js-compose__select_email .js-compose__dropdown_email',
					list: '.js-compose__select_email .js-compose__select_email-item',
					item: email => '.js-compose__select_email ' +
						`.js-compose__select_email-item [data-email="${email}"]`
				}
			}
		});

		/* eslint-enable */
	}

	/**
	 * Показать заданное поле
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 */
	showField (name) {
		if (this.locators.selectFieldItems[name] && !this.isVisibleField(name)) {
			this.page.click(this.locators.selectFieldItems[name]);
		}
	}

	/**
	 * Скрыть заданное поле
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 */
	hideField (name) {
		if (this.locators.hideFieldItems[name] && this.isVisibleField(name)) {
			this.page.click(this.locators.hideFieldItems[name]);
		}
	}

	/**
	 * Получить инпут, относящийся к полю
	 *
	 * @param {string} name — имя поля.
	 * Доступные значения (from, to, cc, bcc, subject, priority, receipt, remind)
	 * @returns {Promise}
	 */
	getFieldInput (name) {
		return this.page.element(this.locators.fieldsValues[name]);
	}

	/**
	 * Получить значение поля по имени
	 *
	 * @see getField
	 * @param {string} name — имя поля
	 * @returns {string}
	 */
	getFieldValue (name) {
		return this.getFieldInput(name).getValue();
	}

	/**
	 * Переключить все доступные поля формы
	 *
	 * @param {boolean} state — состояние
	 */
	toggleAllFields (state) {
		for (let name of composeFieldsStore.hiddenFields) {
			if (state) {
				this.showField(name);
			} else {
				this.hideField(name);
			}
		}
	}

	/**
	 * Показать все поля формы
	 */
	showAllFields () {
		this.toggleAllFields(true);
	}

	/**
	 * Скрыть все поля формы
	 */
	hideAllFields () {
		this.toggleAllFields(false);
	}


	/**
	 * Скрыть список полей
	 */
	hideSelectFields () {
	}

	/**
	 * Показать список полей
	 */
	showSelectFields () {
	}

	/**
	 * Кликнуть по полю из списка
	 *
	 * @param {string} name - имя поля
	 */
	clickSelectFieldItem (name) {
		this.showField(name);
	}
}

module.exports = Compose2Fields;
