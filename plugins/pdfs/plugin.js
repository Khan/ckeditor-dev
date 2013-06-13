/*
This plugin embeds a pdf in the page. command() controls what happens when the button is hit.
*/
(function(){
  var command= {
    exec:function(editor){
  //TODO(annie): prettyify UI
      var link = prompt("Please enter a link to the PDF you want to embed");
      if(link)
      {
          editor.insertHtml('<iframe embed src="'+link+'" width="900" height="1065"></iframe>');
      }
    },
    allowedContent: 'iframe[width,height,embed,src]'
  },

  pluginName='pdfs';
  CKEDITOR.plugins.add(pluginName,{
    init:function(editor){
      editor.addCommand(pluginName,command);
      editor.ui.addButton('pdfs',{
        label:'Embed a Pdf',
        icon: this.path + 'pdf.png',
        command:pluginName
      });
    }
  });

})();

CKEDITOR.config.syrinx_siteBase = "";