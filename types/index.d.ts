declare namespace Yoda {
	type Location = string;

	interface Product {
		name: string,
		host: string
	}

	interface Locators {
		container: string;
		[key: string]: any;
	}

	interface Provider {
		url?: string,
		name: string,
		types: AccountManager.Type[],
		hosts: string[],
		protocols: {
			imap?: {
				host: string
				tls?: boolean,
				port: number
			}
		}
	}

	interface Options {
		grep?: string;
		config?: string;
		suite?: string;
		spec?: string;
		log?: boolean;
		host?: string;
		verbose?: boolean;
		port?: number;
		path?: string;
		user?: string;
		key?: string;
		specs?: string[];
		exclude?: string[];
		maxInstances?: number;
		capabilities?: Selenium.desiredCapabilities;
		debug?: boolean | number;
		execArgv?: string[] | null;
		protocol?: string;
		sync?: boolean;
		logLevel?: string;
		coloredLogs?: boolean;
		bail?: number;
		screenshotPath?: string;
		baseUrl?: string;
		hostname?: string;
		waitforTimeout?: number;
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
	}
}
