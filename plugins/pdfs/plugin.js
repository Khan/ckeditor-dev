/*
This plugin embeds a pdf in the page. command() controls what happens when the button is hit.
*/

CKEDITOR.plugins.add( 'pdfs',
{
    icons: "pdfs",
	init: function( editor )
	{
      editor.addCommand( 'pdfsDialog', new CKEDITOR.dialogCommand( 'pdfsDialog' ) );
      
      editor.ui.addButton( 'Pdfs',
      {
          label:'Embed Pdf',
          command: 'pdfsDialog'
      } );
      
      var allowed = 'iframe[width,height,embed,src]';
      pluginName = 'pdfsDialog';
      
      editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName, {
      	allowedContent: allowed
      } ) );
      
      CKEDITOR.dialog.add( pluginName, function( editor )
      {
      	return {
      		title : 'Pdf',
      		minWidth : 300,
      		minHeight : 100,
      		contents :
      		[
      			{
      				id : 'general',
      				label : 'Settings',
      				elements :
      				[
      				 	// UI elements of the Settings tab.
                        {
                        	type : 'text',
                        	id : 'link',
                        	label : 'Pdf URL',
                        	validate : CKEDITOR.dialog.validate.notEmpty( 'The URL field cannot be empty.' ),
                        	required : true,
                            commit : function( data )
                            		{
                            			data.link = this.getValue();
                            		}
                        }
      				]
      			}
      		],
            onOk : function()
            {
                var dialog = this,
                	    data = {};
                this.commitContent( data );
                if(data.link)
                {
                    editor.insertHtml('<iframe embed src="'+data.link+'" width="100%" height="600"></iframe>');
                }
             }
        };
      });
  }
});

CKEDITOR.config.syrinx_siteBase = "";
