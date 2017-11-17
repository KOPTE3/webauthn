import * as assert from 'assert';
import * as fs from 'fs';
import RPC from '@qa/rpc';
import { MailAPI } from '@qa/api';
import { Deliveryd, IDeliverydRequest, IDeliverydResponse, IAPIResponse, API } from '@qa/transport';
import * as merge from 'deepmerge';

import system from '../store/system';
import authorization from '../store/authorization';

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
	putMessage (params: IPutMessageData = {}): IDeliverydResponse {
		let { attachments, raw, rawFilename } = params;
		let { username, password } = authorization.account.data();

		let transport = new Deliveryd({ username, password });

		return browser.waitForPromise(async () => {
			let { subject, content: body }: Required<IPutMessageData> = { ...this.data, ...params };

			let request: IPutMessageData = {
				subject,
				body,
				...params
			};

			if (attachments) {
				request.attachments = (<string[]>attachments).map(value => system.file(value));
			}

			if (typeof rawFilename === 'string') {
				let file = system.file(rawFilename);

				request.raw = fs.readFileSync(file, 'utf-8');
			}

			let response = await transport.send(request);

			assert.equal(response.status, RPC.HTTPStatus.OK);

			return response;
		});
	}

	/**
	 * Покладка треда в текущий ящик
	 *
	 * @see putMessage
	 */
	putThread (params: IPutMessageData = {}): IDeliverydResponse {
		let { message } = this.putMessage(params);

		let response = this.putMessage({
			source: {
				reply: message.messageId
			}
		});

		assert.equal(response.status, RPC.HTTPStatus.OK);

		return response;
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
	sendMessage (params: ISendMessageData): IAPIResponse {
		let { username, password } = authorization.account.data();

		let request = new API({ username, password });

		return browser.waitForPromise(async () => {
			let { subject, content }: Required<ISendMessageData> = { ...this.data, ...params };

			params = merge({
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

export interface ITransportData {
	subject?: string,
	content?: string,
}

export type ISendMessageData = MailAPI.MessagesSend & ITransportData;

export type IPutMessageData = IDeliverydRequest & {
	content?: string;
	rawFilename?: string;
}

export { IDeliverydRequest, IDeliverydResponse };
export default Transport;
