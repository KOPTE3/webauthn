'use strict';

let assert = require('assert');

let SearchPage = require('../../pages/search');
let LettersSteps = require('../../steps/messages/letters');

/** Модуль для работы с письмами в поиске */
class SearchLettersSteps extends LettersSteps {
	constructor () {
		super();

		this.messagesPage = new SearchPage();
	}
}

module.exports = SearchLettersSteps;
