/// <reference types="@types/webdriverio" />

declare namespace WebdriverIO {
	type ElementLink = WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>> & WebdriverIO.RawResult<WebdriverIO.Element>;

	interface VisualRegression {
		isExactSameImage: boolean;
		misMatchPercentage: number;
		isWithinMisMatchTolerance: boolean;
		isSameDimensions: boolean;
	}

	interface ScreenshotOptions {
		/** Исключает заданные фрагмены **/
		// exclude?: string[] | Object[];

		/** Удаляет заданные элементы **/
		remove?: string[];

		/** Скрывает заданные элементы **/
		hide?: string[];
	}

	export interface VisualRegressionOptions extends ScreenshotOptions {
		/** Исключает заданные фрагмены **/
		// exclude?: string[] | Object[];

		/** Удаляет заданные элементы **/
		remove?: string[];

		/** Скрывает заданные элементы **/
		hide?: string[];

		/** Задает размер изображениям (desktop) **/
		widths?: number[];

		/** Устанавливает ориентацию (mobile) **/
		orientations?: Array<'landscape' | 'portrait'>;

		/** Задает границы поиска несоотвествий (от 0 до 100) **/
		misMatchTolerance?: number;

		/**
		 * Устанавливает время ожидания после
		 * изменения раземеров вьюпорта
		 **/
		viewportChangePause?: number;
	}

	// wdio-visual-regression-service
	export interface Client<T> {
		checkDocument(
			options?: VisualRegressionOptions
		): VisualRegression[];

		checkViewport(
			options?: VisualRegressionOptions
		): VisualRegression[];

		checkElement(
			locator?: string,
			options?: VisualRegressionOptions
		): VisualRegression[];
	}

	// wdio-screenshot
	interface Client<T> {
		saveViewportScreenshot(
			file: string,
			options?: ScreenshotOptions
		): Client<string> & string;

		saveViewportScreenshot(
			options?: ScreenshotOptions
		): Client<string> & string;

		saveDocumentScreenshot(
			file: string,
			options?: ScreenshotOptions
		): Client<string> & string;

		saveDocumentScreenshot(
			options?: ScreenshotOptions
		): Client<string> & string;

		saveElementScreenshot(
			file: string,
			locator: string,
			options?: ScreenshotOptions
		): Client<string> & string;
	}

	interface Client<T> {
		addHiddenValue(
			selector: string,
			name: string,
			value: string | number
		): Client<void> | void;

		fill(
			selector: string,
			data: Object | string,
			submit?: boolean
		): void;

		getCurrentUrl(): string;

		getText(
			selector?: string
		): Client<string> & string;

		getTexts(
			selector?: string
		): Client<string[]> & string[];

		getStyleProperty(
			selector: string,
			property: string
		): Object | null;

		hasAlert(): boolean;

		waitForAlert(
			timeout?: number,
			message?: string,
			reverse?: boolean
		): void;

		hasClass(
			selector: string,
			name: string
		): boolean;

		setHiddenValue(
			selector: string,
			value: string
		): void;

		waitForPromise<T>(
			promise: () => Promise<any> | WebdriverIO.Client<WebdriverIO.RawResult<any>> | WebdriverIO.RawResult<any>,
			timeout?: number,
			message?: string
		): any;

		waitForUrl (
			value: ((url: string) => boolean) | string | RegExp,
			timeout?: number,
			revert?: boolean
		): boolean;

		inject(file: string): string;
		open(url: string): string;
		setCookies(cookies: string[]): void;
		switchToNextTab(): void;
	}
}

declare namespace VisualRegressionCompare {
	export interface Context {
		type: string;
		test: {
			title: string;
			parent: string;
			file: string;
		};
		browser: WebdriverIO.Client<any>;
		specs: string[];
		desiredCapabilities: WebdriverIO.DesiredCapabilities;
	}

	export interface Methods {
		// Возвращает имя файла эталонного скриншота
		referenceName?(context: Context): void;

		// Возвращает имя файла текущего скриншота
		screenshotName?(context: Context): void;

		// Возвращает имя файла скриншота с попиксельной разницей
		diffName?(context: Context): void;

		// Задает значение артефактов
		misMatchTolerance?: number;
	}

	export interface LocalCompare {
		new(options: Methods): WebdriverIO.Hooks;
	}

	export interface SaveScreenshot {
		new(options: Methods): WebdriverIO.Hooks;
	}

	export let LocalCompare: LocalCompare;
}

declare module 'wdio-visual-regression-service/compare' {
	export = VisualRegressionCompare;
}
