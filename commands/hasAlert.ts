/**
 * Проверяет наличие стандартного диалогового окна alert
 * @see https://github.com/webdriverio/webdriverio/issues/1788
 */
browser.addCommand('hasAlert', function () {
	try {
		browser.getTitle();
	}
	catch (error) {
		return error.seleniumStack.type === 'UnexpectedAlertOpen';
	}

	return false;
});
