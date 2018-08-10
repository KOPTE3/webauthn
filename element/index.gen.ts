import './index';

declare module './index' {
	interface Element {
		isVisible (): boolean;
	}
	namespace Element {
		function isVisible (): boolean;
	}
}
