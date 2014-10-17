/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
var TeX=React.createFactory(KAdefine.require("react-components/tex.jsx"));
CKEDITOR.dialog.add("mathhax",function(){var b;return{title:"LaTeX",minWidth:350,minHeight:100,contents:[{id:"info",elements:[{id:"equation",type:"textarea",onLoad:function(){this.getInputElement().on("keyup",function(){var a=this.getInputElement().getValue();b(a)}.bind(this))},setup:function(a){this.setValue(a.data.math)},commit:function(a){a.setData("math",this.getValue())}},{id:"preview",type:"html",html:'<code class="latex" style="font-size: 150%;"></code>',onLoad:function(){b=function(a){var b=
CKEDITOR.document.getById(this.domId).$;React.render(TeX({},a),b)}.bind(this);b("")},setup:function(a){b(a.data.math)}}]}]}});