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
	 * Дождаться появления редактора
	 */
	wait () {
		let actual = this.layer.wait();

		assert(actual, 'Не удалось дождаться появления layer с попапом ' +
			'(Сообщение о том что забыли прикрепить файл)');
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

module.exports = MissingAttachLayerSteps;
