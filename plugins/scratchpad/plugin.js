/*
 * This plugin embeds a Khan Academy CS Scratchpad in the page.
 */

(function() {

var pluginName = "scratchpad";

CKEDITOR.plugins.add(pluginName, {
    requires: "dialog,fakeobjects",
    icons: pluginName,

    init: function(editor) {
        var plugin = this;
        var allowed = "iframe[!src,!height,!width,scrolling,frameBorder](" +
            pluginName + ")";
        var lang = editor.lang.fakeobjects
        lang[pluginName] = "Embedded Scratchpad";

        // Add a command that when executed opens up the scratchpad dialog
        editor.addCommand(
            pluginName,
            new CKEDITOR.dialogCommand(pluginName, {
                allowedContent: allowed
            })
        );

        // Add a toolbar button (named 'Scratchpad') that executes the plugin
        editor.ui.addButton("Scratchpad", {
            label: lang[pluginName],
            command: pluginName
        });

        // Make it so that when you double-click on one of the placeholder
        // elements it opens up the scratchpad dialog for editing.
        editor.on("doubleclick", function( evt ) {
            if (evt.data.element.data("cke-real-element-type") === pluginName) {
                evt.data.dialog = pluginName;
            }
        });

        // Load the dialog from an external file
        CKEDITOR.dialog.add(pluginName, this.path + "dialogs/" +
            pluginName + ".js");
    },

    onLoad: function() {
        // Basic styling for the placeholder element
        CKEDITOR.addCss("img." + pluginName + " {" +
            "background-color: #EEE;" +
            // Add an image that reads 'Scratchpad' to make it easier to
            // understand what the element represents.
			"background-image: url(" + CKEDITOR.getUrl(
                this.path + "images/placeholder.png") + ");" +
			"background-position: center center;" +
			"background-repeat: no-repeat;" +
            "border: 1px dashed #AAA;" +
        "}");
    },

    afterInit: function(editor) {
        var dataProcessor = editor.dataProcessor,
            dataFilter = dataProcessor && dataProcessor.dataFilter;

        if (!dataFilter) {
            return;
        }

        // Make it so that after editing the source and toggling back to the
        // WYSIWYG mode that the fake element is regenerated from the iframe
        dataFilter.addRules({
            elements: {
                iframe: function(element) {
                    var elemClass = element.attributes["class"];
                    if (elemClass && elemClass.indexOf(pluginName) >= 0) {
                        var fakeImage = editor.createFakeParserElement(element,
                            pluginName, pluginName, false);
                        fakeImage.attributes.height = element.attributes.height;
                        fakeImage.attributes.width = element.attributes.width;
                        return fakeImage;
                    }
                }
            }
        });
    }
});

})();