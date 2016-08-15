'use strict';

let ajax = require('../ajax');
let helpers = require('../helpers');

const url = 'messages/attaches/add';

module.exports = {
	registerAddLogger () {
		return ajax.registerLogger('complete', url);
	},

	getLastAddedFileData () {
		let result = ajax.getLoggerInfo(url),
			xhr, response;

		if (result) {
			xhr = result[result.length - 1].xhr;
			response = JSON.parse(xhr.responseText);

			return response.body;
		}

		return null;
	}
};
