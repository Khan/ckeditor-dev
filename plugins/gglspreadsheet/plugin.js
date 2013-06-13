/*
This plugin embeds a google spreadsheet in the page. command() controls what happens when the button is hit.
*/
(function(){
  var command= {
    exec:function(editor){
        //TODO(annie): prettyify UI
      var link = prompt("Please enter a link to the google spreadsheet you want to embed");

      if(link != false && link != null)
      {
          //#gid specifies which sheet in a multipage spreadsheet to embed. If it's unspecified, we assume the first sheet.
          if(link.indexOf('#gid'))
          {
              link2=link.split('#gid');
              editor.insertHtml("<iframe width='100%' height='300' frameborder='0' src='" + link2[0] + "&output=html&chrome=false#gid" + link2[1] + "'></iframe>");
          }
          else
          {
              editor.insertHtml("<iframe width='100%' height='300' frameborder='0' src='" + link1 + "&output=html&chrome=false#gid=0'></iframe>");
          }
      }
    },
    allowedContent: 'iframe[width,height,frameborder,src]'
  },

  pluginName='gglspreadsheet';
  CKEDITOR.plugins.add(pluginName,{
    init:function(editor){
      editor.addCommand(pluginName,command);
      editor.ui.addButton('gglspreadsheet',{
        label:'Insert Google Spreadsheet',
        icon: this.path + 'spreadsheet.png',
        command:pluginName
      });
    }
  });

})();

CKEDITOR.config.syrinx_siteBase = "";
