/*
 * This plugin embeds LaTex in the page and provides a preview of it.
 */

(function() {

var pluginName = "latex";


CKEDITOR.plugins.add(pluginName, {
    requires: "dialog,fakeobjects",
    icons: pluginName,

    init: function(editor) {
        var plugin = this;
        var allowed = "code[class(" + pluginName + ")";
        var lang = editor.lang.fakeobjects;
        lang[pluginName] = "LaTeX";

        // Add a command that when executed opens up the dialog
        editor.addCommand(
            pluginName,
            new CKEDITOR.dialogCommand(pluginName, {
                allowedContent: allowed
            })
        );

        // Add a toolbar button (named 'LaTeX') that executes the plugin
        editor.ui.addButton("LaTeX", {
            label: lang[pluginName],
            command: pluginName
        });

        CKEDITOR.dialog.add(pluginName, getDialog);
    }
});

var getDialog = function(editor) {

    return {
        title: "Embed LaTeX",
        minWidth: 300,
        minHeight: 100,
        contents: [{
            id: "general",
            label: "Settings",
            elements: [
                {
                    type: "textarea",
                    id: "source",
                    label: "TeX",
                    validate: CKEDITOR.dialog.validate.notEmpty(
                        "The TeX field cannot be empty." ),
                    required: true,
                    updatePreview: function() {
                        var previewArea = this.getDialog()
                            .getContentElement("general", "preview");
                        $(previewArea.getElement().$).html(
                            "<code>" + this.getValue() + "</code>");
                        $(previewArea.getElement().$).tex();
                    },
                    setup: function(code) {
                        if (code) {
                            this.setValue(code.getText());
                        }
                        this.updatePreview();
                    },
                    commit: function(code) {
                        code.setText(this.getValue());
                    },
                    onShow: function() {
                        this.updatePreview();
                    },
                    onKeyUp: function() {
                        this.updatePreview();
                    }
                },
                {
                    type: "html",
                    label: "Preview",
                    id: "preview",
                    html: ""
                }
            ]
        }],

        onShow: function() {
            this.codeNode = null;

            var codeNode = this.getSelectedElement();
            if (!codeNode) {
                var selection = this.getParentEditor().getSelection();
                codeNode = selection.getSelectedElement() ||
                    selection.getStartElement();
            }
            
            if (codeNode && codeNode.hasClass(pluginName)) {
                this.setupContent(codeNode);
                this.codeNode = codeNode;
            }
        },

        onOk: function() {
            var codeNode = this.codeNode || new CKEDITOR.dom.element("code");
            // This calls commit on the dialog elements so that they can 
            //  change the node as desired (only 'source' input in our case)
            this.commitContent(codeNode);

            // Add additional properties to the <code> to format it correctly
            codeNode.setAttributes({
                "class": pluginName
            });

            if (!this.codeNode) {
                editor.insertElement(codeNode);
            }
            
        }
    };
};

})();