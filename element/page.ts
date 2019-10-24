import * as assert from 'assert';
import DefaultPage, { Query } from '../pages/index';
import DefaultSteps from '../steps/index';
import Authorization, { AccountCredentials, CommonAccount, Type } from '../utils/authorization';
import Element from './index';
import { URL } from 'url';

/**
 * Класс, представляющий собой абстракцию над определённой страницей
 * имеет location и методы авторизации и открытия страницы
 * @class Page
 */
export class Page<Params extends object = any> extends Element<Params> {
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
	static CheckQueryParams(params: { [ name: string ]: string | RegExp }): void {
		const url = new URL(browser.getUrl());

		Object
			.entries(params)
			.forEach(([key, expectedValue]) => {
				if (expectedValue instanceof RegExp) {
					assert(
						url.searchParams.getAll(key).some((item) => !!item.match(expectedValue)),
						`Текущий урл не содержит параметр ${key} ~ ${expectedValue}`);
					return;
				}
				assert(
					url.searchParams.getAll(key).includes(expectedValue),
					`Текущий урл не содержит параметр ${key}=${expectedValue}`);
			})
		;
	}

	@step('Проверить, что текущий урл не содержит GET-параметры: {params}', (p: any) => p)
	static HasNoQueryParams(params: string[]): void {
		const url = new URL(browser.getUrl());

		params.forEach((parameter) => {
			assert(
				!url.searchParams.has(parameter),
				`Текущий урл содержит параметр ${parameter}, и его зачение: ${url.searchParams.get(parameter)}`);
		});
	}

	static WaitForUrl(value: ((url: string) => boolean) | string | RegExp): void {
		const s = new DefaultSteps();
		assert.ok(s.waitForUrl(value), 'Не дождались, пока url страницы примет необходимое значение');
	}
}

export default Page;
