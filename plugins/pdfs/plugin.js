(function(){
  var a= {
    exec:function(editor){
      var link = prompt("Please enter a link to the PDF you want to embed");
      if(link != false && link != null)
      {
          editor.insertHtml('<iframe embed src="'+link+'" width="900" height="1065"></iframe>');
      }
    },
    allowedContent: 'iframe[width,height,embed,src]'
  },

  b='pdfs';
  CKEDITOR.plugins.add(b,{
    init:function(editor){
      editor.addCommand(b,a);
      editor.ui.addButton('pdfs',{
        label:'Embed a Pdf',
        icon: this.path + 'about.png',
        command:b
      });
    }
  });

})();

CKEDITOR.config.syrinx_siteBase = "";