/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

var TeX = React.createFactory(require('react-components/tex.jsx'));

CKEDITOR.dialog.add( 'mathhax', function( editor ) {

    var preview;

    return {
        title: 'Math',
        minWidth: 350,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'equation',
                        type: 'textarea',

                        onLoad: function( widget ) {
                            this.getInputElement().on('keyup', function() {
                                var input = this.getInputElement().getValue();
                                preview(input);
                            }.bind(this));
                        },

                        setup: function( widget ) {
                            this.setValue(widget.data.math);
                        },

                        commit: function( widget ) {
                            widget.setData('math', this.getValue());
                        }
                    },
                    {
                        id: 'preview',
                        type: 'html',
                        html: '<code class="latex" style="font-size: 150%;"></code>',

                        onLoad: function(widget) {
                            preview = function(math) {
                                var elem = CKEDITOR.document.getById(this.domId).$;
                                React.render(TeX({}, math), elem);
                            }.bind(this);
                            preview('');
                        },

                        setup: function( widget ) {
                            preview(widget.data.math);
                        }
                    },
                    {
                        type: 'html',
                        html: '<p>Please use <a href="' +
                            'https://en.wikibooks.org/wiki/LaTeX/Mathematics' +
                            '">LaTeX formatting</a> for the math.</p>'
                    }
                ]
            }
        ]
    };
} );
