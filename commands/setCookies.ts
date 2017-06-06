/**
 * Устанавливает набор кук
 *
 * @alias browser.setCookies
 * @see https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#cookie-json-object
 * @param {Array.<Object>} cookies
 * @returns {Promise}
 */
browser.addCommand('setCookies', function (cookies) {
	return cookies.reduce((previous, current) => {
		return browser.setCookie(current);
	},
	cookies[0]);
});
