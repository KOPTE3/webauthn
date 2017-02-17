declare namespace Selenium {
	type LoggingPreferenceType =
		'OFF'   | 'SEVERE' | 'WARNING' |
		'INFO'  | 'CONFIG' | 'FINE' |
		'FINER' | 'FINEST' | 'ALL'

	interface LoggingPreferences {
		browser?: LoggingPreferenceType;
		driver?: LoggingPreferenceType;
		server?: LoggingPreferenceType;
		client?: LoggingPreferenceType;
	}

	interface desiredCapabilities {
		browserName: string;
		version: string;
		platform: string;

		// Read-only capabilities
		cssSelectorsEnabled?: boolean;
		handlesAlerts?: boolean;

		// Read-write capabilities
		javascriptEnabled?: boolean;
		databaseEnabled?: boolean;
		locationContextEnabled?: boolean;
		applicationCacheEnabled?: boolean;
		browserConnectionEnabled?: boolean;
		webStorageEnabled?: boolean;
		acceptSslCerts?: boolean;
		rotatable?: boolean;
		nativeEvents?: boolean;
		proxy?: any;
		unexpectedAlertBehaviour?: string;
		elementScrollBehavior?: number;

		// RemoteWebDriver specific
		'webdriver.remote.sessionid'?: string;
		'webdriver.remote.quietExceptions'?: boolean;

		// Grid-specific
		seleniumProtocol?: string;
		maxInstances?: number;
		environment?: string;

		// Selenium RC (1.0) only
		commandLineFlags?: string;
		executablePath?: string;
		timeoutInSeconds?: number;
		onlyProxySeleniumTraffic?: boolean;
		avoidProxy?: boolean;
		proxyEverything?: boolean;
		proxyRequired?: boolean;
		browserSideLog?: boolean;
		optionsSet?: boolean;
		singleWindow?: boolean;
		dontInjectRegex?: RegExp;
		userJSInjection?: boolean;
		userExtensions?: string;

		// Selenese-Backed-WebDriver specific
		'selenium.server.url'?: string;

		loggingPrefs?: {
			browser?: LoggingPreferences;
			driver?: LoggingPreferences;
			server?: LoggingPreferences;
			client?: LoggingPreferences;
		};

		// Firefox
		firefox_binary?: string;
		firefoxProfileTemplate?: string;
		captureNetworkTraffic?: boolean;
		addCustomRequestHeaders?: boolean;
		trustAllSSLCertificates?: boolean;
		changeMaxConnections?: boolean;
		profile?: string;
		pageLoadingStrategy?: string

		// IE specific
		'ie.forceCreateProcessApi'?: boolean;
		'ie.browserCommandLineSwitches'?: string;
		'ie.usePerProcessProxy'?: boolean;
		'ie.ensureCleanSession'?: boolean;
		'ie.setProxyByServer'?: boolean;
		ignoreProtectedModeSettings?: boolean;
		ignoreZoomSetting?: boolean;
		initialBrowserUrl?: string;
		enablePersistentHover?: boolean;
		enableElementCacheCleanup?: boolean;
		requireWindowFocus?: boolean;
		browserAttachTimeout?: number;
		logFile?: string;
		logLevel?: string;
		host?: string;
		extractPath?: string;
		silent?: string;
		killProcessesByName?: boolean;

		// Safari specific
		'safari.options'?: Object;
		cleanSession?: boolean;

		// Chrome specific
		chromeOptions?: {
			args?: string[];
			binary?: string;
			extensions?: string[];
			localState?: Object;
			detach?: boolean;
			debuggerAddress?: string;
			excludeSwitches?: string[];
			minidumpPath?: string;
			mobileEmulation?: Object;
			perfLoggingPrefs?: Object;
			windowTypes?: string[];
		}

		perfLoggingPrefs?: {
			enableNetwork?: boolean;
			enablePage?: boolean;
			enableTimeline?: boolean;
			tracingCategories?: boolean;
			bufferUsageReportingInterval?: boolean;
		}

		// RC
		honorSystemProxy?: boolean;
		ensureCleanSession?: boolean;
	}

	interface ProxyObject {
		proxyType?: string;
		proxyAutoconfigUrl?: string;
		ftpProxy?: string;
		httpProxy?: string;
		sslProxy?: string;
		socksProxy?: string;
		socksUsername?: string;
		socksPassword?: string;
		noProxy?: string;
	}

	interface FirefoxProfile {
		'webdriver.log.driver'?: string;
		'webdriver.log.file'?: string;
		'webdriver.load.strategy'?: string;
		webdriver_accept_untrusted_certs?: boolean;
		webdriver_assume_untrusted_issuer?: boolean;
		webdriver_firefox_port?: number;
	}
}