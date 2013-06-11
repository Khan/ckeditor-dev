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
                        	label : 'Alternate Text (This is what willl show if the picture cannot load.)',
                            validate : CKEDITOR.dialog.validate.notEmpty( 'The Alternate Text field cannot be empty.' ),
                        	required : true,
                            commit : function( data )
                            		{
                            			data.text = this.getValue();
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
                editor.insertHtml('<img src="' + data.link + '" alt="' + data.text + '">'); 
                //editor.insertHtml("<p><img src='http://i1.ytimg.com/i/4a-Gbdw7vOaccHmFo40b9g/mq1.jpg?v=5143a908' alt='text'></p>");
                //editor.insertHtml('test'); 
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

