/**
 * Возвращает адрес текущий страницы
 * В отличии от стандартного метода browser.getUrl наш не добавлят лишний слеш в конце адреса
 */
browser.addCommand('getUrl', function () {
	let { value } = browser.execute(function () {
		return window.location.href;
	});

	return value;
}, true);
