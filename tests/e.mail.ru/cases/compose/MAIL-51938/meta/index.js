'use strict';

let Signature = require('../../../../steps/settings/signature');

let actions = require('../../../../utils/actions');

const username = 'v.demidov.test@mail.ru';
const password = 'vova123';

let features = [
	'wysiwyg-signature',
	'wysiwyg-signature-inline-images',
	'compose2-inlinefromeditor'
];

module.exports = {
	auth (ftrs) {
		Signature.auth('basic', { username, password });

		if (ftrs) {
			features.push(ftrs);
		}

		Signature.features(features);
	},

	resetSignatures (signatures = null) {
		let data = signatures || ['--\nVladimir Demidov'];

		actions.setSignatures(data);
	},

	cleanInbox () {
		actions.cleanInbox();
	}
};
