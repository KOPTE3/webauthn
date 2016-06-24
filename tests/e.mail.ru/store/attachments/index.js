'use strict';

let path = require('path');
let Store = require('../../store');

/** Модуль для работы с аттачами */
class Compose extends Store {
	constructor () {
		super();
	}

	/**
	 * Возвращает путь, где располагаются тестовые файлы
	 *
	 * @todo stash.mail.ru/projects/QA/repos/test-files
	 * @type {string}
	 */
	get path () {
		let profile = '/var/lib/selenium/';

		if (/win/.test(this.platform)) {
			profile += '%USERPROFILE%';
		}

		return path.join(profile, '/Dropbox/feta/mail');
	}
}
