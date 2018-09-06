import * as url from 'url';
import * as Debug from 'debug';
import * as querystring from 'querystring';

const debug = Debug('@qa:yoda');
const TIMEOUT: number = 30 * 1000;

/** Набор методов для работы с URL */
/** @namespace browser */
export default {
	/**
	 * Экранирует сроку для использования в регулярном выражении
	 *
	 * @param {string} text
	 * @returns {string}
	 */
	regexEscape(text: string): string {
		return text.replace(/([.*+?^=!:${}()|[]\/\])/g, '\\$1');
	},

	open(url: string, timeout: number = TIMEOUT): void {
		debug('requested page', url);

		browser.url(url);

		/**
		 * Дожидаемся смены адреса страницы
		 * В идеале, нам было бы достаточно этого указания browser.timeouts,
		 * однако этот тип таймаутов не поддержитвается ни одном современным драйвером.
		 * Более того, в Chrome это приводит к ошибкам вида:
		 *      timeout: cannot determine loading status
		 *
		 * @see https://bugs.chromium.org/p/chromedriver/issues/detail?id=817
		 * @see https://bugs.chromium.org/p/chromedriver/issues/detail?id=402
		 */
		browser.waitForUrl(/data:/, timeout, true);

		debug('actual page', browser.getUrl());
	},

	/**
	 * Сериализует параметры запроса
	 *
	 * @see querystring.stringify
	 * @returns {string}
	 */
	query: querystring.stringify,

	/**
	 * Десериализует параметры запроса
	 *
	 * @see querystring.parse
	 * @returns {Object}
	 */
	parse: querystring.parse,

	/**
	 * Формирует URL
	 *
	 * @param {string} source - исходный URL
	 * @param {Object} [add] - параметры которые добавить
	 * @param {Array} [remove] - параметры которые удалить
	 * @returns {string}
	 */
	format(source: string, add = {}, remove: string[] = []): string {
		const data = url.parse(source);
		const query = this.parse(data.query);

		remove.forEach((name) => {
			delete query[name];
		});

		Object.assign(query, add);

		let result = data.pathname;

		if (Object.keys(query).length) {
			result += `?${this.query(query)}`;
		}

		return result;
	}
};
