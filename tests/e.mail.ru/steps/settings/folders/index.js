'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let FoldersPage = require('../../../pages/settings/folders');
let ControlsPage = require('../../../pages/settings/folders/controls');
let FieldsPage = require('../../../pages/settings/folders/fields');
let DropdownsPage = require('../../../pages/settings/folders/dropdowns');
let LayerFolderAdd = require('../../layers/folderAdd');

class Folders extends Steps {
	constructor () {
		super();

		this.foldersPage = new FoldersPage();
		this.controlsPage = new ControlsPage();
		this.fieldsPage = new FieldsPage();
		this.dropdownsPage = new DropdownsPage();
	}

	createFolder (data) {
		let {name, parent} = data;

		this.foldersPage.open();
		this.controlsPage.newFolder();
		LayerFolderAdd.show();
		this.fieldsPage.setFieldValue('name', name);
		this.dropdownsPage.setDropdownValue('parent', parent);
		LayerFolderAdd.apply();
		this.foldersPage.waitAddSuccess(data);
	}
}

module.exports = Folders;
