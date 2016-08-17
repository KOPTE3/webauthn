'use strict';

let assert = require('assert');
let Steps = require('../../steps');
let NotifyPage = require('../../pages/notify');

class Notify extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	get page () {
		return new NotifyPage();
	}

	/**
	 * Ожидает появление нотифая с таким типом и текстом
	 *
	 * @param {string} type - ok | error
	 * @param {string} text - текст в попапе
	 * @param {string} compare - 'contains'
	 */
	wait (type, text, compare) {
		let element = this.page.getNotify(type),
			elementText,
			result;

		assert(element.isVisible(), 'Нотифай не показался');

		elementText = element.getText();

		switch (compare) {
			case 'contains':
				result = elementText.includes(text);
				break;
			case 'notequal':
				result = !(elementText === text);
				break;
			default:
				result = elementText === text;
		}

		assert(result, 'Текст не совпал');
	}
}

module.exports = Notify;
