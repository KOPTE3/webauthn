export default function mock(method: string, data: any, once: boolean = false): void {
	browser.execute(
		(method: string, data: any, once: boolean) => {
			window.require(['RPC'], (RPC) => {
				const mock = once ? RPC.mock.once : RPC.mock;

				mock(method, data);
			});
		},
		method, data, once
	);
}
