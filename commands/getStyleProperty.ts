/**
 * Получение значения CSS свойства для заданного элемента
 * В отличии от стандартного метода getCssProperty значения возвращаются без кавычек
 * А также гарантировано получаются не только из CSS-файлов, но и инлайновых стилей.
 * Стандартный метод если не может получить значение, уходит в вечное ожидание.
 *
 * @alias browser.getStyleProperty
 * @param {string} selector
 * @param {string} property
 * @returns {Object}
 */
browser.addCommand('getStyleProperty', function (selector, property) {
	return browser.selectorExecute(selector, function (element, property) {
		var style = window.getComputedStyle(element[0]),
			value = style[property].replace(/^['"]?|['"]$/g, '');

		return value;
	}, property);
});
