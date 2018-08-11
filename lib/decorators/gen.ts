import Element from '../../element';
import {lcFirst} from '../../utils/utils';


const gen: MethodDecorator = function <T> (
	Class: typeof Element,
	propetryKey: string,
	descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T> {
	const localName = lcFirst(propetryKey);

	Reflect.defineProperty(Class, localName, {
		enumerable: false,
		configurable: true,
		writable: false,
		value: function () {
			const instance = Reflect.construct(this, []);
			return Reflect.apply(
				(Class as any)[propetryKey],
				Class,
				[instance, ...arguments],
			);
		},
	});

	Reflect.defineProperty(Class.prototype, localName, {
		enumerable: false,
		configurable: true,
		writable: false,
		value: function () {
			return Reflect.apply(
				(Class as any)[propetryKey],
				Class,
				[this, ...arguments],
			);
		},
	});

	return descriptor;
};

Reflect.defineProperty(global, 'gen', {
	configurable: false,
	enumerable: false,
	writable: false,
	value: gen,
});
