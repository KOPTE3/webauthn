'use strict';

const https = require('https');
const CAPTCHA_HEADER_NAME = 'X-Captcha-ID';
const CAPTCHA_CRACKER_URL = 'https://c.mail.ru/c/get';

/**
 * Модуль для работы с капчей Mail.Ru
 */
class Captcha {
	/**
	 * Получить заголовок Captcha-Id
	 * @param {string} locator
	 * @returns {Object}
	 */
	static getCaptchaID (locator) {
		let result = browser.executeAsync(
			function renewCaptcha (locator, CAPTCHA_HEADER_NAME, done) {
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
						done(cid);
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
	}

	/**
	 * Получить значение каптчи по заголовку
	 * @param {string} cid
	 * @returns {Promise}
	 */
	static getCaptchaValue (cid) {
		return new Promise((resolve, reject) => {
			let url = `${CAPTCHA_CRACKER_URL}/?cid=${cid}`;

			https.get(url, (res) => {
				let body;

				if (res.statusCode !== 200) {
					resolve('');
				}

				res.on('data', (chunk) => {
					body += chunk;
				});

				res.on('end', () => {
					resolve(body);
				});
			});
		});
	}
}

module.exports = Captcha;
