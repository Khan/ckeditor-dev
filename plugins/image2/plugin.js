
/* This custom image plugin takes a link instead of uploading an image from the users computer, and has only the functionality we want and none of the noise we wouldn't be using.
We wanted to give content creators options to full screen a picture and either insert it inline with text or not.
The original editor was so complex it was easier to start from scratch. */

CKEDITOR.plugins.add( 'image2',
{
    icons: 'image2',
	init: function( editor )
	{
      editor.addCommand( 'image2Dialog', new CKEDITOR.dialogCommand( 'image2Dialog' ) );

      editor.ui.addButton( 'Image2',
      {
          label:'Insert Image',
          command: 'image2Dialog'
      } );

      var allowed = 'img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width,class,style}; span[class](*);';
      required = 'img[alt,src]';
      pluginName = 'image2Dialog';

      editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName, {
      	allowedContent: allowed,
      	requiredContent: required,
      	contentTransformations: [
      		[ 'img{width}: sizeToStyle', 'img[width]: sizeToAttribute' ],
      		[ 'img{float}: alignmentToStyle', 'img[align]: alignmentToAttribute' ]
      	]
      } ) );

      CKEDITOR.dialog.add( pluginName, function( editor )
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
                        	validate : CKEDITOR.dialog.validate.notEmpty( 'The URL field cannot be empty.' ),
                        	required : true,
                            commit : function( data )
                            		{
                            			data.link = this.getValue();
                            		}
                        },
                        {
                        	type : 'text',
                        	id : 'caption',
                        	label : 'Image caption  (leave blank if you don\'t want to set a caption)',
                        	required : false,
                            commit : function( data )
                            		{
                            			data.caption = this.getValue();
                            		}
                        },
                        {
                        	type : 'textarea',
                        	id : 'text',
                        	label : 'Alternate Text (This is what will show if the picture cannot load.)',
                        	required : false,
                            commit : function( data )
                            		{
                            			data.text = this.getValue().replace(/"/g, '&quot;');
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
                        },
                        {
                            type : 'checkbox',
                            id : 'inline',
                            label : 'Inline with text',
                            'default' : false,
                            commit : function( data )
                                    {
                                    	data.inline = this.getValue();
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
                var wrapperClass = data.inline ? "inline-image" : "block-image";
                var width = data.fullwidth ? ' width="100%"' : '';
                var caption = data.caption ? ('<span class="image-caption">' + data.caption + '</span>') : '';
                html = '<span class="image-wrapper ' + wrapperClass + '">' +
                    '<img src="' + data.link + '" alt="' + data.text + '" ' + width + '>' +
                    caption +
                    '</span>';

                editor.insertHtml(html, "unfiltered_html");
             }
        };
      });
  }
});
CKEDITOR.config.syrinx_siteBase = "";

