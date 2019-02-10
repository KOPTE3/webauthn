import DefaultPage, { Query } from '../pages/index';
import DefaultSteps from '../steps/index';
import Authorization, { AccountCredentials, CommonAccount, Type } from '../utils/authorization';
import * as assert from 'assert';
import Element from './index';

/**
 * Класс, представляющий собой абстракцию над определённой страницей
 * имеет location и методы авторизации и открытия страницы
 * @class Page
 */
export class Page extends Element {
	/** location страницы */
	protected location: string;

	@step('Открываем страницу со следующими get-параметрами:', (p: any) => p)
	static open(query?: Query, skipLoadWaiting?: boolean): void {
		const q: Query = query || {};
		if (q.ftrs && Array.isArray(q.ftrs)) {
			q.ftrs = q.ftrs.join(' ');
		}

		const temp = new DefaultPage();
		const page = new this();

		temp.open(page.location, query);

		if (!skipLoadWaiting) {
			page.waitForVisible(true);
		}
	}

	static Auth(type?: Type, select?: Partial<CommonAccount>): CommonAccount;
	static Auth(email: string, password: string): CommonAccount;
	static Auth(credentials: AccountCredentials): CommonAccount;
	static Auth(arg0?: any, arg1?: any): CommonAccount {
		return Authorization.auth(arg0, arg1);
	}

	@step('Проверить, что текущий урл содержит следующие GET-параметры', (p: any) => p)
	static CheckQueryParams(expectedParams: { [ name: string ]: string }): void {
		const url: string = decodeURIComponent(browser.getUrl());

		const actualParams: { [ name: string ]: string } = {};

		url
			.slice(url.indexOf('?') + 1)
			.split('&')
			.map((stringPair) => stringPair.split('='))
			.forEach(([ key, value ]) => {
				actualParams[ key ] = value;
			})
		;

		Object
			.entries(expectedParams)
			.forEach(([ key, expectedValue ]) => {
				assert(!!actualParams[ key ]);
				assert(actualParams[ key ].includes(expectedValue));
			})
		;
	}

	static WaitForUrl(value: ((url: string) => boolean) | string | RegExp): void {
		const s = new DefaultSteps();
		assert.ok(s.waitForUrl(value), 'Не дождались, пока url страницы примет необходимое значение');
	}
}

export default Page;
