/**
 * Дожидается появления требуемого адреса
 */
browser.addCommand('waitForUrl', function (value, timeout, revert) {
	let url, actual;

	try {
		return browser.waitUntil(() => {
			url = browser.getUrl();
			actual = value === url;

			// Удаляем / на конце, который добавляет Selenium
			if (typeof value === 'string' && !value.endsWith('/')) {
				url = url.replace(/\/$/, '');
			}

			if (typeof value === 'function') {
				actual = value(url);
			} else if (value[Symbol.match]) {
				actual = value.test(url);
			}

			if (revert) {
				actual = !actual;
			}

			return value && actual;
		}, timeout, '');
	} catch (error) {
		let message = 'Could not wait for required url:';
			message += `\n\tActual: ${url}`;
			message += `\n\tExpected: ${value}`;

		throw new Error(message);
	}
});
