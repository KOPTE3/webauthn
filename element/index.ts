/// <reference path="./index.gen.ts" />
import * as assert from 'assert';

/**
 * Класс, представляющий собой абстракцию над любым элементом страницы
 * имеет локатор и название
 * @class Element
 */
export class Element {
	/** родительский элемент (если есть) */
	public parent?: Element | null;

	/** локатор элемента (css-селектор) */
	protected locator: string = 'html';
	/** название элемента */
	protected name: string = 'Элемент';
	protected params: any = null;

	constructor();

	constructor(parent: Element);

	constructor(locator: string, name?: string);

	constructor(parent: Element, locator: string, name?: string);

	constructor(params: any);

	constructor(parent: Element, params: any);

	constructor(...args: any[]) {
		if (args[0] instanceof Element) {
			this.parent = args.shift();
		}

		if (args.length === 0) {
			return;
		}

		if (typeof args[0] === 'string') {
			this.locator = args[0];
			if (typeof args[1] === 'string' && args[1]) {
				this.name = args[1];
			}

			return;
		}

		if (args[0] && typeof args[0] === 'object') {
			this.params = args[0];

			return;
		}

		const ClassName: string = this.constructor && this.constructor.name || 'Element';
		throw new Error(`Invalid creation of element ${ClassName}`);
	}

	@gen
	static GetVisible(element: Element): boolean {
		return browser.isVisible(element.Locator());
	}

	@gen
	@step('Проверяем, что элемент {element} {expected ? "видим" : "не видим"} на экране')
	static CheckVisible(element: Element, expected: boolean): void {
		const actual = Element.GetVisible(element);

		assert.strictEqual(
			actual,
			expected,
			`Видимость элемента ${element.Name()} (${actual}) не совпадает с ожидаемым значением (${expected})`
		);
	}

	@gen
	@step('Дожидаемся, пока элемент {element} станет {expected ? "видим" : "не видим"} на экране')
	static WaitForVisible(element: Element, expected: boolean, timeout?: number): void {
		browser.waitForVisible(
			element.Locator(),
			timeout || browser.options.waitforTimeout,
			expected === false
		);
	}

	@gen
	@step('Устанавливаем значение элемента {element}', (e: any, t: string) => ({ 'Значение': t }))
	static SetValue(element: Element, text: string): void {
		const locator = element.Locator();
		browser.setValue(locator, text);
	}

	@gen
	@step('Получаем значение элемента {element}', (e: any, r: string) => ({ 'Значение равно': r }))
	static GetValue(element: Element): string {
		const locator = element.Locator();
		return browser.getValue(locator);
	}

	@gen
	@step('Проверяем, что элемент {element} содержит в себе текст {expected}')
	static CheckValue(element: Element, expected: string): void {
		const actual = Element.GetValue(element);

		assert.strictEqual(
			actual,
			expected,
			`Текст в элементе ${element.Name()} (${actual}) не совпадает с ожидаемым значением (${expected})`
		);
	}

	@gen
	@step('Печатаем в элементе {element} текст', (_: any, text: string) => ({ text }))
	static TypeValue(element: Element, text: string): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);
		el.elementIdClick(el.value.ELEMENT);
		el.elementIdClear(el.value.ELEMENT);
		el.keys(text);
	}

	@gen
	@step('Кликаем по элементу {element}')
	static ClickTo(element: Element): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);
		el.elementIdClick(el.value.ELEMENT);
	}

	@gen
	static GetTextContent(element: Element): string {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);
		const { value } = el.elementIdText(el.value.ELEMENT);
		return value;
	}

	@gen
	@step('Проверяем, что текст в элементе {element} совпадает с', (e: any, expected: string) => ({ expected }))
	static CheckTextContent(element: Element, expected: string): void {
		const actual = Element.GetTextContent(element);

		assert.strictEqual(
			actual,
			expected,
			`Текстовое содержимое элемента ${element.Name()} (${actual}) не совпадает с ожидаемым значением (${expected})`
		);
	}

	@gen
	@step(
		'Дожидаемся, пока текст в элементе {element} станет равен значению',
		(e: any, expected: string) => ({ expected })
	)
	static WaitForTextContent(element: Element, expected: string, timeout?: number): void {
		browser.waitUntil(
			() => Element.GetTextContent(element) === expected,
			timeout || browser.options.waitforTimeout,
			`Не удалось дождаться пока текстовое содержимое элемента ${element.Name()}\
			 не совпадает с ожидаемым значением (${expected})`
		);
	}

	public Locator(): string {
		const locator = this.locator;
		if (this.parent) {
			return this.parent.wrapChildLocator(locator);
		}

		return locator;
	}

	public Name(): string {
		return this.name;
	}

	public toString(): string {
		return this.Name();
	}

	protected wrapChildLocator(childLocator: string): string {
		return `${this.Locator()} ${childLocator}`;
	}
}

export default Element;
