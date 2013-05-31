(function(){
  var a= {
    exec:function(editor){
      var link = prompt("Please enter a link to the google spreadsheet you want to embed");

      if(link != false && link != null)
      {
          editor.insertHtml("<iframe width='500' height='300' frameborder='0' src='" + link + "&widget=true'></iframe>");
      }
    },
    allowedContent: 'iframe[width,height,frameborder,src]'
  },

  b='gglspreadsheet';
  CKEDITOR.plugins.add(b,{
    init:function(editor){
      editor.addCommand(b,a);
      editor.ui.addButton('gglspreadsheet',{
        label:'Insert Image',
        icon: this.path + 'icons/about.png',
        command:b
      });
    }
  });

})();

CKEDITOR.config.syrinx_siteBase = "";
