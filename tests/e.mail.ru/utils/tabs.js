'use strict';

module.exports = {
	/**
	 * Переключиться на ближайшую вкладку
	 */
	switchTab: () => {
		let tabIds = browser.getTabIds();
		let currentTabId = browser.getCurrentTabId();
		let newTabId = tabIds.filter(id => id !== currentTabId)[0];

		browser.switchTab(newTabId);
	}
};
