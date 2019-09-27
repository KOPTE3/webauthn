// tslint:disable:max-line-length
export default {
	internal: {
		baseUrl: 'https://internal.pre.test.mail.ru/api/v1',
		proxyUrl: 'http://ci1.devmail.ru:8001',
		proxyUsername: 'api_test',
		proxyPassword: 'proxy-kruto69',
	},
	api: {
		gibddApiBaseUrl: 'https://api.gibdd.mail.ru',
		cloudApiBaseUrl: 'https://cloud.mail.ru/api/v2',
		authBaseUrl: 'https://auth.mail.ru',
		cloudBaseUrl: 'https://cloud.mail.ru',
		mailBaseUrl: 'https://e.mail.ru',
		accountBaseUrl: 'https://account.test.mail.ru',
		userAgent: 'Yoda'
	},
	cookies: {
		qa: 'noTo1eyiyo8Ohpaegair2Too',
		canary: 'Vae0Hahbkeej8Eeh'
	},
	captcha: {
		CAPTCHA_HEADER_NAME: 'X-Captcha-ID',
		CAPTCHA_CRACKER_URL: 'http://test-proxy.win102.dev.mail.ru/captcha',
		CAPTCHA_URL: 'https://swa.mail.ru/c',
		get CAPTCHA_TIMEOUT(): number {
			if (typeof browser !== 'undefined') {
				return browser.options.waitforTimeout || 30000;
			}
			return 30 * 1000;
		}
	},
	as: {
		url: 'http://as-tarantool.mailautotest.cloud.devmail.ru/accounts',
		testLoginUrl: 'http://ci1.devmail.ru:9997/accounts',
		auth: {
			user: 'feta-accounts',
			password: 'g}94VGAfgizZ'
		}
	},
	auth: {
		login: 'https://auth.mail.ru/cgi-bin/auth',
		logout: 'https://auth.mail.ru/cgi-bin/logout',
		supix: 'https://auth.mail.ru/supix',
		NaviData: 'https://portal.mail.ru/NaviData',
		referer: 'https://account.mail.ru/login',
		ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
		sdc: 'https://auth.mail.ru/sdc?from=https%3A%2F%2Fe.mail.ru%2F'
	},
	files: {
		baseUrl: 'http://files.win102.mail.cloud.devmail.ru/'
	},
	testPushNotificationsSubscription: {
		token: '65126618325:14838322906489354350985028373919997344018607575698298209519830904748015705070522591352296981588061962446733941893726089992087917749836223325',
		settings: {
			capabilities: {
				Filter: {},
				is_active: true,
				chrome_mode: 1
			},
			webpush_keys: {
				p256dh: '123',
				auth: '123'
			}
		},
		platform: 'webpush',
		application: 'mail_e'
	},
	get timeout(): number {
		if (typeof browser !== 'undefined') {
			return browser.options.waitforTimeout || 30000;
		}
		return 30 * 1000;
	}
};
