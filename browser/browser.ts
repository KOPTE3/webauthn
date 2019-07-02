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

    // Если есть возможность использовать неявные ожидания в виде waitUntil/waitForVisible функций, то этот метод тебе не нужен.
    // Так как явные ожидания(паузы) это очень плохой паттерн, который сильно увеличивает время исполнения тестов.
	@step('Подождать {timeout}ms')
	static Pause(timeout: number) {
		browser.pause(timeout);
	}
}
