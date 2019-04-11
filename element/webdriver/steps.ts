const MouseButtons = {
	left: 0,
	middle: 1,
	right: 2
};

/**
 * Степы для взаимодействия с webdriver, с человекочитаемым описанием
 */
export default class Browser {
	@step('Зажать левую кнопку мыши')
	static LeftButtonDown() {
		browser.buttonDown(MouseButtons.left);
	}

	@step('Отпустить левую кнопку мыши')
	static LeftButtonUp() {
		browser.buttonUp(MouseButtons.left);
	}
}
