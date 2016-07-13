'use strict';

let Messages = require('../../steps/messages');
let calendarUtils = require('../../utils/calendar');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');
let advancedStore = require('../../store/portal-menu/advanced');
let dateUtils = require('../../utils/date');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let advancedCalendar = calendarUtils.create('advanced');
let operandsCalendar = calendarUtils.create('portal-search');

describe('TESTMAIL-31699', () => {
	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка редактирования операнда "дата" с точной датой ' +
		'с использованием выбора временного промежутка', () => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.toggleAdvanced();

		let today = dateUtils.format('D.M.Y');
		let todayDay = dateUtils.format('d');
		let lapses = advancedStore.dateSelectValues;
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
