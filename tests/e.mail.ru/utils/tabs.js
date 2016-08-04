'use strict';

module.exports = {
	/**
	 * Переключиться на ближайшую вкладку
	 */
	switchTab: () => {
		let tabIds = browser.getTabIds();
		let currentTabId = browser.getCurrentTabId();
		let newTabId = tabIds.find(id => id !== currentTabId);

		browser.switchTab(newTabId);
	}
};
