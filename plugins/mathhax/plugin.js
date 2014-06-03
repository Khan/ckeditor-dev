(function() {
    'use strict';

    var TeX = KAdefine.require('react-components/tex.jsx');

    var renderTeX = function(elem, math) {
        // clear out the container
        while (elem.lastChild) {
            elem.removeChild(elem.lastChild);
        }

        React.renderComponent(TeX({}, math), elem);
    };

	CKEDITOR.plugins.add( 'mathhax', {
		requires: 'widget,dialog',
		icons: 'mathhax',
		hidpi: true, // %REMOVE_LINE_CORE%

		init: function( editor ) {
			editor.widgets.add( 'mathhax', {
				inline: true,
				dialog: 'mathhax',
				button: 'Math',
				mask: true,
				allowedContent: 'code(!latex)',
				pathName: 'math',
                draggable: false,

				template: '<code class="latex" style="display:inline-block" data-cke-survive=1></code>',

				parts: {
					code: 'code'
				},

				defaults: {
					math: '\\nabla \\cdot \\vec{\\mathbf{E}} = 4 \\pi \\rho'
				},

				data: function() {
                    renderTeX(this.parts.code.$, this.data.math);
				},

				upcast: function(el, data) {
                    // if we encounter <code class="latex"> we can assume it's
                    // an instance of this widget
                    if (!(el.name === 'code' && el.hasClass('latex'))) {
                        return;
                    }

                    if (el.children.length > 1 ||
                        el.children[0].type !== CKEDITOR.NODE_TEXT) {
                        return;
                    }

                    data.math = CKEDITOR.tools.htmlDecode(
                        el.children[0].value);
                    el.children[0].remove();
					return el;
				},

                // convert from a widget to a node
				downcast: function(el) {
                    el.children[0].replaceWith(
                        new CKEDITOR.htmlParser.text(
                            CKEDITOR.tools.htmlEncode(this.data.math)
                        )
                    );
					return el;
				}
			} );

			// Add dialog.
			CKEDITOR.dialog.add('mathhax', this.path + 'dialogs/mathhax.js');
		}
	} );

	CKEDITOR.plugins.mathhax = {
        loadingIcon: CKEDITOR.plugins.get('mathhax').path + 'images/loader.gif'
    };

})();
