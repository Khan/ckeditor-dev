/*
 * A dialog to embed a Khan Academy CS Scratchpad in the page.
 */

(function() {

var pluginName = "scratchpad";

// Embed dimensions
var defaultWidth = "810";
var defaultHeight = "440";
var canvasWidth = "400";
var canvasHeight = "400";

CKEDITOR.dialog.add(pluginName, function(editor) {
    return {
        title: "Embed Scratchpad",
        minWidth: 300,
        minHeight: 100,
        contents: [{
            id: "general",
            label: "Settings",
            elements: [
                {
                    type: "text",
                    id: "src",
                    label: "Scratchpad URL",
                    validate: CKEDITOR.dialog.validate.notEmpty(
                        "The URL field cannot be empty." ),
                    required: true,
                    setup: function(iframe) {
                        // Initialize the URL from an existing iframe
                        // (we nuke all the details we added later on)
                        if (iframe && iframe.hasAttribute("src")) {
                            var url = iframe.getAttribute("src");
                            url = url.replace(/\/embedded.*$/, "");
                            this.setValue(url);
                        }
                    },
                    commit: function(iframe) {
                        // Set the URL and add in some additional details
                        // to make the embedding work correctly.
                        var url = this.getValue();
                        url = url.replace(/\/$/, "");
                        url += "/embedded?embed=yes&article=yes";

                        iframe.setAttribute("src", url);
                    }
                },
                {
                    type: "html",
                    html: "<p style='font-size:0.8em;'>Example: " +
                        "<span style='font-family:monospace;'>https://www." +
                        "khanacademy.org/cs/monocleman/5271990638215168" +
                        "</span></p>"
                },
                {
                    type: "checkbox",
                    id: "showOnlyCanvas",
                    label: "Show only canvas (no editor or buttons).",
                    setup: function(iframe) {
                        // Extract the canvas visibility from the query string
                        if (iframe && iframe.hasAttribute("src")) {
                            var url = iframe.getAttribute("src");
                            if (/editor=(\w+)/.test(url)) {
                                this.setValue(RegExp.$1 === "no");
                            }
                        }

                        // Attach a listener to the checkbox to watch for when
                        // it changes and then toggle the default width/height
                        var elem = this;
                        this.getInputElement().on("change", function() {
                            elem.getDialog().setValueOf("general", "height",
                                elem.getValue() ? canvasHeight : defaultHeight);
                            elem.getDialog().setValueOf("general", "width",
                                elem.getValue() ? canvasWidth : defaultWidth);
                        });
                    },
                    commit: function(iframe) {
                        // Set the visibility of the editor, buttons, and author
                        var editor = this.getValue() ? "no" : "yes";
                        var url = iframe.getAttribute("src");
                        iframe.setAttribute("src", url +
                            "&editor=" + editor +
                            "&buttons=" + editor +
                            "&author=" + editor
                        );
                    }
                },
                {
                    type: "hbox",
                    children: [
                        {
                            type: "text",
                            id: "width",
                            label: "Width",
                            "default": defaultWidth,
                            validate: CKEDITOR.dialog.validate.notEmpty(
                                "The width field cannot be empty." ),
                            required: true,
                            requiredContent: "iframe[width]",
                            setup: function(iframe) {
                                // Set the width based upon the iframe value
                                if (iframe && iframe.hasAttribute("width")) {
                                    this.setValue(
                                        iframe.getAttribute("width"));
                                }
                            },
                            commit: function(iframe, fakeStyles, fakeAttrs) {
                                // Set the width on the placeholder and
                                // the iframe.
                                var width = this.getValue();
                                fakeAttrs.width = width;
                                iframe.setAttribute("width", width);

                                // If we're only showing the canvas then we
                                // need to include the width in the URL.
                                if (this.getDialog().getValueOf("general",
                                        "showOnlyCanvas")) {
                                    var url = iframe.getAttribute("src");
                                    iframe.setAttribute("src", url +
                                        "&width=" + width);
                                }
                            }
                        },
                        {
                            type: "text",
                            id: "height",
                            label: "Height",
                            "default": defaultHeight,
                            validate: CKEDITOR.dialog.validate.notEmpty(
                                "The height field cannot be empty." ),
                            required: true,
                            requiredContent: "iframe[height]",
                            setup: function(iframe) {
                                // Set the height based upon the iframe value
                                if (iframe && iframe.hasAttribute("height")) {
                                    this.setValue(
                                        iframe.getAttribute("height"));
                                }
                            },
                            commit: function(iframe, fakeStyles, fakeAttrs) {
                                // Set the height on the placeholder and
                                // the iframe.
                                var height = this.getValue();
                                fakeAttrs.height = height;
                                iframe.setAttribute("height", height);

                                // If we're only showing the canvas then we
                                // need to include the height in the URL.
                                if (this.getDialog().getValueOf("general",
                                        "showOnlyCanvas")) {
                                    var url = iframe.getAttribute("src");
                                    iframe.setAttribute("src", url +
                                        "&height=" + height);
                                }
                            }
                        }
                    ]
                }
            ]
        }],

        // When the dialog is opened.
        onShow: function() {
            // Clear previously saved elements.
            this.fakeImage = this.iframeNode = null;

            // If we're working against a placeholder element then we need to
            // restore the original iframe before setting up the content.
            var fakeImage = this.getSelectedElement();
            if (fakeImage &&
                    fakeImage.data("cke-real-element-type") === pluginName) {
                this.fakeImage = fakeImage;

                var iframeNode = editor.restoreRealElement(fakeImage);
                this.iframeNode = iframeNode;

                this.setupContent(iframeNode);
            } else {
                // Otherwise we can just set up the content right away
                this.setupContent();
            }
        },

        onOk: function() {
            var extraStyles = {};
            var extraAttributes = {};

            // Figure out which element we're working against
            var iframeNode = this.fakeImage ?
                this.iframeNode :
                new CKEDITOR.dom.element("iframe");

            this.commitContent(iframeNode, extraStyles, extraAttributes);

            // Add additional properties to the iframe to format it correctly
            iframeNode.setAttributes({
                "class": pluginName,
                frameBorder: "0",
                scrolling: "no"
            });

            // Refresh the fake image.
            var newFakeImage = editor.createFakeElement(iframeNode,
                pluginName, pluginName, false);
            newFakeImage.setAttributes(extraAttributes);
            newFakeImage.setStyles(extraStyles);

            if (this.fakeImage) {
                newFakeImage.replace(this.fakeImage);
                editor.getSelection().selectElement(newFakeImage);
            } else {
                editor.insertElement(newFakeImage);
            }
        }
    };
});

})();