/**
 * Переключиться на ближайшую вкладку
 */
browser.addCommand('switchToNextTab', function () {
	let tabs = browser.getTabIds();

	let actual = tabs.find(id => {
		return id !== browser.getCurrentTabId();
	});

	browser.switchTab(actual);
});
