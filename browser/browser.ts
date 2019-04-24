const MouseButtons = {
	left: 0,
	middle: 1,
	right: 2
};

export default class Browser {
	@step('Зажать левую кнопку мыши')
	static LeftButtonDown() {
		// TODO fix deprecated methods
		browser.buttonDown(MouseButtons.left);
	}

	@step('Отпустить левую кнопку мыши')
	static LeftButtonUp() {
		// TODO fix deprecated methods
		browser.buttonUp(MouseButtons.left);
	}
}
