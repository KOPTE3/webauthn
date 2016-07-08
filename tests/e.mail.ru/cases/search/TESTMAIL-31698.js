'use strict';

let Messages = require('../../steps/messages');
let CalendarFactory = require('../../utils/calendar');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();
let advancedCalendar = CalendarFactory.create('advanced');

let AdvancedStore = require('../../store/portal-menu/advanced');

let date = require('../../utils/date');

describe('TESTMAIL-31698', () => {
	it('Проверка добавления операнда "дата" (только из расширенного поиска)' +
		' с точной датой.', () => {
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
		portalSearchSteps.operandHasClose(operandName);
	});
});
