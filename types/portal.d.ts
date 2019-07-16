interface PHAccount {
	active: boolean;
	counters: object;
	email: string;
	firstName: string;
	lastName: string;
	socialId: string | number | undefined;
	verified: boolean;
}

interface PHAccounts {
	accounts: PHAccount[];
	activeEmailByResponse: string;
	status: string | 'ok';
}

declare interface Window {
	__PH: {
		logoutAccount(email: string, calback: (result: PHAccounts) => void): void
		activeUser(): string | undefined
	};
}
