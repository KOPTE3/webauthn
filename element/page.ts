import DefaultPage, { Query } from '../pages/index';
import Authorization, { AccountCredentials, CommonAccount, Type } from '../utils/authorization';
import Element from './index';
import Browser from '../browser/browser';

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

	static WaitForUrl(value: ((url: string) => boolean) | string | RegExp): void {
		Browser.WaitForUrl(value);
	}

	static CheckQueryParams(params: { [ name: string ]: string | RegExp }): void {
		Browser.CheckQueryParams(params);
	}

	static HasNoQueryParams(params: string[]): void {
		Browser.HasNoQueryParams(params);
	}
}

export default Page;
