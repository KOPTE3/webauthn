import * as url from 'url';
import * as Debug from 'debug';
import * as querystring from 'querystring';
import config from '../config';
import * as md5 from 'md5';

interface Obj { [key: string]: any; }

interface SwaSignatureParams {
	ClientID: string;
	SigTS: number;
	Sig: string;
}

interface ObjectWithSwaSignatureParams extends Obj, SwaSignatureParams {
}

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
		let query: querystring.ParsedUrlQuery = {};

		if (data.query) {
			query = this.parse(data.query);
		}

		remove.forEach((name) => {
			delete query[name];
		});

		Object.assign(query, add);

		let result = data.pathname;

		if (Object.keys(query).length) {
			result += `?${this.query(query)}`;
		}

		return result as string;
	}
};

export function getSwaSignatureParams(query: {[key: string]: any} = {}): SwaSignatureParams {
	const queryCopy: Obj = {
		...query,
		ClientID: config.api.ClientID,
		SigTS: Date.now()
	};

	const swaSig = md5(Object.keys(queryCopy).sort().map((key) => {
		return `${key}=${queryCopy[key as any]}`;
	}).join('') + config.api.ClientSecret);

	return {
		ClientID: queryCopy.ClientID,
		SigTS: queryCopy.SigTS,
		Sig: swaSig
	};
}

export function addSwaSignatureParams(query: {[key: string]: any} = {}): ObjectWithSwaSignatureParams {
	const swaSignatureParams = getSwaSignatureParams(query);
	return { ...query,  ...swaSignatureParams };
}
