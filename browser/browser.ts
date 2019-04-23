import * as WebdriverIO from 'webdriverio';

export default class Browser {
	@step('Зажать левую кнопку мыши')
	static LeftButtonDown() {
		// TODO fix deprecated methods
		browser.buttonDown(WebdriverIO.Button.left);
	}

	@step('Отпустить левую кнопку мыши')
	static LeftButtonUp() {
		// TODO fix deprecated methods
		browser.buttonUp(WebdriverIO.Button.left);
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
}
