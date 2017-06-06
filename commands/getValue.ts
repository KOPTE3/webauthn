import * as assert from 'assert';

/**
 * Исправление предопреденного поведения когда метод
 * может возвращать элемент или массив элементов
 *
 * Методы определены в одном файле для того чтобы гарантировать
 * применение переопределенного метода
*/

let _getValue = browser.getValue;

browser.addCommand('getValue', function (selector) {
	let result = _getValue.apply(this, arguments);

	if (Array.isArray(result)) {
		throw new assert.AssertionError({
			message: `Found several elements by given selector, expected one "${selector}"`,
			expected: 'One item on page',
			actual: 'Several elements',
		});
	}

	return result;
}, true);

browser.addCommand('getValues', function (selector) {
	let { value: elements } = this.elements(selector);

	return elements.map(({ ELEMENT }) => {
		let { value } = this.elementIdValue(ELEMENT);

		return value;
	});

	return result;
});
