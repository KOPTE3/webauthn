import * as assert from 'assert';
import * as CloudApi from '../../api/cloud';

export default class CloudApiSteps {
	@step('Проверить, что файл {filePath} {reverse ? "" : "не "}существует в Облаке')
	checkFileExists(filePath: string, reverse: boolean = false) {
		assert.strictEqual(
			CloudApi.file({ home: filePath }).status === (reverse ? 404 : 200),
			!reverse,
			`Файл "${filePath}" ${reverse ? 'при' : 'от'}сутствует в Облаке`
		);
	}
}
