'use strict';

module.exports = {
	/**
	 * Категории рассылок.
	 */
	categories: {
		'promotions': 1,
		'newsletters': 2,
		'social': 3
	},

	/**
	 * Статистика рассылок.
	 */
	stats: {
		'maillings_stat': {
			'read': 46,
			'deleted': 10,
			'ignored_deleted': 1,
			'ignored': 18
		},

		'maillings_senders': [
			{
				'total_letters': 8,
				'category_id': 0,
				'emails': 'service@paypal.com',
				'autofilter_refuse': false,
				'id': 2347,
				'name_en': 'PayPal',
				'name_ru': 'PayPal'
			},
			{
				'total_letters': 1,
				'category_id': 0,
				'emails': 'orders@ozon.ru',
				'autofilter_refuse': false,
				'id': 1563,
				'name_en': 'Ozon',
				'name_ru': 'Ozon'
			},
			{
				'total_letters': 15,
				'category_id': 1,
				'emails': 'sales@sberbank.ru',
				'autofilter_refuse': false,
				'id': 1725,
				'name_en': 'Sberbank',
				'name_ru': 'Сбербанк'
			},
			{
				'total_letters': 1,
				'category_id': 1,
				'emails': 'service@paypal.ru',
				'autofilter_refuse': false,
				'id': 1752,
				'name_en': 'PayPal',
				'name_ru': 'PayPal'
			},
			{
				'total_letters': 36,
				'category_id': 2,
				'emails': 'events@pokerstars.com',
				'autofilter_refuse': false,
				'id': 2191,
				'name_en': 'PokerStars',
				'name_ru': 'PokerStars'
			},
			{
				'total_letters': 8,
				'category_id': 2,
				'emails': 'noreply@youtube.com',
				'autofilter_refuse': false,
				'id': 1488,
				'name_en': 'Youtube',
				'name_ru': 'Youtube'
			},
			{
				'total_letters': 4,
				'category_id': 3,
				'emails': '*@postmaster.twitter.com',
				'autofilter_refuse': false,
				'id': 2,
				'name_en': 'Twitter',
				'name_ru': 'Twitter'
			},
			{
				'total_letters': 1,
				'category_id': 3,
				'emails': 'updates@linkedin.com',
				'autofilter_refuse': false,
				'id': 1959,
				'name_en': 'LinkedIn',
				'name_ru': 'LinkedIn'
			},
			{
				'total_letters': 1,
				'category_id': 100,
				'emails': 'noreply@wargaming.net',
				'autofilter_refuse': false,
				'id': 10901,
				'name_en': 'Wargaming.net',
				'name_ru': 'Wargaming.net'
			},
			{
				'total_letters': 1,
				'category_id': 100,
				'emails': 'best2015@coub.com',
				'autofilter_refuse': false,
				'id': 582122,
				'name_en': 'Coub.com',
				'name_ru': 'Coub.com'
			}
		]
	}
};
