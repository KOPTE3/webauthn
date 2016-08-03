'use strict';

let assert = require('assert');

let Compose2Page = require('../../pages/compose2');
let Compose2Fields = require('../../pages/compose2/fields');
let ComposeFieldsSteps = require('../compose/fields');

/** Модуль для работы с формой страницы написания письма */
class Compose2FieldsSteps extends ComposeFieldsSteps {
	constructor () {
		super();

		this.composeFields = new Compose2Fields();
		this.composePage = new Compose2Page();
	}
}

module.exports = Compose2FieldsSteps;
