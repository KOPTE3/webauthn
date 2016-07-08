'use strict';

let path = require('path');
let Store = require('../../store');
let System = require('../../store/system');

/** Модуль для работы с аттачами */
class Attachments extends Store {
	constructor () {
		super();
	}

	/**
	 * Возвращает путь, где располагаются тестовые файлы
	 *
	 * @todo stash.mail.ru/projects/QA/repos/test-files
	 * @type {string}
	 */
	static get path () {
		let system = new System(),
			profile = '/var/lib/selenium/';

		if (/win/.test(system.platform)) {
			profile += '%USERPROFILE%';
		}

		return path.join(profile, '/Dropbox/feta/mail');
	}
}

module.exports = Attachments;
