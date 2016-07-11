'use strict';

let path = require('path');
let system = require('../../store/system');

/** Набор методов для работы с аттачами */
module.exports = {
	/**
	 * Возвращает путь, где располагаются тестовые файлы
	 *
	 * @todo stash.mail.ru/projects/QA/repos/test-files
	 * @type {string}
	 */
	get path () {
		let profile = '/var/lib/selenium/';

		if (/win/.test(system.platform)) {
			profile += '%USERPROFILE%';
		}

		return path.join(profile, '/Dropbox/feta/mail');
	}
};
