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
                        	id : 'fullWidth',
                        	label : 'Fit to fill width of article',
                        	'default' : false
                        }
      				]
      			}
      		],
            onOk : function()
            {
                var dialog = this,
                	    data = {};
                this.commitContent( data );
                if(data.fullWidth)
                {
                    editor.insertHtml('<img src="' + data.link + '" alt="' + data.text + '" width="100%" />');
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
      /*if(link != false && link != null)
      {
          editor.insertHtml('<img src="' + link + '" alt="' + text + '">');         
      }
    },
    allowedContent: 'iframe[width,height,src,frameborder,allowfullscreen]'
  //},
  
  

  /*b='image2';
  CKEDITOR.plugins.add(b,{
    init:function(editor){
      editor.addCommand(b,a);
      editor.addCommand( 'image2Dialog', new CKEDITOR.dialogCommand( 'image2Dialog' ) );
      editor.ui.addButton('image2',{
        label:'Insert Image',
        icon: this.path + 'icons/icon.png',
        command:b
      });
    }
  });*/
  
 



CKEDITOR.config.syrinx_siteBase = "";

