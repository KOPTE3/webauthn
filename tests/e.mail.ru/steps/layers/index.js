'use strict';

let assert = require('assert');
let Steps = require('../../steps');

/** Модуль для работы с лаерами */
class LayerSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Метод вызывает показ требуемого лаера
	 *
	 * @static
	 * @param {Object} options - опции лаера
	 * Доступные значения (missingAttach, multiAttachToCompose, secure)
	 */
	show (options) {
		let layer = this.layer.show();

		assert(layer.isVisible(), 'Лаер не был показан');
	}
}

module.exports = LayerSteps;
