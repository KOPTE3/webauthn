'use strict';

let { options = {
	name: 'Написание письма. Suggests. Выбор получателя после пробела'
}} = module.parent;

let composeFolder = options.compose2 ? 'compose2' : 'compose';

let Compose = require(`../../../steps/${composeFolder}`);
let Messages = require('../../../steps/messages');
let ComposeFields = require(`../../../steps/${composeFolder}/fields`);
let composeFields = new ComposeFields();

let MessagesToolbarSteps = require('../../../steps/messages/toolbar');
let messagesToolbarSteps = new MessagesToolbarSteps();

let composeFieldsStore = require('../../../store/compose/fields');

let actions = require('../../../utils/actions');

const name = 'Имя';
const lastname = 'Фамилия';
const email = 'test@mail.ru';

describe('', () => {
	before(() => {
		Compose.auth();

		if (options.compose2) {
			Messages.features([
				'compose2'
			]);
		}

		Messages.open();
		actions.addContact(`${name} ${lastname}`, email);

		if (options.noajax) {
			Compose.open();
		} else {
			messagesToolbarSteps.clickButton('compose');
			Compose.wait();
		}
	});

	composeFieldsStore.correspondentsFields.forEach(field => {
		it(`${options.name}: ${field}`, () => {
			composeFields.expandField(field);
			composeFields.setFieldValue(field, ` ${name}`);

			composeFields.checkFieldSuggestStart(field, ` ${name}`);
		});
	});

	afterEach(() => {
		messagesToolbarSteps.clickButton('compose');
		Compose.alertAccept();
		if (options.noajax) {
			Compose.open();
		} else {
			Compose.wait();
		}
	});
});
