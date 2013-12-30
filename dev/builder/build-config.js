/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

/* All plugins that were disabled (set to zero) were removed because we did not want content creators to have that functionality.
gglspreadsheet was added for our googlespreadsheet embedding plugin, youtube for a youtube embedding plugin,
pdfs for our pdf embed plugin, and image2 for a simpler image plugin
*/

var CKBUILDER_CONFIG = {
	skin: 'moono',
	ignore: [
		'dev',
		'README.md',
		'.gitignore',
		'.gitattributes',
		'.idea',
		'.mailmap',
		'.DS_Store'
	],
	plugins: {
		a11yhelp: 0,
		about: 0,
		basicstyles: 1,
		bidi: 1,
		blockquote: 1,
		clipboard: 1,
		colorbutton: 0,
		colordialog: 1,
		contextmenu: 1,
		dialogadvtab: 1,
		div: 0,
		elementspath: 1,
		enterkey: 1,
		entities: 1,
		filebrowser: 1,
		find: 0,
		flash: 0,
		floatingspace: 1,
		font: 0,
		format: 1,
		forms: 0,
		horizontalrule: 1,
		htmlwriter: 1,
		iframe: 0,
		image: 0,
		indent: 1,
		justify: 1,
		link: 1,
		list: 1,
		liststyle: 1,
		magicline: 1,
		maximize: 0,
		newpage: 0,
		pagebreak: 0,
		pastefromword: 0,
		pastetext: 1,
		preview: 0,
		print: 0,
		removeformat: 1,
		resize: 1,
		save: 1,
		selectall: 0,
		showblocks: 0,
		showborders: 1,
		smiley: 0,
		sourcearea: 1,
		sourcedialog: 1,
		specialchar: 1,
		stylescombo: 0,
		tab: 1,
		table: 1,
		tabletools: 1,
		templates: 0,
		toolbar: 1,
		undo: 1,
		wysiwygarea: 1,
		gglspreadsheet: 1,
        youtube: 1,
        pdfs: 1,
        image2: 1
	}
};
