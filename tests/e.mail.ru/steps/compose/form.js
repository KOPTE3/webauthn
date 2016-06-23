'use strict';

let Steps = require('../../steps');
let login = require('../../pages/login');

class Form extends Steps {
	constructor () {
		super();
	}

	/**
	 * Дождаться появления формы написания письма
	 */
	wait () {
		let actual = login.wait();

		assert(actual, 'Не удалось открыть форму написания письма');
	}

	/**
	 * Заполнить поле "От кого"
	 */
	setFromField () {

	}

	/**
	 * Кликнуть на поле "От кого"
	 */
	clickFromField () {

	}

	/**
	 * Получить данные поля "От кого"
	 */
	getFromField () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Показать поле "От кого"
	 */
	showFromField () {

	}

	/**
	 * Скрыть поле "От кого"
	 */
	hideFromField () {

	}

	/**
	 * Проверить видимость поля "От кого"
	 */
	isVisibleFromField () {

	}

	/**
	 * Кликнуть на поле "Кому"
	 */
	clickToField () {

	}

	/**
	 * Заполнить поле "Кому"
	 */
	setToField () {

	}

	/**
	 * Получить данные поля "Кому"
	 */
	getToField () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Показать поле "Кому"
	 */
	showToField () {

	}

	/**
	 * Скрыть поле "Кому"
	 */
	hideToField () {

	}

	/**
	 * Проверить видимость поля "Кому"
	 */
	isVisibleToField () {

	}

	/**
	 * Кликнуть на поле "Копия"
	 */
	clickCCField () {

	}

	/**
	 * Заполнить поле "Копия"
	 */
	setCCField () {

	}

	/**
	 * Получить данные поля "Копия"
	 */
	getCCField () {

	}

	/**
	 * Очистить поле "Копия"
	 */
	clearCCField () {

	}

	/**
	 * Показать поле "Копия"
	 */
	showCCField () {

	}

	/**
	 * Скрыть поле "Копия"
	 */
	hideCCField () {

	}

	/**
	 * Проверить видимость поля "Копия"
	 */
	isVisibleCCField () {

	}

	/**
	 * Кликнуть на поле "Скрытая копия"
	 */
	clickBCCField () {

	}

	/**
	 * Заполнить поле формы "Скрытая копия"
	 */
	setBCCField () {

	}

	/**
	 * Получить данные поля "Скрытая копия"
	 */
	getBCCField () {

	}

	/**
	 * Очистить поле "Скрытая копия"
	 */
	clearBCCField () {

	}

	/**
	 * Показать поле "Скрытая копия"
	 */
	showBCCField () {

	}

	/**
	 * Скрыть поле "Скрытая копия"
	 */
	hideBCCField () {

	}

	/**
	 * Проверить видимость поля "Скрытая копия"
	 */
	isVisibleBCCField () {

	}

	/**
	 * Кликнуть на поле "Тема"
	 */
	clickSubjectField () {

	}

	/**
	 * Заполнить поле формы "Тема"
	 */
	setSubjectField () {

	}

	/**
	 * Получить данные поля "Тема"
	 */
	getSubjectField () {

	}

	/**
	 * Очистить поле "Тема"
	 */
	clearSubjectField () {

	}

	/**
	 * Показать поле "Тема"
	 */
	showSubjectField () {

	}

	/**
	 * Скрыть поле "Тема"
	 */
	hideSubjectField () {

	}

	/**
	 * Проверить видимость поля "Subject"
	 */
	isVisibleSubjectField () {

	}
}

module.exports = new Form();
