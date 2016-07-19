'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let ComposePage = require('../../pages/compose');

let Mail = require('../../utils/mail');

/** Модуль для работы с шагами страницы написания письма */
class ComposeSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new ComposePage();
	}

	/**
	 * Отправка произвольного письма через клиентский API
	 * @param  {Object} opts - объект опций письма
	 */
	static sendMail (opts) {
		let mail = new Mail({
			to: opts.to,
			subject: opts.subject,
			text: opts.text
		});

		if (opts.attach) {
			mail.addAttach(opts.attach);
		}

		mail.send();
	}
}

module.exports = ComposeSteps;
