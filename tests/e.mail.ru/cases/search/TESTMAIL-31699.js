'use strict';

let Messages = require('../../steps/messages');
let CalendarFactory = require('../../utils/calendar');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();
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
		let lapses = AdvancedStore.dateSelectValues;
		let operandName = 'date';

		advancedSteps.clickDateField();
		advancedCalendar.isVisible();
		advancedCalendar.hasToday(todayDay);

		advancedCalendar.clickToday();
		advancedCalendar.isVisible(true);
		advancedSteps.checkDateFieldText(today);

		portalSearchSteps.hasOperand(operandName);
		portalSearchSteps.checkOperandText(operandName, today);
		portalSearchSteps.checkDateOperandLapse(lapses[0].operandText);

		portalSearchSteps.clickOperand(operandName);
		portalSearchSteps.operandHasFocus(operandName);

		portalSearchSteps.isOperandInputReadonly(operandName);

		operandsCalendar.isVisible();

		operandsCalendar.isLapseVisible();

		operandsCalendar.checkLapse(lapses[0].value);

		operandsCalendar.clickLapse(lapses[1].value);
		portalSearchSteps.checkDateOperandLapse(lapses[1].operandText);
	});
});
