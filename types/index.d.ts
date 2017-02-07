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
		remove?: string[];

		/** Задает размер изображениям (desktop) **/
		widths?: number[];

		/** Устанавливает ориентацию (mobile) **/
		orientations?: number[];

		/** Задает границы поиска несоотвествий (от 0 до 100) **/
		misMatchTolerance?: number;

		/**
		 * Устанавливает время ожидания после
		 * изменения раземеров вьюпорта
		 **/
		viewportChangePause?: number;
	}

	export interface Client<T> {
		checkDocument(options?: ScreenshotOptions): VisualDiff[];
		checkViewport(options?: ScreenshotOptions): VisualDiff[];
		checkElement(locator?: ScreenshotOptions, options?): VisualDiff[];
	}
}

declare namespace Yoda {
	interface Credentials {
		id?: number;
		username: string;
		email?: string;
		password: string;
		domain?: string;
	}

	interface CredentialsGetterOptions {
		domain: string;
	}
}

declare module '@qa/yoda/pages' {
	export = PageObject;
}

declare module '@qa/yoda/steps' {
	export = Steps;
}

declare module "@qa/yoda/store/authorization"  {
	import * as AccountManager from '@qa/account-manager';
}
