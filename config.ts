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
		CAPTCHA_TIMEOUT: () => browser.options.waitforTimeout || 30000
	}
};
