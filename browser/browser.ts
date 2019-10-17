import * as Debug from 'debug';
import * as url from 'url';
import * as assert from 'assert';
import { UNICODE_CHARACTERS } from '../utils/constants';

const debug = Debug('@qa:yoda:browser');

const MouseButtons = {
	left: 0,
	middle: 1,
	right: 2
};

export default class Browser {
	@step('Зажать левую кнопку мыши')
	static LeftButtonDown() {
		// TODO fix deprecated methods
		browser.buttonDown(MouseButtons.left);
	}

	@step('Отпустить левую кнопку мыши')
	static LeftButtonUp() {
		// TODO fix deprecated methods
		browser.buttonUp(MouseButtons.left);
	}

	@step('Кликнуть левой кнопкой мыши в {__result__}',
		((params: any[]) => {
			if (!params || !params.length || params.length <= 2) {
				return 'текущую точку';
			}

			return `координату (${params[0]}, ${params[1]})`;
		})
	)
	static LeftClick(xoffset?: number, yoffset?: number) {
		browser.leftClick('body', xoffset, yoffset);
	}

	@step('Обновить страницу')
	static Refresh() {
		browser.refresh();
	}

	@step('Переключиться в соседнюю вкладку')
	static SwitchTab() {
		const currentTabId = browser.getCurrentTabId();

		const nextTabId = browser.getTabIds().filter((tabId) => tabId !== currentTabId)[0];

		browser.switchTab(nextTabId);
	}

	// Если есть возможность использовать неявные ожидания в виде waitUntil/waitForVisible функций, то этот метод
	// тебе не нужен. Явные ожидания (паузы) - это очень плохой паттерн, который сильно увеличивает время
	// исполнения тестов
	@step('Подождать {timeout}ms')
	static Pause(timeout: number) {
		debug('Если есть возможность использовать неявные ожидания в виде waitUntil/waitForVisible функций, ' +
			'то этот метод тебе не нужен. Явные ожидания (паузы) - это очень плохой паттерн, который сильно ' +
			'увеличивает время исполнения тестов');
		browser.pause(timeout);
	}

	// таймаут на изменение размера окна необходим, к сожалению
	@step('Увеличить размер экрана браузера')
	static FullScreen(resizeTimeout: number = 2000) {
		browser.windowHandleMaximize();
		Browser.Pause(resizeTimeout);
	}

	static SwitchParentFrame(): void {
		browser.frameParent();
	}

	@step('Нажимаем на хот-кей {buttons}')
	static KeysPress(buttons: Array<(UNICODE_CHARACTERS | string)>): void {
		if (!buttons.every((button) => (typeof button === 'string'))) {
			throw new Error(`Не валидная комбинация кнопок ${buttons.join(' + ')}`);
		}
		browser.keys(buttons);
	}

	@step('Получить текущий урл. Результат: {__result__}')
	static GetUrl(noQueryParams: boolean = false): string {
		if (noQueryParams) {
			const { protocol, host, pathname = '' } = url.parse(browser.getUrl());

			return `${protocol}//${host}${pathname}`;
		}

		return browser.getUrl();
	}

	@step('Дождаться адреса соответствующего заданному условию "{value}"')
	static WaitForUrl(
		value: ((url: string) => boolean) | string | RegExp,
		timeout?: number,
		revert?: boolean
	): void {
		let actual = false;

		try {
			actual = browser.waitForUrl(value, timeout, revert);
		} catch (error) {
			// ignore
		}

		assert.ok(actual, 'Не дождались, пока url примет необходимое значение');
	}

	@step('Проверить, что текущий урл содержит следующие GET-параметры', (p: any) => p)
	static CheckQueryParams(params: { [ name: string ]: string | RegExp }): void {
		const actualUrl = new url.URL(browser.getUrl());

		Object
			.entries(params)
			.forEach(([key, expectedValue]) => {
				if (expectedValue instanceof RegExp) {
					assert(
						actualUrl.searchParams.getAll(key).some((item) => !!item.match(expectedValue)),
						`Текущий урл не содержит параметр ${key} ~ ${expectedValue}`);
					return;
				}
				assert(
					actualUrl.searchParams.getAll(key).includes(expectedValue),
					`Текущий урл не содержит параметр ${key}=${expectedValue}`);
			})
		;
	}

	@step('Проверить, что текущий урл не содержит GET-параметры: {params}', (p: any) => p)
	static HasNoQueryParams(params: string[]): void {
		const actualUrl = new url.URL(browser.getUrl());

		params.forEach((parameter) => {
			assert(
				!actualUrl.searchParams.has(parameter),
				`Текущий урл содержит параметр ${parameter}, и его зачение: ${actualUrl.searchParams.get(parameter)}`);
		});
	}

	@step(
		'Установить размер вьюпорта { type ? " и проверить, совпадает ли реальный размер с требуемым" : "" }',
		({ width, height }: WebdriverIO.Size) => ({
			'Ширина': width,
			'Высота': height
		})
	)
	static SetViewportSize(size: WebdriverIO.Size, type: boolean = true): void {
		const { width = 1200, height = 600 } = size;

		browser.setViewportSize({ width, height });

		if (type) {
			Browser.WaitForViewport(size);
		}
	}

	@step('Дождаться заданных размеров вьюпорта', ({ width, height }: WebdriverIO.Size) => ({
		'Ширина': width,
		'Высота': height
	}))
	private static WaitForViewport(expected: WebdriverIO.Size): boolean {
		return browser.waitUntil(
			() => {
				const actual = browser.getViewportSize();

				try {
					assert.deepStrictEqual(actual, expected);
				} catch {
					return false;
				}

				return true;
			},
			browser.options.waitforTimeout,
			'Не удалось дождаться требуемого размера вьюпорта'
		);
	}
}
