/*
 * This plugin embeds a drawing in the page.
 */

(function() {

// The name of the plugin
var pluginName = "drawing";

// The name of the button and dialog
var buttonName = "Drawing";

// The button label
var buttonLabel = "Add Drawing";

// The default width and height
var defaultWidth = 865;
var defaultHeight = 510;

// Where the drawing editor should be loaded from
var frameURL = "/computer-programming/method_draw";

CKEDITOR.plugins.add(pluginName, {
    requires: "dialog,iframedialog",
    icons: pluginName,

    init: function(editor) {
        // Add a command that when executed opens up the drawing dialog
        editor.addCommand(
            pluginName,
            new CKEDITOR.dialogCommand(pluginName, {
                allowedContent: "img"
            })
        );

        // Add a toolbar button (named 'Drawing') that executes the plugin
        editor.ui.addButton(buttonName, {
            label: buttonLabel,
            command: pluginName
        });

        var isSVGImage = function(img) {
            var src = img.$.getAttribute("src");
            return !!(src && src.indexOf("data:image/svg+xml") === 0);
        };

        // Make it so that when you double-click on the SVG image that it
        // opens up a dialog so that you can edit it
        editor.on("doubleclick", function(evt) {
            if (isSVGImage(evt.data.element)) {
                evt.data.dialog = pluginName;
            }
        });

        // Initialize the dialog
        CKEDITOR.dialog.addIframe(pluginName, buttonName, frameURL,
            defaultWidth, defaultHeight, getLoadHandler(editor));
    }
});

var getLoadHandler = function(editor) {
    return function() {
        var self = this;
        var dialog = this.getDialog();
        var dialogElem = dialog.getElement();
        var dataPrefix = "data:image/svg+xml;utf8,";

        // Add some CSS to the dialog to style it
        var body = dialogElem.$
            .getElementsByClassName("cke_dialog_contents_body")[0];
        body.style.margin = 0;
        body.style.padding = 0;
        body.style.overflow = "hidden";

        var vbox = dialogElem.$
            .getElementsByClassName("cke_dialog_ui_vbox_child")[0];
        vbox.style.padding = 0;

        // Get the frame window
        var win = this.getElement().$.contentWindow;

        // If we're in dev mode show the hidden file menu
        if (typeof KAdefine !== "undefined") {
            var KA = KAdefine.require("./javascript/shared-package/ka.js");
            var curUser = KA.getUserProfile();
            var devMode = (curUser.get("isCreator") ||
                curUser.get("isDeveloper"));

            if (devMode) {
                win.document.getElementById("file-menu")
                    .style.display = "inline-block";
            }
        }

        // Load the data from the base64-encoded SVG in the image
        var img = dialog.getSelectedElement();

        if (img) {
            var data = img.getAttribute("src").replace(dataPrefix, "");
            data = decodeURIComponent(data);

            win.methodDraw.canvas.setSvgString(data);
        }

        var handleOk = function() {
            // Create a new image to replace the old one
            var img = new CKEDITOR.dom.element("img");

            // Get the SVG data and put it in to the image
            var win = self.getElement().$.contentWindow;
            var data = dataPrefix + encodeURIComponent(
                win.methodDraw.canvas.getSvgString());
            img.setAttribute("src", data);

            // Replace the existing image, if it exists
            var curImg = dialog.getSelectedElement();

            if (curImg) {
                img.replace(curImg);

            } else {
                // Otherwise insert a new one
                editor.insertElement(img);
            }
        };

        // Handle saving the contents
        dialog.on("ok", handleOk);

        // Remove listeners
        dialog.on("hide", function(e) {
            dialog.removeListener("ok", handleOk);
            e.removeListener();
        });
    };
};

})();
