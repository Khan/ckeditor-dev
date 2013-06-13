/* This custom image plugin takes a link instead of uploading an image from the users computer, and has only the functionality we want and none of the noise we wouldn't be using.
We wanted to give content creators options to full screen a picture and either insert it inline with text or not.
The original editor was so complex it was easier to start from scratch. */

CKEDITOR.plugins.add( 'image2',
{
	init: function( editor )
	{
      editor.addCommand( 'image2Dialog', new CKEDITOR.dialogCommand( 'image2Dialog' ) );
      
      editor.ui.addButton( 'Image2',
      {
          label:'Insert Image',
          icon: this.path + 'image.png',
          command: 'image2Dialog'
      } );
      
      CKEDITOR.dialog.add( 'image2Dialog', function( editor )
      {
      	return {
      		title : 'Image Properties',
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
                        	label : 'Image URL',
                        	validate : CKEDITOR.dialog.validate.notEmpty( 'The Alternate Text field cannot be empty.' ),
                        	required : true,
                            commit : function( data )
                            		{
                            			data.link = this.getValue();
                            		}
                        },
                        {
                        	type : 'textarea',
                        	id : 'text',
                        	label : 'Alternate Text (This is what will show if the picture cannot load.)',
                        	required : false,
                            commit : function( data )
                            		{
                            			data.text = this.getValue();
                            		}
                        },
                        {
                        	type : 'checkbox',
                        	id : 'fullwidth',
                        	label : 'Fit to fill width of article',
                        	'default' : false,
                            commit : function( data )
                            		{
                            			data.fullwidth = this.getValue();
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
                console.log(data.fullwidth);
                if(data.fullwidth)
                {
                    editor.insertHtml('<img src="' + data.link + '" alt="' + data.text + '" width="100%" />');
                    console.log('<img src="' + data.link + '" alt="' + data.text + '" width="100%" />');
                }
                else
                {
                    editor.insertHtml('<img src="' + data.link + '" alt="' + data.text + '" />');               
                }
            },
        };
      });
  }
});
      
CKEDITOR.config.syrinx_siteBase = "";

