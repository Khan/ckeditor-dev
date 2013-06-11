/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%
	config.plugins =
		'about,' +
		'a11yhelp,' +
		'basicstyles,' +
		'bidi,' +
		'blockquote,' +
		'clipboard,' +
		'colorbutton,' +
		'colordialog,' +
		'contextmenu,' +
		'dialogadvtab,' +
		'div,' +
		'elementspath,' +
		'enterkey,' +
		'entities,' +
		'filebrowser,'+
		'find,' +
		'flash,' +
		'floatingspace,' +
		'font,' +
		'format,' +
		'forms,' +
		'horizontalrule,' +
		'htmlwriter,' +
		'image,' +
		'iframe,' +
		'indent,' +
		'justify,' +
		'link,' +
		'list,' +
		'liststyle,' +
		'magicline,' +
		'maximize,' +
		'newpage,' +
		'pagebreak,' +
		'pastefromword,' +
		'pastetext,' +
		'preview,' +
		'print,' +
		'removeformat,' +
		'resize,' +
		'save,' +
		'selectall,' +
		'showblocks,' +
		'showborders,' +
		'smiley,' +
		'sourcearea,' +
		'specialchar,' +
		'stylescombo,' +
		'tab,' +
		'table,' +
		'tabletools,' +
		'templates,' +
		'toolbar,' +
		'undo,' +
		'wysiwygarea';

		//added for widgets
		config.extraPlugins = 'gglspreadsheet,youtube,pdfs,image2';
        config.linkShowAdvancedTab = false;
        config.linkShowTargetTab = false;
        config.extraAllowedContent = 'img[*]';
        config.toolbar = 'KhanToolbar';
        
        config.toolbar_KhanToolbar =   
        [
        [ 'Source' ],
        [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ],
        [ 'Format' ],
        [ 'NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ],
        [ 'Link'  ],
        [ 'Table', 'SpecialChar' ],
        [ 'Image2', 'youtube', 'gglspreadsheet', 'pdfs' ] 
        ]
        
        config.format_tags = 'p;h1;h2;h3';
		
};

// %LEAVE_UNMINIFIED% %REMOVE_LINE%
