/**
 * Команда проверяет наличие у элемента заданного класса
 */
browser.addCommand('hasClass', function (selector, name = '') {
	let actual = browser.getAttribute(selector, 'class');
		actual = actual.split(' ');

	return actual.includes(name);
});
