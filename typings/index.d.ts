///<reference path="./types.d.ts" />

declare type AnyPromise = Promise<any>;

declare namespace WebdriverIO {

	export interface VisualDiff {
		isExactSameImage: boolean;
	}

	export interface ScreenshotOptions {
		/**
		 * Задает название скриншота
		 * (для случаев когда в одном тесте их несколько)
		 */
		title?: string;

		/** Скрывает заданные элементы **/
		hide?: string[];

		/** Удаляет заданные элементы **/
		remove: string[];

		/** Задает размер изображениям (desktop) **/
		widths: number[];

		/** Устанавливает ориентацию (mobile) **/
		orientations: number[];

		/** Задает границы поиска несоотвествий (от 0 до 100) **/
		misMatchTolerance: number;

		/**
		 * Устанавливает время ожидания после
		 * изменения раземеров вьюпорта
		 **/
		viewportChangePause: number;
	}

	export interface Client<T> {
		checkDocument(options?: ScreenshotOptions): VisualDiff[];
		checkViewport(options?: ScreenshotOptions): VisualDiff[];
		checkElement(locator?: ScreenshotOptions, options?): VisualDiff[];
	}

}


declare namespace Yoda {

	class DefaultPage {

		/**
		 * Авторизация
		 *
		 * @param type — тип авторизации
		 * @param [credentials] — авторизационые данные
		 */
		static auth(type, credentials?: Credentials);

		/**
		 * Открытие страницы
		 *
		 * @param [path] - путь, который нужно подставить к location
		 * @param {Object} [query] — параметры запроса
		 */
		open(path?: string, query?: Object): boolean;

		/**
		 * @deprecated
		 */
		static open();
	}

	interface Credentials {
		username?: string;
		email?: string;
		password?: string;
		domain?: string;
	}

	interface AuthorizationStore {
		get(propertyName: string);
	}

}

declare module "@qa/yoda/pages" {
	export = PageObject;
}

declare module "@qa/yoda/steps" {
	export = Steps;
}

declare module "@qa/yoda/utils/account";
//
// declare namespace Login {
// 	class FormSteps {
// 		selectDomain (domain: string);
// 		setCredentials (credentials: Yoda.Credentials, mobile?: boolean);
// 		clickSignInButton ();
// 	}
//
// 	type FormStepsClass = new () => FormSteps;
// }

// declare module "login.mail.ru/tests/steps/login";
// declare module "login.mail.ru/tests/steps/login/form"  {
// 	var FormSteps: Login.FormStepsClass;
//
// 	export = FormSteps;
// }
