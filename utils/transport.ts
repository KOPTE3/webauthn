import * as assert from 'assert';
import RPC from '@qa/rpc';
import { MailAPI } from '@qa/api';
import * as merge from 'deepmerge';

import system from '../store/system';
import authorization from '../store/authorization';

import {
	Deliveryd,
	IDeliverydData,
	IDeliverydBody,
	IDeliverydRequest,
	IDeliverydResponse,
	IAPIResponse,
	API
} from '@qa/transport';

type RequiredInternal<T, K extends keyof T> = { [P in K]: T[P] };
type Required<T> = T & RequiredInternal<T, keyof T>;

class Transport {
	data: ITransportData

	constructor (data?: ITransportData) {
		this.data = {
			subject: 'Test subject',
			content: 'Test content',
			...data
		};
	}

	/**
	 * Покладка письма в текущий ящик
	 *
	 * @see test/msgput
	 *
	 * {
	 *   subject,
	 *   content,
	 *   ...
	 * }
	 */
	putMessage (params: IPutMessageData): Promise<IDeliverydResponse> {
		let { attachments = [] } = params;
		let { username, password } = authorization.account.data();

		let transport = new Deliveryd({ username, password });

		return browser.waitForPromise(async () => {
			let { subject, content: body }: Required<IPutMessageData> = { ...this.data, ...params };

			// По умолчанию используем папку "Входящие"
			let { folder = 0 } = params;

			// Приводим список файлов к формату транспорта
			let files = attachments.map(value => {
				return {
					name: value,
					path: system.file(value)
				};
			});

			let response = await transport.send({
				subject,
				body,
				...{ params, ...files }
				},
				{ folder }
			);

			assert.equal(response.status, RPC.HTTPStatus.OK);

			return response;
		});
	}

	/**
	 * Отправка письма на сторонний текущий ящик
	 *
	 * @see http://api.tornado.dev.mail.ru/messages/send
	 *
	 * {
	 *   subject,
	 *   content,
	 *   ...
	 * }
	 */
	sendMessage (params: ISendMessageData): Promise<IAPIResponse> {
		let { username, password } = authorization.account.data();

		let request = new API({ username, password });

		return browser.waitForPromise(async () => {
			let { subject, content }: Required<IPutMessageData> = { ...this.data, ...params };

			params = merge<ISendMessageData>({
				subject,
				body: {
					html: content
				},
				correspondents: {
					to: username
				}
			}, params);

			let response = await request.send(params);

			assert.equal(response.status, RPC.HTTPStatus.OK);

			return response;
		}, null, 'Could not send message');
	}
}

export type ISendMessageData = MailAPI.MessagesSend & ITransportData;

export interface ITransportData {
	subject?: string,
	content?: string,
}

export interface IPutMessageData {
	folder?: number;
	subject?: string;
	content?: string | Buffer;
	attachments?: Array<string>;
	raw?: IDeliverydBody;
	type?: string;
	headers?: {
		[name: string]: string;
	}
}

export { IDeliverydData, IDeliverydRequest, IDeliverydResponse };
export default Transport;
