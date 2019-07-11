/// <reference types="@qa/account-manager" />
/// <reference types="@types/webdriverio" />

declare namespace Yoda {
	type Location = string;

	interface Product {
		name: string;
		host: string;
	}

	interface Locators {
		container: string;
		[key: string]: any;
	}

	interface Provider {
		url?: string;
		name: string;
		types: AccountManager.Type[];
		hosts: string[];
		protocols: {
			imap?: {
				host: string;
				tls?: boolean;
				port: number;
			}
		};
	}

	interface Options extends WebdriverIO.Options {
		_: string[];
		grep?: string;
		config?: string;
		log?: boolean;
		verbose?: boolean;
		[name: string]: any;
	}
}
