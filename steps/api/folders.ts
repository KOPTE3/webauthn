import { Credentials } from '../../types/api';
import * as MailApi from '../../api/mail-api';

export default class FoldersStep {
	@step('Очистить папки {options.ids}')
	clearFolders(ids: string[], credentials?: Credentials): void {
		MailApi.foldersClear(ids, credentials);
	}
}

export const foldersSteps = new FoldersStep();
