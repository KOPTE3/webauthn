'use strict';

let Compose = require('../../../steps/compose');
let ComposeFields = require('../../../steps/compose/fields');
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
		Compose.open();
		actions.addContact(`${name} ${lastname}`, email);
	});

	composeFieldsStore.correspondentsFields.forEach(field => {
		it(`Написание письма. Suggests. Выбор получателя после пробела: ${field}`, () => {
			composeFields.expandField(field);
			composeFields.setFieldValue(field, ` ${name}`);

			composeFields.checkFieldSuggestStart(field, ` ${name}`);
		});
	});

	afterEach(() => {
		messagesToolbarSteps.clickButton('compose');
		Compose.alertAccept();
		Compose.open();
	});
});
