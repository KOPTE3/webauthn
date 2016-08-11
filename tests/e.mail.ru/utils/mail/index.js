'use strict';

let nodemailer = require('nodemailer');
let authorization = require('../../store/authorization');
let system = require('../../store/system');
let actions = require('../actions');

const ASYNC_TIMEOUT = 10000; // таймаут завершнеия асинхронного скрипта
const DELIVERY_TIMEOUT = 5000; // таймаут ожидания фактической доствки письма

/** Модуль создания и отправки письма */
class Mail {
	/**
	 * Метод создает новое сообщение
	 *
	 * @param {Object} options - данные письма (см: https://www.npmjs.com/package/nodemailer)
	 */
	constructor (options) {
		let { account } = authorization;
		let email = account.get('email');
		let password = account.get('password');

		let scheme = `smtps://${email}:${password}@smtp.mail.ru`;

		this.transport = nodemailer.createTransport(scheme);

		this.options = Object.assign({
			from: email
		}, options);
	}

	/**
	 * Прикрепить аттач к письму
	 *
	 * @param {string} name - имя аттача
	 * Доступны (inline)
	 */
	addAttach (name) {
		this.options.attachments = this.options.attachments || [];

		if (name === 'inline') {
			this.options.attachments.push({
				path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
			});
		} else {
			this.options.attachments.push({
				filename: name,
				path: system.file(name)
			});
		}
	}

	/**
	 * Метод отправляет новое сообщение пользователю
	 */
	send () {
		this.transport.sendMail(this.options, function (error, info) {
			if (error) {
				throw new Error(error);
			}
		});

		browser.pause(DELIVERY_TIMEOUT);
	}

	draft () {
		let { to, from, subject, text } = this.options;

		actions.saveDraft(to, from, subject, text);
	}

	template () {
		let { to, from, subject, text } = this.options;

		actions.saveDraft(to, from, subject, text, true);
	}
}

module.exports = Mail;
