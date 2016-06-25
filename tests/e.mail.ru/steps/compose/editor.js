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
		let actual = login.wait();

		assert(actual, 'Не удалось дождаться появления редактора написания письма');
	}

	/**
	 * Написать текст письма
	 * @param text
	 */
	writeMessage (text) {
		let editor = page.getEditor();
		editor.click(); // наводим фокус в едитор
		editor.keys('\uE013\uE013\uE013'); // поднимае курсор вверх
		editor.keys(text); // вводим текст

		assert(editor.getText('').includes(text), 'Текст не был введен');
	}


}

module.exports = new Editor();
