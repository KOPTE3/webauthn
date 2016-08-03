'use strict';

let authStore = require('../../store/authorization');

/** Набор методов для работы с данными письма */
module.exports = {
	/**
	 * Параметры письма с ссылками на видео youtube
	 * @type {{from: string, to: string, text: string, subject: string}}
	 */
	get youtubeMessage () {
		let email = authStore.account.get('email');
		const links = this.youtubeMessageLinks.map(({link}) => link);

		return {
			from: email,
			to: email,
			text: links.join('\n'),
			subject: 'Youtube'
		};
	},

	get youtubeMessageLinks () {
		return [
			{link: 'https://youtu.be/B2HWuR2mq5M?t=136', time: 136},
			{link: 'https://youtu.be/N08P7gEkKDA?t=17m19s', time: 1039},
			{link: 'https://youtu.be/jI-kpVh6e1U?t=5h32m37s', time: 19957}
		];
	}
};
