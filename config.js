/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%
	config.tabSpaces = 4;
    //config.forceSimpleAmpersand = true;
	config.plugins =
		//'about,' +
		//'a11yhelp,' +
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
		//'smiley,' +
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
		config.extraPlugins = 'gglspreadsheet,youtube,pdfs';
        config.linkShowAdvancedTab = false;
        config.linkShowTargetTab = false;
        config.toolbar = 'KhanToolbar';
        
        config.toolbar_KhanToolbar =   
        [
        [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ],
        [ 'Format' ],
        [ 'NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ],
        [ 'Link'  ],
        [ 'Table', 'SpecialChar' ],
        [ 'Image', 'youtube', 'gglspreadsheet', 'youtube' ] 
        ]
        
        config.format_tags = 'p;h1;h2;h3';
		
	// %REMOVE_END%
};

CKEDITOR.on( 'dialogDefinition', function( ev ) { 
    // Take the dialog name and its definition from the event data. 
    var dialogName = ev.data.name; 
    var dialogDefinition = ev.data.definition; 
    //var dialog = CKEDITOR.dialog.getCurrent(); 
    //alert( dialog.getName() ); 

    // Check if the definition is from the dialog we are interested in (the 'link' dialog) 
    if(dialogName == 'link') { 
         
        dialogDefinition.onShow = function () { 
            var dialog = CKEDITOR.dialog.getCurrent(); 
            //dialog.hidePage( 'target' ); // now via config 
            //dialog.hidePage( 'advanced' ); // now via config 
            elem = dialog.getContentElement('info','anchorOptions');     
            elem.getElement().hide(); 
            elem = dialog.getContentElement('info','emailOptions');     
            elem.getElement().hide(); 
            var elem = dialog.getContentElement('info','linkType');     
            elem.getElement().hide(); 
            elem = dialog.getContentElement('info','protocol');   
            dialogDefinition.removeContents('advanced');   
            elem.disable(); 
        }; 
             
    } 
    /* if you have any plugin of your own and need to remove ok button 
    else if(dialogName == 'my_own_plugin') { 
        // remove ok button (this was hard to find!) 
        dialogDefinition.onShow = function () { 
           // this is a hack 
           document.getElementById(this.getButton('ok').domId).style.display='none'; 
        }; 
    }*/ 
    else if(dialogName == 'image') { 
        // memo: dialogDefinition.onShow = ... throws JS error (C.preview not defined) 
         
        // Get a reference to the 'Link Info' tab. 
        var infoTab = dialogDefinition.getContents('info'); 
        // Remove unnecessary widgets 
        infoTab.remove( 'ratioLock' ); 
        infoTab.remove( 'txtHeight' );          
        infoTab.remove( 'txtWidth' );          
        infoTab.remove( 'txtBorder'); 
        infoTab.remove( 'txtHSpace'); 
        infoTab.remove( 'txtVSpace'); 
        infoTab.remove( 'cmbAlign' ); 

        dialogDefinition.onLoad = function () { 
            var dialog = CKEDITOR.dialog.getCurrent(); 
             
            var elem = dialog.getContentElement('info','htmlPreview');     
            elem.getElement().hide(); 
         
            dialog.hidePage( 'Link' ); 
            dialog.hidePage( 'advanced' ); 
            dialog.hidePage( 'info' ); // works now (CKEditor v3.6.4) 
            this.selectPage('Upload'); 
             
            /*var uploadTab = dialogDefinition.getContents('Upload'); 
            var uploadButton = uploadTab.get('uploadButton'); 
            uploadButton['filebrowser']['onSelect'] = function( fileUrl, errorMessage ) { 
                //$("input.cke_dialog_ui_input_text").val(fileUrl); 
                dialog.getContentElement('info', 'txtUrl').setValue(fileUrl); 
                //$(".cke_dialog_ui_button_ok span").click(); 
            }*/ 
        }; 

    } 
    else if(dialogName == 'table') { 
        dialogDefinition.removeContents('advanced'); 
    }         

}); 

// %LEAVE_UNMINIFIED% %REMOVE_LINE%
