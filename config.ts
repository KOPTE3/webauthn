// tslint:disable:max-line-length
export default {
	api: {
		internalApiBaseUrl: 'http://internal.pre.win102.dev.mail.ru/api/v1',
		cloudApiBaseUrl: 'https://cloud.mail.ru/api/v2',
		authBaseUrl: 'https://auth.mail.ru/',
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
		testLoginUrl: 'http://ci2.dev.mail.ru:9997/accounts',
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
	get timeout(): number {
		if (typeof browser !== 'undefined') {
			return browser.options.waitforTimeout || 30000;
		}
		return 30 * 1000;
	}
};
