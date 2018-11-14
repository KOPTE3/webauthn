interface FolderStore {
	ids: {
		[name: string]: number
	};
	[name: string]: any;
}

/** @namespace FoldersStore */
const FolderStore: FolderStore = {
	/** Идентификаторы папок */
	ids: {
		root: -1,
		inbox: 0,
		spam: 950,
		sent: 500000,
		drafts: 500001,
		trash: 500002,
		templates: 500006,
		archive: 500010,
		social: 500011,
		promotions: 500012,
		newsletters: 500013,
		outbox: 500014
	}
};

export default FolderStore;
