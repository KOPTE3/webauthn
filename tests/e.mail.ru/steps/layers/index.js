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

	/**
	 * Метод проверяет, что леер закрыт
	 */
	shoulBeClosed () {
		let layer = this.layer.getContainer();

		assert(!layer.isVisible(), 'Лаер все еще не закрыт');
	}

	blockShouldHaveText (name, text) {
		assert.equal(this.layer.getBlockText(name), text,
			'Блок леера содержит не корректный текст');
	}

}

module.exports = LayerSteps;
