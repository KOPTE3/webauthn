'use strict';

let Messages = require('../../../steps/messages');
let LettersSteps = require('../../../steps/messages/letters');
let lettersSteps = new LettersSteps();

let FileSearch = require('../../../steps/filesearch');
let FileSearchToolbar = require('../../../steps/filesearch/toolbar');
let FileSearchFiles = require('../../../steps/filesearch/files');
let FileSearchContextMenu = require('../../../steps/filesearch/contextmenu');

let messages = new Messages();
let fileSearch = new FileSearch();
let fileSearchToolbar = new FileSearchToolbar();
let fileSearchFiles = new FileSearchFiles();
let fileSearchContextMenu = new FileSearchContextMenu();
let composeFieldsStore = require('../../../store/compose/fields');
let UnsafeLayer = require('../../../steps/layers/filesearch/unsafeAttach');
let unsafeLayer = new UnsafeLayer();


let Mail = require('../../../utils/mail');

describe(() => {
	before(() => {
		Messages.auth();
		let {fields} = composeFieldsStore;
		let subject = 'TEST';

		// отправляем себе письмо с exe файлом
		var mail = new Mail({
			to: fields.to,
			subject
		});

		// добавляем потенциально опасные файл
		mail.addAttach('SmallExe.exe');
		mail.send();

		// открываем полученное письмо, чтобы оно добавилось в файлы
		Messages.open();
		lettersSteps.openNewestLetter();
	});

	it(`Filesearch. Вид список. Проверить попап потенциально опасных файлов.
	 Проверить скачивание аттача из попапа через контекстное меню`, () => {
		FileSearch.open();
		fileSearchToolbar.changeState('list');
		fileSearchFiles.openContextMenu();
		fileSearchContextMenu.download();

		unsafeLayer.wait();
		unsafeLayer.clickAgree();
		unsafeLayer.apply();
	});

});
