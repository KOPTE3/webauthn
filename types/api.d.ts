import { Url } from 'url';

export declare interface RequestResult<T = any> {
	path: string;
	status?: number;
	response?: {
		statusCode: number;
		body: any;
		headers: {
			[name: string]: string;
		};
		request: {
			uri: Url;
			method: 'POST' | 'GET';
			headers: {
				[name: string]: string;
			};
		};
	};
	error?: Error;
	body?: T;
}

