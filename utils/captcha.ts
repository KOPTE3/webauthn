import * as request from 'request';
import config from '../config';

const debug = require('debug')('@qa:captcha');
const { CAPTCHA_HEADER_NAME, CAPTCHA_CRACKER_URL, CAPTCHA_URL, CAPTCHA_TIMEOUT } = config.captcha;

/**
 * Получить заголовок Captcha-Id по URL
 *
 * @param {string} url
 * @returns {string}
 */
export function getCaptchaIdFromUrl(url: string): string {
	browser.timeouts('script', CAPTCHA_TIMEOUT());

	const result = browser.executeAsync(
		function renewCaptcha(url, CAPTCHA_HEADER_NAME, resolve) {
			const loadImg = () => {
				// Use a native XHR so we can use custom responseType
				const xhr = new XMLHttpRequest();

				xhr.open('GET', url, true);

				// Ask for the result as an ArrayBuffer.
				xhr.responseType = 'arraybuffer';

				xhr.onload = (event) => {
					// Obtain a blob: URL for the image data to draw it
					let cid;
					const arrayBufferView = new Uint8Array(xhr.response);
					const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
					const imageUrl = URL.createObjectURL(blob);

					cid = xhr.getResponseHeader(CAPTCHA_HEADER_NAME);

					// Return result to NodeJS context
					resolve(cid);
				};

				xhr.send();
			};

			loadImg();
		},
		url, CAPTCHA_HEADER_NAME);

	return result.value;
}

/**
 * Получить заголовок Captcha-Id по селектору картинки
 * @param {string} locator
 * @returns {string}
 */
export function getCaptchaID(locator: string): string {
	browser.timeouts('script', CAPTCHA_TIMEOUT());

	const result = browser.executeAsync(
		function renewCaptcha(locator: string, CAPTCHA_HEADER_NAME, resolve) {
			// TODO: воткнуть проверку на img !== null
			const img = document.querySelector(locator) as HTMLImageElement;
			const url = img.src;

			const loadImg = () => {
				// Use a native XHR so we can use custom responseType
				const xhr = new XMLHttpRequest();

				xhr.open('GET', url, true);

				// Ask for the result as an ArrayBuffer.
				xhr.responseType = 'arraybuffer';

				xhr.onload = function(this: XMLHttpRequest, event) {
					// Obtain a blob: URL for the image data to draw it
					let cid;
					const arrayBufferView = new Uint8Array(xhr.response);
					const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
					const imageUrl = URL.createObjectURL(blob);

					img.src = imageUrl;
					cid = xhr.getResponseHeader(CAPTCHA_HEADER_NAME);

					// Return result to NodeJS context
					resolve(cid);
				};

				xhr.send();
			};

			loadImg();
		},
		locator, CAPTCHA_HEADER_NAME);

	return result.value;
}

/**
 * Получить значение каптчи по заголовку
 *
 * @param {string} cid
 * @returns {Promise}
 */
export function getCaptchaValue(cid: any) {
	return new Promise<string>((resolve, reject) => {
		const url = `${CAPTCHA_CRACKER_URL}/${cid}`;

		debug('captcha cracker request: ', url);

		request(url, (error, response, body) => {
			if (error) {
				return reject();
			}

			if (response.statusCode !== 200) {
				debug('captcha cracker error: ', response.statusCode);
				resolve('');
			}

			debug('captcha cracker result:', body);
			resolve(body);
		});
	});
}

export function getCaptchaValueByLocator(locator: string, timeout: number = CAPTCHA_TIMEOUT()): string {
	const cid = getCaptchaID(locator);

	return browser.waitForPromise(
		() => {
			return getCaptchaValue(cid);
		},
		timeout, `Не дождались значения капчи по заданному селектору "${locator}"`);
}

export function getCaptchaValueByUrl(url: string, timeout: number = CAPTCHA_TIMEOUT()): string {
	const cid = getCaptchaIdFromUrl(url);

	return browser.waitForPromise(
		() => {
			return getCaptchaValue(cid);
		},
		timeout, `Не дождались значения капчи по заданному адресу "${url}"`);
}

/** @param {string} variant — доступные значения от 1 до 7 и rusex */
export function getCaptchaValueByVariant(variant: string, timeout: number = CAPTCHA_TIMEOUT()): string {
	const url = `${CAPTCHA_URL}/${variant}?rnd=${Math.random()}`;

	return getCaptchaValueByUrl(url, timeout);
}
