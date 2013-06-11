(function(){
  var a= {
    exec:function(editor){
      var link = prompt("Please enter a link to the youtube video you want to embed");
      if(link != false && link != null)
      {
          if(link.indexOf("watch?v=") == -1)
          {
              editor.insertHtml('<iframe width="560" height="315" src="' + link + '?rel=0" frameborder="0" allowfullscreen></iframe>');
          }
          else
          {
              var links = link.split("watch?v=")
              editor.insertHtml("<iframe width='560' height='315' src='" + links[0]+ "embed/"+ links[1] + "?rel=0' frameborder='0' allowfullscreen></iframe>");
          }
          
      }
    },
    allowedContent: 'iframe[width,height,src,frameborder,allowfullscreen]'
  },

  b='youtube';
  CKEDITOR.plugins.add(b,{
    init:function(editor){
      editor.addCommand(b,a);
      editor.ui.addButton('youtube',{
        label:'Insert Youtube Video',
        icon: this.path + 'icon.png',
        command:b
      });
    }
  });

})();

CKEDITOR.config.syrinx_siteBase = "";

