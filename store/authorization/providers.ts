type ProviderList = Yoda.Provider[];

/** Набор методов для работы с данными почтовых провайдеров */
export default {
	/**
	 * Список провайдеров
	 *
	 * @returns {Array}
	 */
	list: [
		{
			name: 'mail.ru',
			types: ['internal', 'oauth'],
			hosts: [
				'mail.ru',
				'mail.ua',
				'inbox.ru',
				'list.ru',
				'bk.ru',
				'corp.mail.ru'
			],
			protocols: {
				imap: {
					host: 'imap.mail.ru',
					tls: true,
					port: 993
				}
			}
		},

		{
			name: 'yandex.ru',
			types: ['external'],
			hosts: [
				'yandex.ru',
				'yandex.com',
				'yandex.ua',
				'yandex.kz',
				'yandex.by',
				'narod.ru',
				'ya.ru',
				'ya.com'
			],
			protocols: {
				imap: {
					host: 'imap.yandex.ru',
					tls: true,
					port: 993
				}
			}
		},

		{
			name: 'rambler.ru',
			types: ['external'],
			hosts: [
				'rambler.ru',
				'lenta.ru',
				'myrambler.ru',
				'autorambler.ru',
				'ro.ru',
				'r0.ru'
			],
			protocols: {
				imap: {
					host: 'imap.rambler.ru',
					tls: true,
					port: 993
				}
			}
		},

		{
			name: 'gmail.com',
			types: ['external', 'oauth'],
			hosts: [
				'gmail.com'
			],
			url: 'https://accounts.google.com/',
			protocols: {
				imap: {
					host: 'imap.gmail.com',
					tls: true,
					port: 993
				}
			}
		},

		{
			name: 'aol.com',
			types: ['external'],
			hosts: [
				'aol.com'
			],
			protocols: {
				imap: {
					host: 'imap.aol.com',
					tls: true,
					port: 993
				}
			}
		},

		{
			name: 'icloud.com',
			types: ['external'],
			hosts: [
				'icloud.com',
				'me.com'
			]
		},

		{
			name: 'qq.com',
			types: ['external'],
			hosts: [
				'qq.com'
			]
		},

		{
			name: 'my.com',
			types: ['external'],
			hosts: [
				'my.com'
			]
		},

		{
			name: 'yahoo.com',
			types: ['external'],
			hosts: [
				'yahoo.com',
				'ymail.com',
				'rocketmail.com',
				'yahoo.com.ar',
				'yahoo.com.au',
				'yahoo.at',
				'yahoo.be',
				'yahoo.fr',
				'yahoo.nl',
				'yahoo.com.br',
				'yahoo.ca',
				'yahoo.en',
				'yahoo.com.cn',
				'yahoo.cn',
				'yahoo.com.co',
				'yahoo.cz',
				'yahoo.dk',
				'yahoo.fi',
				'yahoo.de',
				'yahoo.gr',
				'yahoo.com.hk',
				'yahoo.fi',
				'yahoo.de',
				'yahoo.gr',
				'yahoo.com.hk',
				'yahoo.hu',
				'yahoo.co.in',
				'yahoo.in',
				'yahoo.co.id',
				'yahoo.ie',
				'yahoo.co.il',
				'yahoo.it',
				'yahoo.co.jp',
				'yahoo.co.kr',
				'yahoo.com.my',
				'yahoo.com.mx',
				'yahoo.ae',
				'yahoo.nl',
				'yahoo.co.nz',
				'yahoo.no',
				'yahoo.com.ph',
				'yahoo.pl',
				'yahoo.pt',
				'yahoo.ro',
				'yahoo.ru',
				'yahoo.com.sg',
				'yahoo.co.za',
				'yahoo.es',
				'yahoo.se',
				'yahoo.ch',
				'yahoo.com.tw',
				'yahoo.co.th',
				'yahoo.com.tr',
				'yahoo.co.uk',
				'yahoo.com',
				'yahoo.com.vn'
			],
			protocols: {
				imap: {
					host: 'imap.mail.yahoo.com',
					tls: true,
					port: 993
				}
			}
		},

		{
			name: 'qip.ru',
			types: ['external'],
			hosts: [
				'qip.ru',
				'pochta.ru',
				'fromru.com',
				'front.ru',
				'hotbox.ru',
				'hotmail.ru',
				'krovatka.su',
				'land.ru',
				'mail15.com',
				'mail333.com',
				'newmail.ru',
				'nightmail.ru',
				'nm.ru',
				'pisem.net',
				'pochtamt.ru',
				'pop3.ru',
				'rbcmail.ru',
				'smtp.ru',
				'5ballov.ru',
				'aeterna.ru',
				'ziza.ru',
				'memori.ru',
				'photofile.ru',
				'fotoplenka.ru',
				'pochta.com'
			]
		},

		{
			name: 'outlook.com',
			types: ['external', 'oauth'],
			hosts: [
				'outlook.com',
				'hotmail.com',
				'msn.com',
				'live.com',
				'live.ru'
			],
			protocols: {
				imap: {
					host: 'imap-mail.outlook.com',
					tls: true,
					port: 993
				}
			},
			url: 'https://login.live.com/oauth20_authorize.srf'
		},

		{
			name: 'vk.com',
			types: ['social', 'external', 'oauth'],
			hosts: [
				'vk.com'
			],
			url: 'https://oauth.vk.com/authorize'
		},

		{
			name: 'ok.ru',
			types: ['social', 'external', 'oauth'],
			hosts: [
				'ok.ru'
			],
			url: 'https://connect.ok.ru/dk'
		},

		{
			name: 'fb.com',
			types: ['social', 'external', 'oauth'],
			hosts: [
				'fb.com', 'facebook.com'
			],
			url: 'https://www.facebook.com/login.php'
		}
	] as ProviderList,

	/**
	 * Проектный топ провайдеров по типам авторизации
	 *
	 * ВНИМАНИЕ: изменения в этот списке должны согласовываться с
	 * store/authorization/accounts.
	 * В противном случае, можно запросить учетную запись, которой нет.
	 *
	 * @see http://mail-dashboard.mail.ru/?id=ext-rimap-daily
	 * @see http://mail-dashboard.mail.ru/?id=instant-rimap-daily
	 * @see https://jira.mail.ru/browse/MNT-113559
	 * @see https://jira.mail.ru/browse/MNT-113560
	 * @param {string} type — [ external | pdd ]
	 * @param {string} [project]
	 * @returns {Array}
	 */
	top(type: AccountManager.Type, project: string = 'mail.ru'): string[] {
		const providers: any = {
			external: {
				'my.com': [
					'libero.it',
					'yahoo.com',
					'live.com'
				],

				'mail.ru': [
					// 'rambler.ru',
					// 'qip.ru',
					// 'ya.ru',
					'yandex.ru',
					// 'yandex.ua',
					'yahoo.com',
					'aol.com'
				]
			},

			oauth: {
				'my.com': [
					'gmail.com',
					'hotmail.com',
					'outlook.com',
					'live.com'
				],

				'mail.ru': [
					'gmail.com',
					'outlook.com',
					'hotmail.com',
					'msn.com'
				]
			}
		};

		try {
			return providers[type][project];
		} catch (error) {
			return [];
		}
	},

	/**
	 * Добаавляет список провайдеров
	 *
	 * @param {...Array} providers — список провайдеров
	 */
	set(...providers: Yoda.Provider[]) {
		this.list.push(...providers);
	},

	/**
	 * Возвращает список провайдеров
	 *
	 * @param {Array|null} providers — заданный список провайдеров
	 * @returns {Array}
	 */
	get<T>(providers: string[] | void): T[] {
		if (providers) {
			return this.list.filter((provider: Yoda.Provider) => {
				if (providers.includes(provider.name)) {
					return provider;
				}
			});
		}

		return this.list;
	},

	/**
	 * Поиск провайдера по имени домена или email
	 *
	 * @param {string} domain
	 * @returns {Object}
	 */
	find(domain: string): Yoda.Provider {
		const provider = this.list.find((provider: Yoda.Provider) => {
			for (const alias of provider.hosts) {
				if (alias === domain) {
					return true;
				}
			}
		});

		return provider || {};
	},

	/**
	 * Фильтр провайдеров по заданному предикату
	 *
	 * @param {Function} predicate
	 * @returns {Array}
	 */
	filter<T>(predicate: (provider: string) => boolean): T[] {
		return this.list.filter((provider: string) => {
			return predicate(provider);
		});
	}
};
