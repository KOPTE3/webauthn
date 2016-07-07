'use strict';

let Messages = require('../../steps/messages');
let CalendarFactory = require('../../utils/calendar');
let portalSearchSteps = require('../../steps/portal-menu/portal-search');
let advancedSteps = require('../../steps/portal-menu/advanced');
let advancedCalendar = CalendarFactory.create('advanced');
let operandsCalendar = CalendarFactory.create('portal-search');

let AdvancedStore = require('../../store/portal-menu/advanced');

let date = require('../../utils/date');

describe('TESTMAIL-31699', () => {
	it('Проверка редактирования операнда "дата" с точной датой ' +
		'с использованием выбора временного промежутка', () => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.toggleAdvanced();

		let today = date.format('D.M.Y');
		let todayDay = date.format('d');
		let lapse = AdvancedStore.dateSelectValues.filter(({value}) => value === '0')[0];
		let operandName = 'date';

		advancedSteps.clickDateField();
		advancedCalendar.isVisible();
		advancedCalendar.hasToday(todayDay);

		advancedCalendar.clickToday();
		advancedCalendar.isVisible(true);
		advancedSteps.checkDateFieldText(today);

		portalSearchSteps.hasOperand(operandName);
		portalSearchSteps.checkOperandText(operandName, today);
		portalSearchSteps.checkDateOperandLapse(lapse.operandText);

		portalSearchSteps.clickOperand(operandName);
		portalSearchSteps.operandHasFocus(operandName);
		portalSearchSteps.isOperandInputReadonly(operandName);
	});
});
