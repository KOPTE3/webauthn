'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let calendarUtils = require('../../../utils/calendar');
let advancedStore = require('../../../store/portal-menu/advanced');
let dateUtils = require('../../../utils/date');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();
let advancedCalendar = calendarUtils.create('advanced');

describe(() => {
	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка добавления операнда "дата" (только из расширенного поиска)' +
		' с выбором временного промежутка', () => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.toggleAdvanced();

		let today = dateUtils.format('D.M.Y');
		let todayDay = dateUtils.format('d');
		let lapse = advancedStore.dateSelectValues.filter(({value}) => value === '1')[0];

		let operandName = 'date';

		advancedSteps.selectDateLapse(lapse.value);
		advancedSteps.checkSelectDateText(lapse.text);

		advancedSteps.clickDateField();
		advancedCalendar.isVisible();
		advancedCalendar.hasToday(todayDay);

		advancedCalendar.clickToday();
		advancedCalendar.isVisible(true);
		advancedSteps.checkDateFieldText(today);

		portalSearchSteps.hasOperand(operandName);
		portalSearchSteps.checkOperandText(operandName, today);
		portalSearchSteps.checkDateOperandLapse(lapse.operandText);
	});
});
