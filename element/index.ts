/// <reference path="./index.gen.ts" />
import * as assert from 'assert';
import * as Debug from 'debug';
import Browser from '../browser/browser';
import { UNICODE_CHARACTERS } from '../utils/constants';

const debug = Debug('@qa:yoda');

function tryToGetGetterDescriptor(obj: object, field: string): PropertyDescriptor | null {
	while (obj) {
		const descriptor = Reflect.getOwnPropertyDescriptor(obj, field);
		if (descriptor && descriptor.get) {
			return descriptor;
		}
		obj = Reflect.getPrototypeOf(obj);
	}

	return null;
}

/**
 * Класс, представляющий собой абстракцию над любым элементом страницы
 * имеет локатор и название
 * @class Element
 */
export class Element<Params extends object = any> {
	/** родительский элемент (если есть) */
	public parent?: Element | null;

	/** локатор элемента (css-селектор) */
	protected locator: string;
	/** название элемента */
	protected name: string;
	protected params: Params;

	constructor();

	constructor(parent: Element);

	constructor(locator: string, name?: string);

	constructor(parent: Element, locator: string, name?: string);

	constructor(params: Params);

	constructor(parent: Element, params: Params);

	constructor(...args: any[]) {
		const locatorDescriptor = tryToGetGetterDescriptor(this, 'locator');
		const nameDescriptor = tryToGetGetterDescriptor(this, 'name');

		if (!(locatorDescriptor && locatorDescriptor.get)) {
			this.locator = 'html';
		}

		if (!(nameDescriptor && nameDescriptor.get)) {
			this.name = 'Элемент';
		}

		if (!this.params) {
			this.params = {} as Params;
		}

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

	/**
	 * @deprecated Метод Element.keyPress устарел. Используйте вместо него Browser.KeysPress
	 */
	@step('Нажимаем на кнопку {__result__}')
	static keyPress(button: UNICODE_CHARACTERS): string | void {
		debug('Метод Element.keyPress устарел. Используйте вместо него Browser.KeysPress');
		browser.keys(button);

		return Object.keys(UNICODE_CHARACTERS)
			.find((key: string) => UNICODE_CHARACTERS[key as keyof typeof UNICODE_CHARACTERS] === button);
	}

	@gen
	@step('Получаем количество элементов {element}, результат {__result__}')
	static GetCount(element: Element): number {
		const locator = element.Locator();
		const els = browser.elements(locator);

		assert(els && els.value, `Не удалось найти элемент ${element.Name()}`);

		return els.value.length;
	}

	@gen
	@step('Проверяем, что количество элементов {element} равно {expected}')
	static CheckCount(element: Element, expected: number): void {
		const actual = Element.GetCount(element);

		assert.strictEqual(
			actual,
			expected,
			`Количество элементов ${element.Name()} (${actual}) не совпадает с ожидаемым значением (${expected})`
		);
	}

	@gen
	@step('Дожидаемся, пока количество элементов {element} равно {expected}')
	static WaitFoCount(element: Element, expected: number, timeout: number): void {
		browser.waitUntil(
			() => element.getCount() === expected,
			timeout,
			`Не удалось дождаться пока количество элементов ${element.Name()} совпадёт с ожидаемым значением (${expected})`);
	}

	@gen
	static GetElementRect(element: Element): any {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);

		const { value } = browser.elementIdRect(el.value.ELEMENT);
		return value;
	}

