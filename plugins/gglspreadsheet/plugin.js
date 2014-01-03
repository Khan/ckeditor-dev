/*
This plugin embeds a google spreadsheet in the page. command() controls what happens when the button is hit.
*/

CKEDITOR.plugins.add( 'gglspreadsheet',
{
    icons: "gglspreadsheet",
	init: function( editor )
	{
      editor.addCommand( 'gglspreadsheetDialog', new CKEDITOR.dialogCommand( 'gglspreadsheetDialog' ) );
      
      editor.ui.addButton( 'Gglspreadsheet',
      {
          label:'Embed Google Spreadsheet',
          command: 'gglspreadsheetDialog'
      } );
      
      var allowed = 'iframe[width,height,frameborder,src]';
      pluginName = 'gglspreadsheetDialog';
      
      editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName, {
      	allowedContent: allowed
      } ) );
      
      CKEDITOR.dialog.add( pluginName, function( editor )
      {
      	return {
      		title : 'Google Spreadsheet',
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
                        	label : 'Google Spreadsheet URL',
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
                if(data.link != false && data.link != null)
                {
                    //#gid specifies which sheet in a multipage spreadsheet to embed. If it's unspecified, we assume the first sheet.
                    if(data.link.indexOf('#gid'))
                    {
                        link2=data.link.split('#gid');
                        editor.insertHtml("<iframe width='100%' height='600' frameborder='0' src='" + link2[0] + "&output=html&chrome=false#gid" + link2[1] + "'></iframe>");
                    }
                    else
                    {
                        editor.insertHtml("<iframe width='100%' height='600' frameborder='0' src='" + data.link + "&output=html&chrome=false#gid=0'></iframe>");
                    }
                }
             }
        };
      });
  }
});

CKEDITOR.config.syrinx_siteBase = "";

