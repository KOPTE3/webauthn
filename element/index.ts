/**
 * Класс, представляющий собой абстракцию над любым элементом страницы
 * имеет локатор и название
 * @class Element
 */
export default class Element {
	/** родительский элемент (если есть) */
	public parent?: Element | null;

	/** локатор элемента (css-селектор) */
	protected locator: string = 'html';
	/** название элемента */
	protected name: string = 'Элемент';
	protected params: any = null;

	@step('Проверяем видимость элемента {element}. Элемент {__result__ ? "виден на экране" : "скрыт"}')
	static IsVisible (element: Element): boolean {
		return browser.isVisible(element.Locator());
	}

	static isVisible (): boolean {
		const Class = this || Element;
		return Element.IsVisible(Class.Create());
	}

	@step('Ждём, пока элемент {element} не станет видимым')
	static WaitForVisible (element: Element): void {
		browser.waitForVisible(element.Locator());
	}

	static waitForVisible (): void {
		const Class = this || Element;
		Element.WaitForVisible(Class.Create());
	}

	@step('Ждём, пока элемент {element} не исчезнет')
	static WaitForNotVisible (element: Element): void {
		browser.waitForVisible(element.Locator(), 2000, true);
	}

	static waitForNotVisible (): void {
		const Class = this || Element;
		Element.WaitForNotVisible(Class.Create());
	}

	@step('Устанавливаем значение элемента {element}', (e: any, t: string) => ({'Значение': t}))
	static SetValue (element: Element, text: string): void {
		const locator = element.Locator();
		browser.setValue(locator, text);
	}

	static setValue (text: string): void {
		const Class = this || Element;
		Element.SetValue(Class.Create(), text);
	}

	@step('Получаем значение элемента {element}', (e: any, r: string) => ({'Значение равно': r}))
	static GetValue (element: Element): string {
		const locator = element.Locator();
		return browser.getValue(locator);
	}

	static getValue (): string {
		const Class = this || Element;
		return Element.GetValue(Class.Create());
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
		Element.TypeValue(Class.Create(), text);
	}

	static Create<T extends typeof Element> (this: T): InstanceType<T>;

	static Create<T extends typeof Element> (this: T, parent: Element): InstanceType<T>;

	static Create<T extends typeof Element> (this: T, locator: string, name?: string): InstanceType<T>;

	static Create<T extends typeof Element> (this: T, parent: Element, locator: string, name?: string): InstanceType<T>;

	static Create<T extends typeof Element> (this: T, params: any): InstanceType<T>;

	static Create<T extends typeof Element> (this: T, parent: Element, params: any): InstanceType<T>;

	static Create<T extends typeof Element> (this: T, ...args: any[]): InstanceType<T> {
		const Class = this || Element;
		let parent: Element | null = null;
		if (args[0] instanceof Element) {
			parent = args.shift();
		}

		if (args.length === 0) {
			return new Class() as InstanceType<T>;
		}

		if (typeof args[0] === 'string') {
			const locator: string = args[0];
			const element = new Class();
			element.locator = locator;
			if (typeof args[1] === 'string' && args[1]) {
				const name: string = args[1];
				element.name = name;
			}

			element.parent = parent;

			return element as InstanceType<T>;
		}

		if (args[0] && typeof args[0] === 'object') {
			const params: any = args[0];
			const element = new Class();
			element.params = params;

			element.parent = parent;

			return element as InstanceType<T>;
		}

		const ClassName: string = this && this.name || 'Element';
		throw new Error(`Invalid creation of element ${ClassName}`);
	}

	@step('Кликаем по элементу {element}')
	static ClickTo (element: Element): void {
		const locator = element.Locator();
		const el = browser.element(locator);
		el.elementIdClick(el.value.ELEMENT);
	}

	static clickTo (): void {
		const Class = this || Element;
		Element.ClickTo(Class.Create());
	}

	static TextContent (element: Element): string {
		const locator = element.Locator();
		const el = browser.element(locator);
		const {value} = el.elementIdText(el.value.ELEMENT);
		return value;
	}

	static textContent (): string {
		const Class = this || Element;
		return Element.TextContent(Class.Create());
	}

	public TextContent (): string {
		return Element.TextContent(this);
	}

	public TypeValue (text: string): void {
		Element.TypeValue(this, text);
	}

	public IsVisible (): boolean {
		return Element.IsVisible(this);
	}

	public WaitForVisible (): void {
		return Element.WaitForVisible(this);
	}

	public WaitForNotVisible (): void {
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

	public ClickTo (): void {
		Element.ClickTo(this);
	}

	protected wrapChildLocator (childLocator: string): string {
		return `${this.Locator()} ${childLocator}`;
	}
}
