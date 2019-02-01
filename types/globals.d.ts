declare module NodeJS {
	export interface Global {
		step: any;
		deprecated: any;
	}
}

declare interface Window {
	require: {
		(deps: string | string[], callback?: (...modules) => void, errcallback?: (...modules) => void);
		defined: {
			[moduleName: string]: any;
		}
	};
}

declare var gen: MethodDecorator;
