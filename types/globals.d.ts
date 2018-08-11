declare module NodeJS {
	export interface Global {
		step: any;
		deprecated: any;
	}
}


declare var gen: MethodDecorator;
