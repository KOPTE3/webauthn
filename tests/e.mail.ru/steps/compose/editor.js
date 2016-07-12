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
	 * Дождаться появления редактора
	 */
	wait () {
		let actual = this.composeEditor.wait();

		assert(actual, 'Не удалось дождаться появления редактора написания письма');
	}

	/**
	 * Метод фокусируется на input
	 *
	 * @param {Element} input - элемент на котором сфокусироватся
	 */
	setFocus (input) {
		input.click(); // наводим фокус в едитор
		input.keys('\uE013\uE013\uE013'); // поднимаем курсор вверх
	}

	/**
	 * Ввести текст сообщения
	 *
	 * @param {boolean} text
	 */
	writeMessage (text) {
		let editor = this.composeEditor.getEditor();

		this.setFocus(editor);
		editor.keys(text); // вводим текст

		let actual = this.getMessage(editor).includes(text);

		assert(actual, 'Текст письма не был введен');
		this.composeEditor.restoreParentFrame();
	}

	/**
	 * Получить текст сообщения
	 *
	 * @param {Element} editor - редактор
	 * @return {string} result - текст
	 */
	getMessage (editor) {
		let currentEditor = editor || this.composeEditor.getEditor();
		let result;

		assert(currentEditor, 'Редактор письма не найден');
		result = currentEditor.getText('');

		if (!editor) {
			this.composeEditor.restoreParentFrame();
		}

		return result;
	}

	/**
	 * Проверить, содержит ли пересылка следующий текст
	 *
	 * @param {string} text содержание письма
	 */
	hasForwardedMessage (text) {
		let message = this.getMessage();
		let hasHeader;
		let hasMessage;

		assert(message, 'Тело письма какое-то пустое');

		hasMessage = message.includes(text);
		hasHeader = message.includes('-------- Пересылаемое сообщение --------');

		assert(hasHeader, 'Письмо не из пересылки');
		assert(hasMessage, 'Письмо не содержит пересылаемый текст');
	}
}

module.exports = new ComposeEditorSteps();
