import * as assert from 'assert';
import * as CloudApi from '../../api/cloud';

export default class CloudApiSteps {
	/**
	 * 1) Получает список файлов и папок в корневой директории Облака
	 * 2) Удалят каждый(ую) из них - перемещает в корзину
	 * 3) Очищает корзину
	 */
	@step('Очистить Облако от файлов')
	clearCloud() {
		const rootFolderFiles: string[] = CloudApi.folder({ home: '/' }).body!.list.map(({ home }) => home);

		rootFolderFiles.forEach((filePath: string) => CloudApi.fileRemove({ home: filePath }));

		CloudApi.trashbinEmpty();
	}

	@step('Проверить, что файл {filePath} {reverse ? "" : "не "}существует в Облаке')
	checkFileExists(filePath: string, reverse: boolean = false) {
		assert.ok(
			CloudApi.file({ home: filePath }).status === (reverse ? 404 : 200),
			`Файл "${filePath}" ${reverse ? 'при' : 'от'}сутствует в Облаке`
		);
	}
}
