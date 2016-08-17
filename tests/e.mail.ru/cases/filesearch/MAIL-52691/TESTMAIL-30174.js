'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let FileSearch = require('../../../steps/filesearch');
let FileSearchToolbar = require('../../../steps/filesearch/toolbar');
let FileSearchFiles = require('../../../steps/filesearch/files');

let messages = new Messages();
let fileSearch = new FileSearch();
let fileSearchToolbar = new FileSearchToolbar();
let fileSearchFiles = new FileSearchFiles();
let composeFieldsStore = require('../../../store/compose/fields');
let UnsafeLayer = require('../../../steps/layers/filesearch/unsafeAttach');
let unsafeLayer = new UnsafeLayer();


let Mail = require('../../../utils/mail');

describe(() => {
	before(() => {
		Messages.auth();
		let {fields} = composeFieldsStore;
		let subject = 'TEST';

		// Отправляем себе письмо с exe файлом
		let mail = new Mail({
			to: fields.to,
			subject
		});

		// Добавляем потенциально опасные файл
		mail.addAttach('SmallExe.exe');
		mail.send();

		// Открываем полученное письмо, чтобы оно добавилось в файлы
		Messages.open();
		lettersSteps.openNewestLetter();
	});

	it(`Filesearch. Вид список. Проверить попап потенциально опасных файлов. Проверить
	 скачивание файла из попапа по клику на самом файле`, () => {
		FileSearch.open();
		fileSearchToolbar.changeState('list');
		fileSearchFiles.clickDonwloadLink();

		unsafeLayer.wait();
		unsafeLayer.clickAgree();
		unsafeLayer.apply();
	});
});
