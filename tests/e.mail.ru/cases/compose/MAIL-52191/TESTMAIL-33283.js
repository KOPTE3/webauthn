'use strict';

module.options = {
	name: 'НЕ AJAX. Ответ на письмо. Забытое вложение. ' +
		'Проверить появление попапа на быстром ответе ' +
		'если в письме был заблокирован аттач',
	fastReply: true
};

require('./TESTMAIL-33286');
