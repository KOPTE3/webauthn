'use strict';

let nodemailer = require('nodemailer');
let fs = require('fs');
let AuthStore = require('../../store/authorization');
let actions = require('../actions');

const ASYNC_TIMEOUT = 10000; // таймаут завершнеия асинхронного скрипта
const DELIVERY_TIMEOUT = 2000; // таймаут ожидания фактической доствки письма


/** Модуль создания и отправки письма */
class Mail {

	/**
	 * Метод создает новое сообщение
	 *
	 * @param {Object} options - данные письма (см: https://www.npmjs.com/package/nodemailer)
	 */
	constructor (options) {
		let { account } = new AuthStore();
		let email = account.get('email');
		let pwd = account.get('password');

		options.from = email;

		this.transport = nodemailer.createTransport(`smtps://${email}:${pwd}@smtp.mail.ru`);
		this.options = options;
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

			return;
		}

		this.options.attachments.push({
			filename: name,
			path: `${__dirname}/attachments/${name}`
		});
	}

	/**
	 * Метод отправляет новое сообщение пользователю
	 */
	send () {
		this.transport.sendMail(this.options, function (error, info) {
			if (error) {
				throw error;
			}
		});
		browser.pause(DELIVERY_TIMEOUT);
	}

	draft () {
		let {to, from, subject, text} = this.options;

		actions.saveDraft(to, from, subject, text);
	}

	template () {
		let {to, from, subject, text} = this.options;

		actions.saveDraft(to, from, subject, text, true);
	}
}

module.exports = Mail;
