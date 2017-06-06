/**
 * Команда дожидается заданного класса у элемента
 */
browser.addCommand('waitForClass', function (selector, name = '', reverse = false) {
	return browser.waitUntil(() => {
		return browser.hasClass(selector, name) !== reverse;
	});
});
