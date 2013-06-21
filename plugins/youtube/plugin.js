/*
This plugin embeds a youtube video in the page. command() controls what happens when the button is hit.
*/
CKEDITOR.plugins.add( 'youtube',
{
	init: function( editor )
	{
      editor.addCommand( 'youtubeDialog', new CKEDITOR.dialogCommand( 'youtubeDialog' ) );
      
      editor.ui.addButton( 'Youtube',
      {
          label:'Embed Youtube Video',
          icon: this.path + 'icon.png',
          command: 'youtubeDialog'
      } );
      
      var allowed = 'iframe[width,height,src,frameborder,allowfullscreen]';
      pluginName = 'youtubeDialog';
      
      editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName, {
      	allowedContent: allowed
      } ) );
      
      CKEDITOR.dialog.add( pluginName, function( editor )
      {
      	return {
      		title : 'Youtube Video',
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
                        	label : 'Youtube URL',
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
                    //if the user takes the link from the 'share' tab on youtube, this case will display it correctly
                    if(data.link.indexOf("watch?v=") == -1)
                    {
                        editor.insertHtml('<iframe width="560" height="315" src="' + data.link + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                    }
                    //otherwise, if the user copies the url directly from the page, this will display it correctly. 
                    else
                    {
                        var links = data.link.split("watch?v=")
                        editor.insertHtml("<iframe width='560' height='315' src='" + links[0]+ "embed/"+ links[1] + "?rel=0' frameborder='0' allowfullscreen></iframe>");
                    }
          
                }
             }
        };
      });
  }
});

CKEDITOR.config.syrinx_siteBase = "";

