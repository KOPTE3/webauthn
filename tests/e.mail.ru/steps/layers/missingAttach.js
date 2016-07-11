'use strict';

const assert = require('assert');

let LayerSteps = require('../../steps/layers');
let MissingAttachLayer = require('../../pages/layers/missingAttach');

class MissingAttachLayerSteps extends LayerSteps {
	constructor () {
		super();

		this.layer = new MissingAttachLayer();
	}

	/**
	 * Проверяем текст описания
	 */
	checkDescText () {
		const text = this.layer.getTextDesc();

		assert.equal(text, 'Возможно, к письму должен быть прикреплён файл, ' +
			'однако он отсутствует.');
	}

	/**
	 * Проверяет текст заглавия
	 */
	checkHeadText () {
		const text = this.layer.getTextHead();

		assert.equal(text, 'Вы не забыли прикрепить файл?');
	}

	/**
	 * Проверка кнопок
	 *
	 */
	checkButtons () {

		
		// есть две кнопки

		// первая синяя с тексом таким-то

		// вторая обычная с текстом таким-то
	}
}

module.exports = new MissingAttachLayerSteps();
