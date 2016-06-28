'use strict';

let assert = require('assert');

let ComposeSteps = require('../compose');
let ComposeEditor = require('../../pages/compose/editor');

/** Модуль для работы с шагами редактора страницы написания письма */
class ComposeEditorSteps extends ComposeSteps {
	constructor () {
		super();

		this.composeEditor = new ComposeEditor();
	}

	/**
	 * Дождаться появления редактора написания письма
	 */
	wait () {
		let actual = this.composeEditor.wait();

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
		let editor = this.composeEditor.getEditor();

		this.setFocus(editor);
		editor.keys(text); // вводим текст

		assert(editor.getText('').includes(text), 'Текст письма не был введен');
		this.composeEditor.restoreParentFrame();
	}
}

module.exports = new ComposeEditorSteps();
