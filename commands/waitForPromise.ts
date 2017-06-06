let { waitforTimeout = 10 * 1000 } = browser.options;
let lastMessage = '';

/**
 * Дожидается выполнения промиса и возвращает результат
 */
browser.addCommand('waitForPromise', (promise, timeout = waitforTimeout, message = '') => {
	let result = null;

	browser.waitUntil(function async () {
		return new Promise((resolve, reject) => {
			global.setTimeout(() => {
				console.error('Rejection error:', lastMessage);
			}, waitforTimeout);

			if (typeof promise === 'function') {
				promise = promise();
			}

			promise.then(response => {
				result = response;
				resolve(true);
			},
			error => {
				lastMessage = error;
				resolve(false);
			});
		});
	}, waitforTimeout, `Timeout of ${waitforTimeout}ms exceeded. ${message}`);

	return result;
});

