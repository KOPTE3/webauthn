import * as Debug from 'debug';
import * as url from 'url';
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
		if (!buttons.every((button) => (typeof button === 'string') && (button.length === 1))) {
			throw new Error(`Не валидная комбинация кнопок ${buttons.join(' + ')}`);
		}
		browser.keys(buttons);
	}

	@step('Получить текущий урл. Результат: {__result__}')
	static GetUrl(noQueryParams: boolean = false): string {
		let result: string = browser.getUrl();

		if (noQueryParams) {
			const { protocol, host, pathname = '' } = url.parse(result);

			result = `${protocol}//${host}${pathname}`;
		}

		return result;
	}
}
