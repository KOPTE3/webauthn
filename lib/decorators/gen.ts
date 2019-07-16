import Element from '../../element';
import { lcFirst } from '../../utils/utils';

type ElementConstructor = new (...rest: any[]) => Element;

const gen = <T>(
	Class: typeof Element,
	propetryKey: string,
	descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> => {
	const localName = lcFirst(propetryKey);

	Reflect.defineProperty(Class, localName, {
		enumerable: false,
		configurable: true,
		writable: false,
		value(this: ElementConstructor) {
			const instance = Reflect.construct(this, []);
			return Reflect.apply(
				(Class as any)[propetryKey],
				Class,
				[instance, ...arguments]
			);
		}
	});

	Reflect.defineProperty(Class.prototype, localName, {
		enumerable: false,
		configurable: true,
		writable: false,
		value() {
			return Reflect.apply(
				(Class as any)[propetryKey],
				Class,
				[this, ...arguments]
			);
		}
	});

	return descriptor;
};

Reflect.defineProperty(global, 'gen', {
	configurable: false,
	enumerable: false,
	writable: false,
	value: gen
});
