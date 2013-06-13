/*
This plugin embeds a youtube video in the page. command() controls what happens when the button is hit.
*/
(function(){
  var command= {
    exec:function(editor){
  //TODO(annie): prettyify UI
      var link = prompt("Please enter a link to the youtube video you want to embed");
      if(link)
      {
          //if the user takes the link from the 'share' tab on youtube, this case will display it correctly
          if(link.indexOf("watch?v=") == -1)
          {
              editor.insertHtml('<iframe width="560" height="315" src="' + link + '?rel=0" frameborder="0" allowfullscreen></iframe>');
          }
          //otherwise, if the user copies the url directly from the page, this will display it correctly. 
          else
          {
              var links = link.split("watch?v=")
              editor.insertHtml("<iframe width='560' height='315' src='" + links[0]+ "embed/"+ links[1] + "?rel=0' frameborder='0' allowfullscreen></iframe>");
          }
          
      }
    },
    allowedContent: 'iframe[width,height,src,frameborder,allowfullscreen]'
  },
  pluginName='youtube';
  CKEDITOR.plugins.add(pluginName,{
    init:function(editor){
      editor.addCommand(pluginName,command);
      editor.ui.addButton('youtube',{
        label:'Insert Youtube Video',
        icon: this.path + 'icon.png',
        command:pluginName
      });
    }
  });

})();

CKEDITOR.config.syrinx_siteBase = "";

