# @qa/yoda/wdio/mocha-hooks

Набор хуков для тестового фреймворка Mocha

## Использование

```javascript
// config.js

const MochaHooksPath = require.resolve('@qa/yoda/wdio/mocha-hooks');
const MochaHooksService = require('@qa/yoda/wdio/mocha-hooks/service');

exports.config = {
	mochaOpts: {
		require: MochaHooksPath
	},
	
	services: [
		// other services ...
		
		MochaHooksService
	]
}
```

```typescript
// NNNNNNNNNN.ts
import Messages from '../../steps/messages';

describe(() => {
	it ('Открытие страницы списка писем', () => {
		Messages.open();
	});
});
```

Если блок `describe` анонимный, то в качестве описания будет использоваться название файла (которое должно соответствовать тесткейса в тестрейле). 

**ЗАПОМНИТЕ: писать номер таска в описании не нужно, он также подставляется автоматически.**
