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
	 * проверяем правильность всех текстов
	 */
	checkTexts () {
		this.blockShouldHaveText(
			'head',
			'Вы не забыли прикрепить файл?'
		);

		this.blockShouldHaveText(
			'desc',
			'Возможно, к письму должен быть прикреплён файл, однако он отсутствует.'
		);

		this.blockShouldHaveText(
			'apply',
			'Всё равно отправить'
		);

		this.blockShouldHaveText('cancel', 'Прикрепить файл');
	}
}

module.exports = new MissingAttachLayerSteps();
