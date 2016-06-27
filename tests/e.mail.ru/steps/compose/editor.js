'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/compose/editor');

/** Модуль для работы с шагами редактора страницы написания письма */
class Editor extends Steps {
	constructor () {
		super();
	}

	/**
	 * Дождаться появления редактора написания письма
	 */
	wait () {
		let actual = page.wait();

		assert(actual, 'Не удалось дождаться появления редактора написания письма');
	}

	/**
	 * Метод фокусируется на input
	 * @param {Element} input - элемент на котором сфокусироватся
	 * */
	setFocus (input) {
		input.click(); // наводим фокус в едитор
		input.keys('\uE013\uE013\uE013'); // поднимаем курсор вверх
	}

	/**
	 * Ввести текст сообщения
	 * @param {String} text
	 */
	writeMessage (text) {
		let editor = page.getEditor();

		this.setFocus(editor);
		editor.keys(text); // вводим текст

		assert(editor.getText('').includes(text), 'Текст письма не был введен');
		page.restoreParentFrame();
	}


}

module.exports = new Editor();
