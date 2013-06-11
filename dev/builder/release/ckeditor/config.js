/**
 * Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
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

