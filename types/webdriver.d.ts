declare namespace WebdriverIO {
	type ElementLink = WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>> & WebdriverIO.RawResult<WebdriverIO.Element>;

	interface Size {
		width: number;
		height: number;
	}

	interface ScreenshotOptions {
		exclude?: string[] | Object;
		hide?: string[];
		widths?: number[];
		orientations?: number[];
		viewportChangePause?: number;
		misMatchTolerance?: number;
		remove?: string[];
	}

	interface Options {
		host?: string;
		verbose?: boolean;
		spec?: string;
		suite?: string;
		port?: number;
		path?: string;
		user?: string;
		key?: string;
		specs?: string[];
		exclude?: string[];
		maxInstances?: number;
		capabilities?: Selenium.desiredCapabilities;
		debug?: boolean;
		execArgv?: string[] | null;
		protocol: string;
		sync?: boolean;
		logLevel: string;
		coloredLogs: boolean;
		bail: number;
		screenshotPath: string;
		baseUrl: string;
		hostname?: string;
		waitforTimeout: number;
		plugins?: Object;
		framework?: string;
		reporters?: string[];
		reporterOptions?: {
			outputDir?: string;
			[key: string]: any;
		};
		mochaOpts?: {
			[key: string]: any;
		};

		onPrepare<T>(
			config: any,
			capabilities: Selenium.desiredCapabilities
		): Promise<T> & void;

		beforeSession<T>(
			config: any,
			capabilities: Selenium.desiredCapabilities,
			specs: any
		): Promise<T> & void;

		before<T>(
			config: any,
			specs: any
		): Promise<T> & void;

		beforeSuite<T>(
			suite: any,
		): Promise<T> & void;

		beforeHook<T>(): Promise<T> & void;
		afterHook<T>(): Promise<T> & void;
		beforeTest<T>(test: any): Promise<T> & void;

		beforeCommand<T>(
			commandName: any,
			args: any,
			result: any,
			error: any
		): Promise<T> & void;

		afterTest<T>(
			test: any,
		): Promise<T> & void;

		afterSuite<T>(
			suite: any,
		): Promise<T> & void;

		after<T>(
			result,
			capabilities: Selenium.desiredCapabilities,
			specs: any
		): Promise<T> & void;

		afterSession<T>(
			config: any,
			capabilities: Selenium.desiredCapabilities,
			specs: any
		): Promise<T> & void;

		onComplete<T>(
			exitCode: number,
		): Promise<T> & void;

		beforeFeature<T>(
			feature: any
		): Promise<T> & void;

		beforeScenario<T>(
			scenario: any
		): Promise<T> & void;

		beforeStep<T>(
			step: any
		): Promise<T> & void;

		afterStep<T>(
			stepResult: any
		): Promise<T> & void;

		afterScenario<T>(
			scenario: any
		): Promise<T> & void;

		afterFeature<T>(
			feature: any
		): Promise<T> & void;

		desiredCapabilities: DesiredCapabilities;
		[key: string]: any;
	}

	interface Client<T> {
		desiredCapabilities: Selenium.desiredCapabilities;

		reload(): Client<void>;
		getUrl(): string;
		isVisible(selector?: string): boolean;
		isVisible<P>(selector?: string): boolean;
		alertText<P>(): string;
		setViewportSize(Size): Client<void>;

		waitUntil(
			condition: () => boolean | Promise<boolean>,
			timeout?: number,
			timeoutMsg?: string,
			interval?: number
		): Client<boolean> & boolean;

		// wdio-screenshot
		checkDocument(ScreenshotOptions): any;
		checkViewport(ScreenshotOptions): any;
		checkElement(ScreenshotOptions): any;

		// @qa/wdio-api
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

		getStyleProperty(
			selector: string,
			property: string
		): Object | null;

		hasAlert(): boolean;

		waitAlert(
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
			promise: () => Promise<T> | Promise<T>,
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

declare class WebdriverIO {
	static Launcher: {
		new (file: string, data: Yoda.Options);
	}
}
