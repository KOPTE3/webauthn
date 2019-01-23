declare module NodeJS {
	export interface Global {
		step: any;
		deprecated: any;
	}
}

declare interface Window {
	require(deps: string[], callback: (...modules) => void, errcallback?: (...modules) => void);
}

declare var gen: MethodDecorator;
