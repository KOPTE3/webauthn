'use strict';

let assert = require('assert');

let ComposeControlsSteps = require('../compose/controls');
let Compose2Controls = require('../../pages/compose2/controls');

/** Модуль для работы с шагами контролов страницы написания письма */
class Compose2ControlsSteps extends ComposeControlsSteps {
	constructor () {
		super();

		this.composeControls = new Compose2Controls();
	}
}

module.exports = Compose2ControlsSteps;
