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

	constructor ();

	constructor (parent: Element);

	constructor (locator: string, name?: string);

	constructor (parent: Element, locator: string, name?: string);

	constructor (params: any);

	constructor (parent: Element, params: any);

	constructor (...args: any[]) {
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
	@step('Проверяем видимость элемента {element}. Элемент {__result__ ? "виден на экране" : "скрыт"}')
	static IsVisible (element: Element): boolean {
		return browser.isVisible(element.Locator());
	}

	// static isVisible (): boolean {
	// 	const Class = this || Element;
	// 	return Element.IsVisible(new Class);
	// }

	// public isVisible (): boolean {
	// 	return Element.IsVisible(this);
	// }

	@step('Ждём, пока элемент {element} не станет видимым')
	static WaitForVisible (element: Element): void {
		browser.waitForVisible(element.Locator());
	}

	static waitForVisible (): void {
		const Class = this || Element;
		Element.WaitForVisible(new Class);
	}

	@step('Ждём, пока элемент {element} не исчезнет')
	static WaitForNotVisible (element: Element): void {
		browser.waitForVisible(element.Locator(), 2000, true);
	}

	static waitForNotVisible (): void {
		const Class = this || Element;
		Element.WaitForNotVisible(new Class);
	}

	@step('Устанавливаем значение элемента {element}', (e: any, t: string) => ({'Значение': t}))
	static SetValue (element: Element, text: string): void {
		const locator = element.Locator();
		browser.setValue(locator, text);
	}

	static setValue (text: string): void {
		const Class = this || Element;
		Element.SetValue(new Class, text);
	}

	@step('Получаем значение элемента {element}', (e: any, r: string) => ({'Значение равно': r}))
	static GetValue (element: Element): string {
		const locator = element.Locator();
		return browser.getValue(locator);
	}

	static getValue (): string {
		const Class = this || Element;
		return Element.GetValue(new Class);
	}

	@step('Печатаем в элементе {element} текст', (_: any, text: string) => ({text}))
	static TypeValue (element: Element, text: string): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		el.elementIdClick(el.value.ELEMENT);
		el.elementIdClear(el.value.ELEMENT);
		el.keys(text);
	}

	static typeValue (text: string): void {
		const Class = this || Element;
		Element.TypeValue(new Class, text);
	}

	@step('Кликаем по элементу {element}')
	static ClickTo (element: Element): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		el.elementIdClick(el.value.ELEMENT);
	}

	static clickTo (): void {
		const Class = this || Element;
		Element.ClickTo(new Class);
	}

	static TextContent (element: Element): string {
		const locator = element.Locator();
		const el = browser.element(locator);
		const {value} = el.elementIdText(el.value.ELEMENT);
		return value;
	}

	static textContent (): string {
		const Class = this || Element;
		return Element.TextContent(new Class);
	}

	public TextContent (): string {
		return Element.TextContent(this);
	}

	public typeValue (text: string): void {
		Element.TypeValue(this, text);
	}

	public waitForVisible (): void {
		return Element.WaitForVisible(this);
	}

	public waitForNotVisible (): void {
		return Element.WaitForNotVisible(this);
	}

	public Locator (): string {
		let locator = this.locator;
		if (this.parent) {
			return this.parent.wrapChildLocator(locator);
		}

		return locator;
	}

	public Name (): string {
		return this.name;
	}

	public toString (): string {
		return this.Name();
	}

	public clickTo (): void {
		Element.ClickTo(this);
	}

	protected wrapChildLocator (childLocator: string): string {
		return `${this.Locator()} ${childLocator}`;
	}
}
export default Element;
