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
		let profile = '/var/lib/selenium/',
			local = path.join('test-files', 'files', 'e.mail.ru');

		if (/localhost/.test(system.host)) {
			return path.resolve(local);
		}

		if (/win/.test(system.platform)) {
			profile += '%USERPROFILE%';
		}

		return path.join(profile, '/Dropbox/feta/mail');
	},

	file (name) {
		return path.join(this.path, name);
	},

	files (list) {
		if (typeof list === 'string') {
			return this.file(list);
		}

		return list.map(name => this.file(name));
	}
};
