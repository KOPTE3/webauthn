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
	 * @param {Object} options - опции лаера
	 * Доступные значения (missingAttach, multiAttachToCompose, secure)
	 */
	show (options) {
		let layer = this.layer.show();

		assert(layer.isVisible(), 'Лаер не был показан');
	}

	/**
	 * Метод закрывает открытый попап
	 */
	close () {
		this.layer.close();
	}
}

module.exports = LayerSteps;
