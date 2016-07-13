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
	get path () {
		let system = new System(),
			profile = '/var/lib/selenium/',
			local = path.join('test-files', 'files', 'e.mail.ru');

		if (/localhost|vagabond|win110/.test(system.host)) {
			return path.resolve(local);
		}

		throw new Error('No path to test-files!');
	}

	file (name) {
		return path.join(this.path, name);
	}

	files (list) {
		if (typeof list === 'string') {
			return this.file(list);
		}

		return list.map(name => this.file(name));
	}
}

module.exports = new Attachments();
