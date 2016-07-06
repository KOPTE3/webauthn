'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');

let AdvancedStore = require('../../store/portal-menu/advanced');

let date = require('../../utils/date');

describe('TESTMAIL-31698', () => {
	it('Проверка добавления операнда "дата" (только из расширенного поиска)' +
		' с точной датой.', () => {
		Messages.auth();
		Messages.open();

		PortalSearchSteps.toggleAdvanced();

		let today = date.format('D.M.Y');
		let todayDay = date.format('d');
		let lapse = AdvancedStore.dateSelectValues.filter(({value}) => value === '0')[0];
		let operandName = 'date';

		AdvancedSteps.clickDateField();
		AdvancedSteps.isCalendarVisible();
		AdvancedSteps.calendarHasToday(todayDay);

		AdvancedSteps.clickCalendarToday();
		AdvancedSteps.isCalendarVisible(true);
		AdvancedSteps.checkDateFieldText(today);

		PortalSearchSteps.hasOperand(operandName);
		PortalSearchSteps.checkOperandText(operandName, today);
		PortalSearchSteps.checkDateOperandLapse(lapse.operandText);
		PortalSearchSteps.operandHasClose(operandName);
	});
});
