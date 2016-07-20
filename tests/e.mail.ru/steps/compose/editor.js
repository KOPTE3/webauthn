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
	 * @param {string} text
	 */
	writeMessage (text) {
		let editor = this.composeEditor.getEditor();

		this.setFocus(editor);
		editor.keys(text); // вводим текст

		let actual = this.getMessage(editor).includes(text);

		assert(actual, 'Текст письма не был введен');
		this.composeEditor.restoreParentFrame();
	}

	allertAccept () {
		this.composeEditor.alertAccept();
	}

	/**
	 * Получить текст сообщения
	 *
	 * @param {Element} editor - редактор
	 * @returns {string} result - текст
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
	 * Проверяет пустое ли сообщение
	 *
	 * @returns {boolean} если true значит письмо не пустое
	 */
	isMessageNotEmpty () {
		let message = this.getMessage();

		return !!message;
	}

	/**
	 * Проверить, содержится ли в теле письма текст
	 *
	 * @param {string} text текст который должен находится в теле письма
	 * @returns {boolean}
	 */
	hasMessage (text) {
		let message = this.getMessage();

		return message.includes(text);
	}

	/**
	 * Проверить, содержит ли ответ следующий текст
	 *
	 * @param {string} text
	 */
	hasReplyMessage (text) {
		assert(this.isMessageNotEmpty(), 'Тело письма какое-то пустое');
		assert(this.hasMessage(text), 'Ответ на письмо не содержит текст');
	}

	/**
	 * Проверить, содержит ли пересылка следующий текст
	 *
	 * @param {string} text содержание письма
	 */
	hasForwardedMessage (text) {
		assert(this.isMessageNotEmpty(), 'Тело письма какое-то пустое');
		assert(
			this.hasMessage('-------- Пересылаемое сообщение --------'),
			'Письмо не из пересылки'
		);
		assert(this.hasMessage(text), 'Письмо не содержит пересылаемый текст');
	}
}

module.exports = ComposeEditorSteps;