	@gen
	static SwitchFrame(element: Element): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);

		browser.frame(el.value);
	}

	/**
	 * @deprecated Метод Element.SwitchParentFrame устарел. Используйте вместо него Browser.SwitchParentFrame
	 */
	@gen
	static SwitchParentFrame(element: Element): void {
		debug('Метод Element.SwitchParentFrame устарел. Используйте вместо него Browser.SwitchParentFrame');
		browser.frameParent();
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
	@step('Дожидаемся, пока элемент {element} {expected ? "появится в" : "будет удалён из"} DOM')
	static WaitForExist(element: Element, expected: boolean, timeout?: number): void {
		browser.waitForExist(
			element.Locator(),
			timeout || browser.options.waitforTimeout,
			expected === false
		);
	}

	@gen
	@step('Дожидаемся, пока элемент {element} станет {expected ? "кликабельным" : "задисейбленым"} на экране')
	static WaitForEnabled(element: Element, expected: boolean, timeout?: number): void {
		browser.waitForEnabled(
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
	@step('Проверяем, что значение элемента {element} равно {expected}')
	static CheckValue(element: Element, expected: string): void {
		const actual = Element.GetValue(element);

		assert.strictEqual(
			actual,
			expected,
			`Текст в элементе ${element.Name()} (${actual}) не совпадает с ожидаемым значением (${expected})`
		);
	}

	@gen
	@step(
		'Дожидаемся, пока значение элемента {element} станет равно значению',
		(e: any, expected: string) => ({ expected })
	)
	static WaitForValue(element: Element, expected: string, timeout?: number): void {
		browser.waitUntil(
			() => Element.GetValue(element) === expected,
			timeout || browser.options.waitforTimeout,
			`Не удалось дождаться пока значение элемента ${element.Name()} совпадёт с ожидаемым значением (${expected})`
		);
	}

	@gen
	@step('Очищаем элемент {element}')
	static ClearElement(element: Element): void {
		Element.privateClearElement(element);
	}

	private static privateClearElement(element: Element): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);
		/**
		 * @see https://github.com/facebook/react/issues/8004
		 * @see https://github.com/facebook/react/issues/10135
		 */
		browser.execute((elementLocator: string) => {
			const el = document.querySelector(elementLocator);
			if (!el) {
				throw new Error(`Не найден элемент "${elementLocator}"`);
			}
			const { set: valueSetter } = Object.getOwnPropertyDescriptor(el, 'value') || { set: null };
			const prototype = Object.getPrototypeOf(el);
			const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || { set: null };
			if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
				prototypeValueSetter.call(el, '');
			} else if (valueSetter) {
				valueSetter.call(element, '');
			} else {
				throw new Error('The given element does not have a value setter');
			}
			el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
		},              locator);
		el.elementIdClear(el.value.ELEMENT);
	}

	@gen
	@step('Печатаем в элементе {element} текст', (_: any, text: string) => ({ text }))
	static TypeValue(element: Element, text: string): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);
		Element.privateClearElement(element);
		el.elementIdClick(el.value.ELEMENT);
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
	@step('Кликаем средней кнопкой мыши по элементу {element}')
	static MiddleClickTo(element: Element): void {
		const locator = element.Locator();
		browser.middleClick(locator);
	}

	@gen
	@step('Кликаем правой кнопкой мыши по элементу {element}')
	static RightClickTo(element: Element): void {
		const locator = element.Locator();
		browser.rightClick(locator);
	}

	@gen
	@step('Наводим курсор мыши на {element}')
	static MouseOver(element: Element, xoffset?: number, yoffset?: number): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);
		browser.moveTo(el.value.ELEMENT, xoffset!, yoffset!);
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
	@step('Проверяем, что текст в элементе {element} соджержит текст {subString}')
	static CheckTextContentIncludes(element: Element, subString: string): void {
		const textContent: string = Element.GetTextContent(element);

		assert(
			textContent.includes(subString),
			`Текстовое содержимое элемента ${element.Name()} (${textContent}) не содержит текст "${subString}"`
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
			 совпадёт с ожидаемым значением (${expected})`
		);
	}

	@gen
	static GetAttribute(element: Element, name: string): string {
		const locator = element.Locator();
		const el = browser.element(locator);

		assert(el && el.value, `Не удалось найти элемент ${element.Name()}`);

		return browser.getAttribute(locator, name);
	}

	@gen
	@step(
		'Проверяем, что атрибут {name} элемента {element} равен значению {expected}'
	)
	static CheckAttribute(element: Element, name: string, expected: any): any {
		const attribute = Element.GetAttribute(element, name);

		assert.strictEqual(
			attribute,
			expected,
			`Аттрибут ${name} элемента ${element.Name()} не соответствует ожидаемому значению ${expected}`
		);
	}

	@gen
	@step(
		'Ждём пока атрибут {name} элемента {element} станет равен значению {expected}'
	)
	static WaitForAttribute(element: Element, name: string, expected: string, timeout?: number): void {
		browser.waitUntil(
			() => Element.GetAttribute(element, name) === expected,
			timeout || browser.options.waitforTimeout,
			`Не удалось дождаться пока атрибут ${name} элемента ${element.Name()} совпадёт с ожидаемым значением (${expected})`
		);
	}

	@gen
	@step(
		'Ждём пока у элемента {element} {expected ? "появится" : "исчезнет"} класс {name}'
	)
	static WaitForClass(element: Element, name: string, expected: boolean): void {
		const locator = element.Locator();

		browser.waitForClass(
			locator,
			name,
			!expected,
			`Не удалось дождаться пока у элемента ${element.Name()} ${expected ? 'появится' : 'исчезнет'} класс: ${name}`
		);
	}

	@gen
	@step(
		'Скроллить, пока элемент {element} не окажется в области видимости'
	)
	static ScrollTo(element: Element): void {
		const locator = element.Locator();
		browser.timeouts('script', browser.options.waitforTimeout!);

		browser.executeAsync((currentLocator: string, done: () => void) => {
			document.querySelector(currentLocator)!.scrollIntoView();
			done();
		}, locator);
	}

	@gen
	@step('Начинаем перетаскивать элемент {element}')
	static StartDrag(element: Element, dragX: number = 10, dragY: number = 10) {
		element.mouseOver();
		Browser.LeftButtonDown();
		element.mouseOver(dragX, dragY); // Нужно сдвинуть курсор, чтобы активировать dnd
	}

	@gen
	@step('Отпустить курсор над элементом {element}')
	static DropItem(element: Element) {
		element.mouseOver();

		Browser.LeftButtonUp();
	}

	@gen
	@step('Перетащить элемент {element} на элемент {targetElement}')
	static DragTo(element: Element, targetElement: Element, dragX?: number, dragY?: number) {
		Element.StartDrag(element, dragX, dragY);
		Element.DropItem(targetElement);
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
