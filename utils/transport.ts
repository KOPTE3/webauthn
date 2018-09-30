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

export default class Transport {
	data: ITransportData;

	constructor(data?: ITransportData) {
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
	putMessage(params: IPutMessageData = {}): IDeliverydResponse {
		const { username, password } = authorization.account.data();
		const transport = new Deliveryd({ username, password });

		return browser.waitForPromise(async () => {
			const { subject, content: body, attachments, rawFilename }: Required<IPutMessageData> = { ...this.data, ...params };

			const requestBody: IPutMessageData = {
				subject,
				body,
				...params
			};

			if (attachments) {
				requestBody.attachments = (attachments as string[]).map((value) => system.file(value));
			}

			if (typeof rawFilename === 'string') {
				const file = system.file(rawFilename);

				requestBody.raw = fs.readFileSync(file, 'utf-8');
			}

			const response = await transport.send(requestBody);

			assert.strictEqual(response.status, RPC.HTTPStatus.OK);

			return response;
		});
	}

	/**
	 * Покладка треда в текущий ящик
	 *
	 * @see putMessage
	 */
	putThread(params: IPutMessageData = {}): IDeliverydResponse {
		const { message } = this.putMessage(params);

		const response = this.putMessage({
			source: {
				reply: message.messageId
			}
		});

		assert.strictEqual(response.status, RPC.HTTPStatus.OK);

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
	sendMessage(params: ISendMessageData): IAPIResponse {
		const { username, password } = authorization.account.data();
		const request = new API({ username, password });

		return browser.waitForPromise(
			async () => {
				const { subject, content }: Required<ISendMessageData> = { ...this.data, ...params };

				params = merge(
					{
						subject,
						body: { html: content },
						correspondents: { to: username }
					},
					params
				);

				const response = await request.send(params);

				assert.strictEqual(response.status, RPC.HTTPStatus.OK);

				return response;
			},
			null,
			'Could not send message'
		);
	}

	saveDraft(params: SaveDraftData): IAPIResponse {
		const { username, password } = authorization.account.data();
		const request = new API({ username, password });

		return browser.waitForPromise(
			async () => {
				const { subject, content, saveAsTemplate }: Required<SaveDraftData> = { ...this.data, ...params };

				params = merge(
					{
						subject,
						body: { html: content },
						correspondents: { to: username },
						save_as_template: saveAsTemplate
					},
					params
				);

				const response = await request.send(params);

				assert.strictEqual(response.status, RPC.HTTPStatus.OK);

				return response;
			},
			null,
			'Could not save draft'
		);
	}
}

// not to break compatibility
// tslint:disable-next-line
export interface ITransportData {
	subject?: string;
	content?: string;
}

export type ISendMessageData = MailAPI.MessagesSend & ITransportData;

export type IPutMessageData = IDeliverydRequest & {
	content?: string;
	rawFilename?: string;
};

export interface SaveDraftData extends MailAPI.MessagesDraft {
	content?: string;
	saveAsTemplate?: boolean;
}

export { IDeliverydRequest, IDeliverydResponse };
