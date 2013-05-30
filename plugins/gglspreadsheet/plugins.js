(function(){
  var a= {
    exec:function(editor){
      var media = window.showModalDialog(editor.config.syrinx_siteBase + 
                  "/popups/InsertImagePopup.aspx?T=Insert Image",null,
                  "dialogWidth:750px;dialogHeight:500px;center:yes; resizable: yes; help: no");

      if(media != false && media != null)
      {
        if(media.mediaUrl.substr(media.mediaUrl.length-4) == ".wmv")
        {
          var x = '<div title="click to play video" onclick="showMediaClip(this,'' + media.mediaUrl + '',' + media.width + ',' + media.height +
          ')" style="cursor: pointer"><img alt="" src="' + media.mediaImage + '" /></div>';
          editor.insertHtml(x);
        }
        else
          editor.insertHtml("<img src='" + media.mediaUrl + "' />");
      }
    }
  },

  b='syrinxImage';
  CKEDITOR.plugins.add(b,{
    init:function(editor){
      editor.addCommand(b,a);
      editor.ui.addButton('SyrinxImage',{
        label:'Insert Image',
        icon: this.path + 'toolBarButton.png',
        command:b
      });
    }
  });

})();

CKEDITOR.config.syrinx_siteBase = "";

//<iframe width='500' height='300' frameborder='0' src='https://docs.google.com/spreadsheet/pub?key=0AuYJHpQk6kt6dHVhU1p1TDRrY3k0ZjluTWtCVnpvT2c&output=html&widget=true'></iframe>