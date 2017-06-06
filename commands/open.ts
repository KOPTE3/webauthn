/**
 * Запрашивает ресурс
 */
browser.addCommand('open', function (url) {
	return browser.getUrl(url);
});
