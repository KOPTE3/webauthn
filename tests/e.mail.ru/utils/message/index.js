'use strict';

let actions = require('../../utils/actions');

/** Модуль для работы с письмами */
module.exports = {

	/**
	 * Получить id аттачей письма (обычных)
	 *
	 * @param {string} messageId
	 * @return {string[]}
	 */
	getAttachIds (messageId) {
		return browser
			.timeoutsAsyncScript(10000)
			.executeAsync(function (messageId, done) {
				require('patron.v2/models/Message').findOne(messageId).then(function (model) {
					var attaches = model.get('attaches');
					var ids = attaches.list.map((attach) => {
						return messageId + ';' + attach.get('id');
					});

					done(ids);
				});
			}, messageId).value;
	},

	/**
	 * Сохранить все аттачи из письма в облако
	 *
	 * @param {string} messageId - id письма
	 * @return {*}
	 */
	saveAllAttachesToCloud (messageId) {
		let ids = this.getAttachIds(messageId);

		return actions.call('attaches/add/to-cloud', {
			folder: '/',
			ids
		});
	}
};
