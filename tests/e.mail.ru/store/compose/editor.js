'use strict';

let Store = require('../../store');

/** Модуль для работы с даными редактора на странице написания письма */
class ComposeEditor extends Store {
	constructor () {
		super();
	}

	/**
	 * Возвращает список писем
	 *
	 * @static
	 * @type {Array}
	 */
	static get letters () {
		return [
			'Уважаемый Сергей Михайлович!\n' +
			'Электролаборатория ООО"Универсал-1" предлагает ' +
			'Вам свои услуги в области электроизмерений ' +
			'и испытаний электрооборудования ( т.н. "прозвонке")\n ' +
			'учреждений дошкольного и школьного образования\n' +
			'Вашего ТУ департамента образования г.Волгограда.\n ' +
			'Во вложенном файле наше Предложение, реквизиты, ' +
			'адрес электронной почты и телефон для связи.\n\n' +
			'С уважением к Вам,\nДиректор ООО "Универсал-1"\n' +
			'Александр Ротин.',

			'В скрепке бланк на оплату заказа.\n' +
			'Отправляем заказ в работу?\n\n' +
			'Екатерина.',

			'Уважаемые депутаты!' +
			'23.05.2016 в  15.30 и  24.05.2016 в  10.00 (в малом зале мэрии) ' +
			'состоятся заседания комиссии  по вопросам размещения НТО.\n' +
			'повестка и материалы в приложенном файле.\n' +
			'С уважением,\n Калашникова Александра,\n тел.40-50-88',

			'Добрый день!\nВо вложении заявка, прошу скинуть счет на оплату.',

			'Елена , добрый день! Подскажите, ' +
			'Вы фотоальбомы печатаете?- пришлите ' +
			' что конкретно вам надо Посчитайте ' +
			'пожалуйста, запрос на папки. Папки. ' +
			'Тираж 9 шт.-7800р Размер папки в ' +
			' развороте 320*520 мм, в сложенном' +
			' виде 320*250 мм, корешок 20 мм. ' +
			' Примерный макет во вложение.' +
			' Макеты с разной печатью. Бумага ' +
			' мелованный картон 300 гр.,' +
			' печать 4+0, ламинация 1+0, 2 бига/2 фальца. ' +
			' Папка без кармана, ' +
			' просто сложенная пополам. Подскажите, какие готовые подходящие ' +
			'штампы есть? Может быть эту папку можно посчитать просто без ' +
			'штампа? это без штампа просто 2бига Типография Градация ' +
			' 933-22-09, 778-89-23 gradation@mail.ru www.printmaster.msk.ru',


			'Добрый день, во вложении вся информация по проверкам, ' +
			' проведенным в мае. С уверенностью в успехе дела, ' +
			' Валерия Нуриева, 8 (927)363-63-91 Центр информационной ' +
			' поддержки "Аспект". г. Пенза, ул. Московская, ' +
			' 29 (ТОЦ Гермес), офис 618. Тел.: 25-70-20 www.aspekt-centre.com',

			'Добрый день! Прошу Вас прислать коммерческое предложение ' +
			' на цемент ЦЕМ I 42,5Н . Планируемый объем закупки ' +
			' - 300 тонн. Доставка необходима в Мурино ' +
			' (Ленинградская область). Карточка предприятия ' +
			'представлена в приложении. По возможности прошу ' +
			'прислать коммерческое предложение сегодня. Заранее ' +
			'благодарю за ответ! С уважением, Помощник руководителя  ' +
			'Динара Колoва, Thank you in advance for your reply! ' +
			'With kind regards and best wishes, Dinara Kolova, ' +
			' +7(499)755-88-21 ООО "ТД Максимус" '

		];
	}

}

module.exports = ComposeEditor;
