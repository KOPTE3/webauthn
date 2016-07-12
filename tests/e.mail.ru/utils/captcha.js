'use strict';

const http = require('http');
const debug = require('debug')('captcha');

const CAPTCHA_HEADER_NAME = 'X-Captcha-ID';
const CAPTCHA_CRACKER_URL = 'http://test-proxy.win102.dev.mail.ru/captcha';

/**
 * Модуль для работы с капчей Mail.Ru
 */
module.exports = {
	/**
	 * Получить заголовок Captcha-Id
	 * @param {string} locator
	 * @returns {Object}
	 */
	getCaptchaID (locator) {
		let result = browser.timeoutsAsyncScript(5000).executeAsync(
			function renewCaptcha (locator, CAPTCHA_HEADER_NAME, resolve) {
				var img = document.querySelector(locator);
				var url = img.src;

				var loadImg = function () {
					// Use a native XHR so we can use custom responseType
					var xhr = new XMLHttpRequest();

					xhr.open('GET', url, true);

					// Ask for the result as an ArrayBuffer.
					xhr.responseType = 'arraybuffer';

					xhr.onload = function (event) {
						// Obtain a blob: URL for the image data to draw it
						var cid;
						var arrayBufferView = new Uint8Array(this.response);
						var blob = new Blob([arrayBufferView], {type: 'image/jpeg'});
						var imageUrl = URL.createObjectURL(blob);

						img.src = imageUrl;
						cid = this.getResponseHeader(CAPTCHA_HEADER_NAME);

						// Return result to NodeJS context
						resolve(cid);
					};

					xhr.send();
				};

				loadImg();
			}, locator, CAPTCHA_HEADER_NAME
		);

		return {
			isOK: result.state === 'success',
			value: result.value
		};
	},

	/**
	 * Получить значение каптчи по заголовку
	 * @param {string} cid
	 * @returns {Promise}
	 */
	getCaptchaValue (cid) {
		return new Promise((resolve, reject) => {
			let url = `${CAPTCHA_CRACKER_URL}/${cid}`;


			debug('captcha cracker requst: ', url);
			http.get(url, result => {
				let body = '';

				if (result.statusCode !== 200) {
					debug('captcha cracker err: ', res.statusCode);
					resolve('');
				}

				result.on('data', chunk => {
					body += chunk;
				});

				result.on('end', () => {
					debug('captcha cracker result:', body);
					resolve(body);
				});
			});
		});
	}
};
