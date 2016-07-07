'use strict';

let nodemailer = require('nodemailer');
let fs = require('fs');

const ASYNC_TIMEOUT = 10000; // таймаут завершнеия асинхронного скрипта
const DELIVERY_TIMEOUT = 1000; // таймаут ожидания фактической доствки письма

let AuthStore = require('../../store/authorization');

/** Модуль создания и отправки письма */
class Mail {

	/**
	 * Метод создает новое сообщение
	 *
	 * @param {Object} options - данные письма (см: https://www.npmjs.com/package/nodemailer)
	 */
	constructor (options) {
		let account = new AuthStore().account;
		let login = account.get('email');
		let pwd = account.get('password');

		this.transport = nodemailer.createTransport(`smtps://${login}:${pwd}@smtp.mail.ru`);
		this.options = options;
	}

	/**
	 * Прикрепить аттач к письму
	 *
	 * @param {string} name - имя аттача
	 * Доступны (image.png)
	 */
	addAttach (name) {
		this.options.attachments = this.options.attachments || [];

		this.options.attachments.push({
			filename: name,
			content: fs.createReadStream(`${__dirname}/attachments/${name}`)
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
}

module.exports = Mail;
