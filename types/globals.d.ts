declare module NodeJS {
	export interface Global {
		step: any;
		deprecated: any;
	}
}

declare interface Window {
	require: {
		(deps: string | string[], callback?: (...modules) => void, errcallback?: (...modules) => void): any;
		defined: {
			[moduleName: string]: any;
		}
	};
}

declare namespace Mocha {
	interface ITestDefinition {
		step(description: string, args?: any): void;
	}

	interface IContextDefinition {
		(
			callback: (this: ISuiteCallbackContext) => void
		): ISuite;

		(
			description: string,
			callback: (this: ISuiteCallbackContext) => void
		): ISuite;

		only(
			description: string,
			callback: (this: ISuiteCallbackContext) => void
		): ISuite;

		only(
			callback: (this: ISuiteCallbackContext) => void
		): ISuite;

		skip(
			description: string,
			callback: (this: ISuiteCallbackContext) => void
		): void;

		skip(
			callback: (this: ISuiteCallbackContext) => void
		): void;

		none(
			description: string,
			callback: (this: ISuiteCallbackContext) => void
		): void;

		none(
			callback: (this: ISuiteCallbackContext) => void
		): void;

		timeout(ms: number): void;
	}
}

declare var describe: Mocha.IContextDefinition;
declare var it: Mocha.ITestDefinition;
declare var gen: MethodDecorator;
