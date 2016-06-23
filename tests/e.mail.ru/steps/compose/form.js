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
	 * Пометить письмо как важное
	 */
	setPriority () {

	}

	/**
	 * Пометить письмо как с уведомлением
	 */
	setReceipt () {

	}

	/**
	 * Установить напоминание
	 */
	setRemind () {

	}

	/**
	 * Кликнуть на поле "От кого"
	 */
	clickFromField () {

	}

	/**
	 * Кликнуть на поле "Кому"
	 */
	clickToField () {

	}

	/**
	 * Кликнуть на поле "Копия"
	 */
	clickCCField () {

	}

	/**
	 * Кликнуть на поле "Скрытая копия"
	 */
	clickBCCField () {

	}

	/**
	 * Кликнуть на поле "Тема"
	 */
	clickSubjectField () {

	}

	/**
	 * Заполнить поле "От кого"
	 */
	setFromField () {

	}

	/**
	 * Заполнить поле "Кому"
	 */
	setToField () {

	}

	/**
	 * Заполнить поле "Копия"
	 */
	setCCField () {

	}

	/**
	 * Заполнить поле формы "Скрытая копия"
	 */
	setBCCField () {

	}

	/**
	 * Заполнить поле формы "Тема"
	 */
	setSubjectField () {

	}

	/**
	 * Получить данные поля "От кого"
	 */
	getFromValue () {

	}

	/**
	 * Получить данные поля "Кому"
	 */
	getToValue () {

	}


	/**
	 * Получить данные поля "Копия"
	 */
	getCCValue () {

	}

	/**
	 * Получить данные поля "Скрытая копия"
	 */
	getBCCValue () {

	}

	/**
	 * Получить данные поля "Тема"
	 */
	getSubjectValue () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Очистить поле "От кого"
	 */
	clearFromField () {

	}

	/**
	 * Очистить поле "Копия"
	 */
	clearCCField () {

	}

	/**
	 * Очистить поле "Скрытая копия"
	 */
	clearBCCField () {

	}

	/**
	 * Очистить поле "Тема"
	 */
	clearSubjectField () {

	}

	/**
	 * Показать поле "От кого"
	 */
	showFromField () {

	}

	/**
	 * Показать поле "Кому"
	 */
	showToField () {

	}

	/**
	 * Показать поле "Копия"
	 */
	showCCField () {

	}

	/**
	 * Показать поле "Скрытая копия"
	 */
	showBCCField () {

	}

	/**
	 * Показать поле "Тема"
	 */
	showSubjectField () {

	}

	/**
	 * Скрыть поле "От кого"
	 */
	hideFromField () {

	}

	/**
	 * Скрыть поле "Кому"
	 */
	hideToField () {

	}

	/**
	 * Скрыть поле "Копия"
	 */
	hideCCField () {

	}

	/**
	 * Скрыть поле "Скрытая копия"
	 */
	hideBCCField () {

	}

	/**
	 * Скрыть поле "Тема"
	 */
	hideSubjectField () {

	}

	/**
	 * Проверить видимость поля "От кого"
	 */
	isVisibleFromField () {

	}

	/**
	 * Проверить видимость поля "Кому"
	 */
	isVisibleToField () {

	}

	/**
	 * Проверить видимость поля "Копия"
	 */
	isVisibleCCField () {

	}

	/**
	 * Проверить видимость поля "Скрытая копия"
	 */
	isVisibleBCCField () {

	}

	/**
	 * Проверить видимость поля "Тема"
	 */
	isVisibleSubjectField () {

	}
}

module.exports = new Form();
