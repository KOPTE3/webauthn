'use strict';

let ajax = require('../ajax');
let helpers = require('../helpers');

const defaultUrl = 'messages/attaches/add';

module.exports = {
	registerAddLogger (url = defaultUrl) {
		return ajax.registerLogger('complete', url);
	},

	getLastAddedFileData (url = defaultUrl) {
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
