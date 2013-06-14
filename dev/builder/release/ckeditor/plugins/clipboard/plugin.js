﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function(){function w(a){function b(){var d=a.editable();d.on(q,function(a){(!CKEDITOR.env.ie||!m)&&u(a)});CKEDITOR.env.ie&&d.on("paste",function(d){r||(f(),d.data.preventDefault(),u(d),k("paste")||a.openDialog("paste"))});CKEDITOR.env.ie&&(d.on("contextmenu",h,null,null,0),d.on("beforepaste",function(a){a.data&&!a.data.$.ctrlKey&&h()},null,null,0));d.on("beforecut",function(){!m&&l(a)});var v;d.attachListener(CKEDITOR.env.ie?d:a.document.getDocumentElement(),"mouseup",function(){v=setTimeout(function(){s()},
0)});a.on("destroy",function(){clearTimeout(v)});d.on("keyup",s)}function e(d){return{type:d,canUndo:"cut"==d,startDisabled:!0,exec:function(){"cut"==this.type&&l();var d;var b=this.type;if(CKEDITOR.env.ie)d=k(b);else try{d=a.document.$.execCommand(b,!1,null)}catch(c){d=!1}d||alert(a.lang.clipboard[this.type+"Error"]);return d}}}function c(){return{canUndo:!1,async:!0,exec:function(a,b){var c=function(b,c){b&&g(b.type,b.dataValue,!!c);a.fire("afterCommandExec",{name:"paste",command:e,returnValue:!!b})},
e=this;"string"==typeof b?c({type:"auto",dataValue:b},1):a.getClipboardData(c)}}}function f(){r=1;setTimeout(function(){r=0},100)}function h(){m=1;setTimeout(function(){m=0},10)}function k(d){var b=a.document,c=b.getBody(),e=!1,l=function(){e=!0};c.on(d,l);(7<CKEDITOR.env.version?b.$:b.$.selection.createRange()).execCommand(d);c.removeListener(d,l);return e}function g(d,b,c){d={type:d};if(c&&!a.fire("beforePaste",d)||!b)return!1;d.dataValue=b;return a.fire("paste",d)}function l(){if(CKEDITOR.env.ie&&
!CKEDITOR.env.quirks){var d=a.getSelection(),b,c,e;if(d.getType()==CKEDITOR.SELECTION_ELEMENT&&(b=d.getSelectedElement()))c=d.getRanges()[0],e=a.document.createText(""),e.insertBefore(b),c.setStartBefore(e),c.setEndAfter(b),d.selectRanges([c]),setTimeout(function(){b.getParent()&&(e.remove(),d.selectElement(b))},0)}}function j(d,b){var c=a.document,e=a.editable(),l=function(a){a.cancel()},j=CKEDITOR.env.gecko&&10902>=CKEDITOR.env.version;if(!c.getById("cke_pastebin")){var f=a.getSelection(),h=f.createBookmarks(),
i=new CKEDITOR.dom.element(e.is("body")&&!CKEDITOR.env.ie&&!CKEDITOR.env.opera?"body":"div",c);i.setAttribute("id","cke_pastebin");CKEDITOR.env.opera&&i.appendBogus();var o=0,c=c.getWindow();j?(i.insertAfter(h[0].startNode),i.setStyle("display","inline")):(CKEDITOR.env.webkit?(e.append(i),i.addClass("cke_editable"),o=(e.is("body")?e:CKEDITOR.dom.element.get(i.$.offsetParent)).getDocumentPosition().y):e.getAscendant(CKEDITOR.env.ie||CKEDITOR.env.opera?"body":"html",1).append(i),i.setStyles({position:"absolute",
top:c.getScrollPosition().y-o+10+"px",width:"1px",height:Math.max(1,c.getViewPaneSize().height-20)+"px",overflow:"hidden",margin:0,padding:0}));(j=i.getParent().isReadOnly())?(i.setOpacity(0),i.setAttribute("contenteditable",!0)):i.setStyle("ltr"==a.config.contentsLangDirection?"left":"right","-1000px");a.on("selectionChange",l,null,null,0);j&&i.focus();j=new CKEDITOR.dom.range(i);j.selectNodeContents(i);var g=j.select();if(CKEDITOR.env.ie)var k=e.once("blur",function(){a.lockSelection(g)});var m=
CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){if(CKEDITOR.env.webkit||CKEDITOR.env.opera)CKEDITOR.document[CKEDITOR.env.webkit?"getBody":"getDocumentElement"]().$.scrollTop=m;k&&k.removeListener();CKEDITOR.env.ie&&e.focus();f.selectBookmarks(h);i.remove();var d;if(CKEDITOR.env.webkit&&(d=i.getFirst())&&d.is&&d.hasClass("Apple-style-span"))i=d;a.removeListener("selectionChange",l);b(i.getHtml())},0)}}function o(){if(CKEDITOR.env.ie){a.focus();f();var d=a.focusManager;d.lock();
if(a.editable().fire(q)&&!k("paste"))return d.unlock(),!1;d.unlock()}else try{if(a.editable().fire(q)&&!a.document.$.execCommand("Paste",!1,null))throw 0;}catch(b){return!1}return!0}function p(d){if("wysiwyg"==a.mode)switch(d.data.keyCode){case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:d=a.editable();f();!CKEDITOR.env.ie&&d.fire("beforepaste");(CKEDITOR.env.opera||CKEDITOR.env.gecko&&10900>CKEDITOR.env.version)&&d.fire("paste");break;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:a.fire("saveSnapshot"),
setTimeout(function(){a.fire("saveSnapshot")},0)}}function u(d){var b={type:"auto"},c=a.fire("beforePaste",b);j(d,function(a){a=a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,"");c&&g(b.type,a,0,1)})}function s(){if("wysiwyg"==a.mode){var b=n("Paste");a.getCommand("cut").setState(n("Cut"));a.getCommand("copy").setState(n("Copy"));a.getCommand("paste").setState(b);a.fire("pasteState",b)}}function n(b){var c;if(t&&b in{Paste:1,Cut:1})return CKEDITOR.TRISTATE_DISABLED;if("Paste"==b){CKEDITOR.env.ie&&
(m=1);try{c=a.document.$.queryCommandEnabled(b)||CKEDITOR.env.webkit}catch(e){}m=0}else b=a.getSelection(),c=b.getRanges(),c=b.getType()!=CKEDITOR.SELECTION_NONE&&!(1==c.length&&c[0].collapsed);return c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED}var m=0,r=0,t=0,q=CKEDITOR.env.ie?"beforepaste":"paste";(function(){a.on("key",p);a.on("contentDom",b);a.on("selectionChange",function(a){t=a.data.selection.getRanges()[0].checkReadOnly();s()});a.contextMenu&&a.contextMenu.addListener(function(a,b){t=
b.getRanges()[0].checkReadOnly();return{cut:n("Cut"),copy:n("Copy"),paste:n("Paste")}})})();(function(){function b(c,d,e,l,j){var f=a.lang.clipboard[d];a.addCommand(d,e);a.ui.addButton&&a.ui.addButton(c,{label:f,command:d,toolbar:"clipboard,"+l});a.addMenuItems&&a.addMenuItem(d,{label:f,command:d,group:"clipboard",order:j})}b("Cut","cut",e("cut"),10,1);b("Copy","copy",e("copy"),20,4);b("Paste","paste",c(),30,8)})();a.getClipboardData=function(b,c){function e(a){a.removeListener();a.cancel();c(a.data)}
function l(a){a.removeListener();a.cancel();g=!0;c({type:h,dataValue:a.data})}function j(){this.customTitle=b&&b.title}var f=!1,h="auto",g=!1;c||(c=b,b=null);a.on("paste",e,null,null,0);a.on("beforePaste",function(a){a.removeListener();f=true;h=a.data.type},null,null,1E3);!1===o()&&(a.removeListener("paste",e),f&&a.fire("pasteDialog",j)?(a.on("pasteDialogCommit",l),a.on("dialogHide",function(a){a.removeListener();a.data.removeListener("pasteDialogCommit",l);setTimeout(function(){g||c(null)},10)})):
c(null))}}function x(a){if(CKEDITOR.env.webkit){if(!a.match(/^[^<]*$/g)&&!a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return"html"}else if(CKEDITOR.env.ie){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return"html"}else if(CKEDITOR.env.gecko||CKEDITOR.env.opera){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return"html"}else return"html";return"htmlifiedtext"}function y(a,b){function e(a){return CKEDITOR.tools.repeat("</p><p>",~~(a/2))+(1==
a%2?"<br>":"")}b=b.replace(/\s+/g," ").replace(/> +</g,"><").replace(/<br ?\/>/gi,"<br>");b=b.replace(/<\/?[A-Z]+>/g,function(a){return a.toLowerCase()});if(b.match(/^[^<]$/))return b;CKEDITOR.env.webkit&&-1<b.indexOf("<div>")&&(b=b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,"<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,"<div></div>"),b.match(/<div>(<br>|)<\/div>/)&&(b="<p>"+b.replace(/(<div>(<br>|)<\/div>)+/g,function(a){return e(a.split("</div><div>").length+1)})+"</p>"),b=
b.replace(/<\/div><div>/g,"<br>"),b=b.replace(/<\/?div>/g,""));if((CKEDITOR.env.gecko||CKEDITOR.env.opera)&&a.enterMode!=CKEDITOR.ENTER_BR)CKEDITOR.env.gecko&&(b=b.replace(/^<br><br>$/,"<br>")),-1<b.indexOf("<br><br>")&&(b="<p>"+b.replace(/(<br>){2,}/g,function(a){return e(a.length/4)})+"</p>");return p(a,b)}function z(){var a=new CKEDITOR.htmlParser.filter,b={blockquote:1,dl:1,fieldset:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ol:1,p:1,table:1,ul:1},e=CKEDITOR.tools.extend({br:0},CKEDITOR.dtd.$inline),c={p:1,
br:1,"cke:br":1},f=CKEDITOR.dtd,h=CKEDITOR.tools.extend({area:1,basefont:1,embed:1,iframe:1,map:1,object:1,param:1},CKEDITOR.dtd.$nonBodyContent,CKEDITOR.dtd.$cdata),k=function(a){delete a.name;a.add(new CKEDITOR.htmlParser.text(" "))},g=function(a){for(var b=a,c;(b=b.next)&&b.name&&b.name.match(/^h\d$/);){c=new CKEDITOR.htmlParser.element("cke:br");c.isEmpty=!0;for(a.add(c);c=b.children.shift();)a.add(c)}};a.addRules({elements:{h1:g,h2:g,h3:g,h4:g,h5:g,h6:g,img:function(a){var a=CKEDITOR.tools.trim(a.attributes.alt||
""),b=" ";a&&!a.match(/(^http|\.(jpe?g|gif|png))/i)&&(b=" ["+a+"] ");return new CKEDITOR.htmlParser.text(b)},td:k,th:k,$:function(a){var j=a.name,g;if(h[j])return!1;delete a.attributes;if("br"==j)return a;if(b[j])a.name="p";else if(e[j])delete a.name;else if(f[j]){g=new CKEDITOR.htmlParser.element("cke:br");g.isEmpty=!0;if(CKEDITOR.dtd.$empty[j])return g;a.add(g,0);g=g.clone();g.isEmpty=!0;a.add(g);delete a.name}c[a.name]||delete a.name;return a}}});return a}function A(a,b,e){var b=new CKEDITOR.htmlParser.fragment.fromHtml(b),
c=new CKEDITOR.htmlParser.basicWriter;b.writeHtml(c,e);var b=c.getHtml(),b=b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g,"$1").replace(/(<cke:br \/>){2,}/g,"<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g,"$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g,"$1").replace(/<(cke:)?br( \/)?>/g,"<br>").replace(/<p><\/p>/g,""),f=0,b=b.replace(/<\/?p>/g,function(a){if("<p>"==a){if(1<++f)return"</p><p>"}else if(0<--f)return"</p><p>";return a}).replace(/<p><\/p>/g,"");return p(a,b)}function p(a,b){a.enterMode==
CKEDITOR.ENTER_BR?b=b.replace(/(<\/p><p>)+/g,function(a){return CKEDITOR.tools.repeat("<br>",2*(a.length/7))}).replace(/<\/?p>/g,""):a.enterMode==CKEDITOR.ENTER_DIV&&(b=b.replace(/<(\/)?p>/g,"<$1div>"));return b}CKEDITOR.plugins.add("clipboard",{requires:"dialog",lang:"af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sq,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh",icons:"copy,copy-rtl,cut,cut-rtl,paste,paste-rtl",
init:function(a){var b;w(a);CKEDITOR.dialog.add("paste",CKEDITOR.getUrl(this.path+"dialogs/paste.js"));a.on("paste",function(a){var b=a.data.dataValue,f=CKEDITOR.dtd.$block;-1<b.indexOf("Apple-")&&(b=b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi," "),"html"!=a.data.type&&(b=b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,function(a,b){return b.replace(/\t/g,"&nbsp;&nbsp; &nbsp;")})),-1<b.indexOf('<br class="Apple-interchange-newline">')&&(a.data.startsWithEOL=1,
a.data.preSniffing="html",b=b.replace(/<br class="Apple-interchange-newline">/,"")),b=b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,"$1"));if(b.match(/^<[^<]+cke_(editable|contents)/i)){var h,k,g=new CKEDITOR.dom.element("div");for(g.setHtml(b);1==g.getChildCount()&&(h=g.getFirst())&&h.type==CKEDITOR.NODE_ELEMENT&&(h.hasClass("cke_editable")||h.hasClass("cke_contents"));)g=k=h;k&&(b=k.getHtml().replace(/<br>$/i,""))}CKEDITOR.env.ie?b=b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(b,c){if(c.toLowerCase()in
f){a.data.preSniffing="html";return"<"+c}return b}):CKEDITOR.env.webkit?b=b.replace(/<\/(\w+)><div><br><\/div>$/,function(b,c){if(c in f){a.data.endsWithEOL=1;return"</"+c+">"}return b}):CKEDITOR.env.gecko&&(b=b.replace(/(\s)<br>$/,"$1"));a.data.dataValue=b},null,null,3);a.on("paste",function(e){var e=e.data,c=e.type,f=e.dataValue,h,k=a.config.clipboard_defaultContentType||"html";h="html"==c||"html"==e.preSniffing?"html":x(f);"htmlifiedtext"==h?f=y(a.config,f):"text"==c&&"html"==h&&(f=A(a.config,
f,b||(b=z(a))));e.startsWithEOL&&(f='<br data-cke-eol="1">'+f);e.endsWithEOL&&(f+='<br data-cke-eol="1">');"auto"==c&&(c="html"==h||"html"==k?"html":"text");e.type=c;e.dataValue=f;delete e.preSniffing;delete e.startsWithEOL;delete e.endsWithEOL},null,null,6);a.on("paste",function(b){b=b.data;a.insertHtml(b.dataValue,b.type);setTimeout(function(){a.fire("afterPaste")},0)},null,null,1E3);a.on("pasteDialog",function(b){setTimeout(function(){a.openDialog("paste",b.data)},0)})}})})();