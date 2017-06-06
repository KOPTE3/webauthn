let { waitforTimeout = 10 * 1000 } = browser.options;

/**
 * Ожидаем пока появится стандартное диалоговое окно alert
 */
browser.addCommand('waitForAlert', function (timeout = waitforTimeout, message = '', reverse = false) {
	if (message) {
		message = `: ${message}`;
	}

	try{
		browser.waitUntil(browser.hasAlert, timeout, `waitForAlert${message}`);
	} catch(error) {
		if (error.type === 'WaitUntilTimeoutError') {
			if (reverse) {
				return;
			} else {
				throw new Error(`Could not wait for the required alert${errorMsg}`);
			}
		} else {
			throw new Error(error);
		}
	}

	if (reverse) {
		throw new Error(`Unexpected alert${errorMsg}`);
	}
});
