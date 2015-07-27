/*
This plugin embeds a youtube video in the page. command() controls what happens when the button is hit.
*/
CKEDITOR.plugins.add( 'youtube',
{
    icons: 'youtube',
    init: function( editor )
    {
      editor.addCommand( 'youtubeDialog', new CKEDITOR.dialogCommand( 'youtubeDialog' ) );
      
      editor.ui.addButton( 'Youtube',
      {
          label:'Embed Youtube Video',
          command: 'youtubeDialog'
      } );
      
      var allowed = 'iframe[width,height,src,frameborder,allowfullscreen],div(youtube-wrapper)';
      var pluginName = 'youtubeDialog';
      
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
                            label : 'Youtube URL or ID',
                            validate : CKEDITOR.dialog.validate.notEmpty( 'This field cannot be empty.' ),
                            required : true,
                            commit : function( data )
                                    {
                                        data.youtubeId = this.getValue();

                                        // Pull from a normal Youtube URL
                                        if (/v=([^&#]+)/.test(data.youtubeId)) {
                                            data.youtubeId = RegExp.$1;

                                        // Pull from a shortened URL
                                        } else if (/youtu.be\/([^&#]+)/.test(data.youtubeId)) {
                                            data.youtubeId = RegExp.$1;
                                        }
                                    }
                        },
                        {
                            type: "html",
                            html: "<p style='font-size:0.8em;'>Example: " +
                                "<span style='font-family:monospace;'>" +
                                "https://www.youtube.com/watch?v=JC82Il2cjqA" +
                                "</span></p>"
                        }
                      ]
                  }
              ],
            onOk : function()
            {
                var dialog = this,
                        data = {};
                this.commitContent( data );
                if(data.youtubeId)
                {
                    editor.insertHtml('<div class="youtube-wrapper"><iframe width="560" height="315" src="//www.youtube.com/embed/' + data.youtubeId + '?rel=0" frameborder="0" allowfullscreen></iframe></div>');
                }
             }
        };
      });
  }
});

CKEDITOR.config.syrinx_siteBase = "";

