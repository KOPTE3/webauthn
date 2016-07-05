'use strict';

let assert = require('assert');

let actions = require('../../../utils/actions');

let FiltersPage = require('../../../pages/settings/filters');
let SettingsSteps = require('..');

let page = new FiltersPage();

class FiltersSteps extends SettingsSteps {
	static get page () {
		return page;
	}

	static registerHook () {
		actions.registerAjaxHook('maillist', function (xhr, options) {
			var response = JSON.parse(xhr.responseText);

			response.body = {
				'maillings_stat' : {
					'read' : 0,
					'deleted' : 0,
					'ignored_deleted' : 0,
					'ignored' : 1
				},
				'maillings_senders' : [
					{
						'total_letters' : 10,
						'category_id' : 100,
						'emails' : 'ogo@d3.ru',
						'autofilter_refuse' : false,
						'id' : 545551,
						'name_en' : 'D3.ru',
						'name_ru' : 'D3.ru'
					}
				]
			};

			xhr.responseText = JSON.stringify(response);
		});
	}

	static enableCleaner () {
		assert(actions.updateHelper(33, {
			state: true
		}), 'Cleaner helper update failed');
	}

	static waitForCleaner () {
		this.page.waitForCleanerWidget();
	}

	static launchCleaner () {
		this.page.clickCleanerLaunchButton();
	}

	static cancelCleaner () {
		this.page.clickCleanerCancelButton();
	}
}

module.exports = FiltersSteps;
