declare function step (name: string): void;

declare function step (target: Object,
                       propertyKey: string | symbol,
                       descriptor: TypedPropertyDescriptor<any>): void;


declare type DeprecatedDecorator = ClassDecorator & PropertyDecorator;
interface DeprecatedOptions {
	alternative?: string;
	version?: string;
	url?: string;
}
declare function deprecated (options?: DeprecatedOptions): DeprecatedDecorator;
declare function deprecated (alternative?: string, version?: string, url?: string): DeprecatedDecorator;
//declare function deprecated<T extends Function> (fn: T): T;
//declare function deprecated<T extends Function> (options: DeprecatedOptions, fn: T): T;
//declare function deprecated<T extends Function> (alternative: string, fn: T): T;
//declare function deprecated<T extends Function> (alternative: string, version: string, fn: T): T;
//declare function deprecated<T extends Function> (alternative: string, version: string, url: string, fn: T): T;


declare module NodeJS {
	export interface Global {
		step: any;
		deprecated: any;
	}
}
