/*
 * This plugin embeds an SVG drawing in the page.
 * Uses the Method Draw library to do all the editing.
 */

(function() {

// Stub used for translation of the inline strings
// This is the format used on KA.org
var $ = {
    _: function(msg) {
        return msg;
    }
};

// The name of the plugin
var pluginName = "drawing";

// The name of the button and dialog
var buttonName = $._("Drawing");

// The button label
var buttonLabel = $._("Add Drawing");

// The label to show on hover over the drawing
var hoverLabel = $._("Click to edit");

// IE requires two clicks to edit (this seems to be a limitation of
// the contenteditable environment)
if (CKEDITOR.env.ie) {
    hoverLabel = $._("Double-click to edit");
}

// The default width and height of the dialog window
var defaultWidth = 865;
var defaultHeight = 510;

// Where the drawing editor should be loaded from
var frameURL = "/computer-programming/method_draw";

// The prefix for the inline SVG data
var dataPrefix = "data:image/svg+xml;charset=utf-8,";

// A regex for matching the prefix
var prefixRegex = /^data:image\/svg\+xml;.*?,/i;

// Types of content permitted by this plugin
var allowedContent = "img,iframe[!src,!width,!height]";

// Currently we need to use a frame to display the SVG for Safari
// due to this bug: https://bugs.webkit.org/show_bug.cgi?id=99677
// Once it's fixed and live we can remove all of this logic and
// just use <img> elements instead.
var useFrame = CKEDITOR.env.safari;

// The class name given to the overlay positioned over the embed
var overlayClass = "svg-overlay";

// Used for keeping track of which embed element is selected
var selectedEmbed;

// Create an SVG embed from the given SVG src, width, and height.
var createEmbed = function(src, width, height) {
    // If the browser is busted and can't render <img> SVGs properly
    // then we use an <iframe> instead (less desirable, but functional)
    if (useFrame) {
        var fakeEmbed = new CKEDITOR.dom.element("iframe");

        fakeEmbed.setAttributes({
            "src": src,
            "width": width,
            "height": height
        });

        return fakeEmbed;
    }

    // Create the <img> element for all other browsers
    var img = new CKEDITOR.dom.element("img");

    img.setAttributes({
        "src": src,
        "width": width,
        "height": height
    });

    return img;
};

// Detect if a given element is an overlay, or not
var isOverlay = function(elem) {
    if (elem.getAttribute) {
        return elem.getAttribute("class") === overlayClass;
    } else if (elem.attributes && elem.attributes["class"] === overlayClass) {
        return true;
    }

    return false;
};

// Detect if a given element is an SVG embed
// (works for both <iframe> and <img>)
var isSVG = function(elem) {
    if (elem.getAttribute && elem.getAttribute("src")) {
        return prefixRegex.test(elem.getAttribute("src"));
    } else if (elem.attributes && elem.attributes.src) {
        return prefixRegex.test(elem.attributes.src);
    }

    return false;
};

CKEDITOR.plugins.add(pluginName, {
    requires: "dialog,iframedialog,htmlwriter",
    icons: pluginName,
    allowed: allowedContent,

    init: function(editor) {
        // Add a command that when executed opens up the drawing dialog
        editor.addCommand(pluginName,
            new CKEDITOR.dialogCommand(pluginName));

        // Add a toolbar button (named 'Drawing') that executes the plugin
        editor.ui.addButton(buttonName, {
            label: buttonLabel,
            command: pluginName
        });

        // Wait for when the content area is ready before binding some
        // event listeners to it
        editor.on("contentDom", function() {
            var overlay;
            var editable = editor.editable();
            var editDocument = editable.$.ownerDocument;

            // Remove an overlay, if it's currently open
            var removeOverlay = function() {
                if (overlay) {
                    overlay.parentNode.removeChild(overlay);
                    overlay = null;
                }
            };

            // Open the dialog to edit the SVG embed
            var openDialog = function(elem) {
                // We turn the DOM node into a CKEDITOR DOM node as that's
                // what the dialog is expecting
                selectedEmbed = new CKEDITOR.dom.element(elem);

                // Open the dialog by executing the plugin command which then
                // triggers the opening of the dialog.
                editor.execCommand(pluginName);
            };

            // Watch for when the user mouses over an SVG embed so
            // we can then show an overlay
            editable.on("mouseover", function(evt) {
                var curElement = evt.data.$.target;

                // If an overlay is already open and we're mousing-over
                // some other element we should hide the old overlay
                if (overlay && curElement !== overlay) {
                    removeOverlay();
                }

                // Stop if we already have an overlay open
                if (overlay) {
                    return;
                }

                // Only show an overlay if we're over an SVG embed
                if (isSVG(curElement)) {
                    // Create an overlay to show over the SVG embed.
                    // This serves two purposes:
                    // 1) To make it so that you can actually click the
                    //    <iframe> embed, should it be used.
                    // 2) To show a helpful "Click to edit" overlay on
                    //    the embed to help inform the user.
                    //
                    // Note that we use the normal DOM here, not CKEDITOR's
                    // DOM. This is so that CKEDITOR doesn't consume the
                    // overlay and try to turn it in to HTML (which would
                    // be silly as it's just a UI element).
                    overlay = editDocument.createElement("div");

                    // Set a class and ensure that the user can't edit the
                    // overlay (which would be confusing).
                    overlay.className = overlayClass;
                    overlay.setAttribute("contenteditable", "false");
                    // Position the overlay to be the same size and position as
                    // the SVG embed itself
                    overlay.style.width = curElement.offsetWidth + "px";
                    overlay.style.height = curElement.offsetHeight + "px";
                    overlay.style.top = curElement.offsetTop;
                    overlay.style.left = curElement.offsetLeft;

                    // When the overlay is clicked we oen up the edit dialog
                    overlay.addEventListener("click", function() {
                        openDialog(curElement);
                    }, false);

                    // Track for when the user moves their mouse outside of
                    // the overlay so that we can remove it.
                    overlay.addEventListener("mouseout",
                        removeOverlay, false);

                    // Insert the overlay directly in to the DOM, just before
                    // the SVG embed
                    curElement.parentNode.insertBefore(overlay,
                        curElement);
                }
            });

            // Fall back in case the overlay doesn't show or if the user
            // can't trigger the mouseover (e.g. on a tablet)
            editable.on("click", function(evt) {
                var target = evt.data.$.target;

                // If the target is an SVG embed then we show the
                // edit dialog
                if (isSVG(target)) {
                    openDialog(target);
                }
            });
        });

        // Add a version to the frame URL to avoid caching across deploys
        if (typeof KAdefine !== "undefined") {
            var KA = KAdefine.require("./javascript/shared-package/ka.js");
            if (!KA.IS_DEV_SERVER) {
                frameURL += "?v=" + KA.version;
            }
        }

        // Initialize the dialog
        CKEDITOR.dialog.addIframe(pluginName, buttonName, frameURL,
            defaultWidth, defaultHeight, getLoadHandler(editor));
    },

    afterInit: function(editor) {
        // We don't need to do any filtering of the data if we're
        // not using the iframe replacement hack
        if (!useFrame) {
            return;
        }

        // Add a data filter rule for processing the HTML string that comes
        // from two places:
        //   1) On initial load when the data contents are explicitly set.
        //   2) After editing the source and then going back to WYSIWYG mode.
        // We thus need to convert the <img> into an <iframe> so that the
        // busted browsers can see the results properly.
        editor.dataProcessor.dataFilter.addRules({
            elements: {
                // Look for SVG embed <img> elements
                img: function(elem) {
                    if (isSVG(elem)) {
                        // Grab the width and height from the styles
                        var width = parseFloat(elem.styles.width);
                        var height = parseFloat(elem.styles.height);

                        // Create a new <iframe> to replace the <img> so that
                        // it will properly render in the results
                        return new CKEDITOR.htmlParser.element("iframe", {
                            "src": elem.attributes.src,
                            "width": width,
                            "height": height
                        });
                    }
                }
            }
        });

        // Add a new HTML filter rule for processing the nodes in the WYSIWYG
        // when the get turned into HTML strings. This happens in two places:
        //   1) When getting the HTML source from CKEDITOR.
        //   2) When editing the HTML source inside CKEDITOR.
        // We want this to happen as the source data should always be saved
        // as an <img> element.
        editor.dataProcessor.htmlFilter.addRules({
            elements: {
                // Look for SVG embed <iframe> elements
                iframe: function(elem) {
                    if (isSVG(elem)) {
                        // Create a new <img> to replace the <iframe>
                        // (since we want to save it as an <img> in the source)
                        return new CKEDITOR.htmlParser.element("img", {
                            "src": elem.attributes.src,
                            "width": elem.attributes.width,
                            "height": elem.attributes.height
                        });
                    }
                }
            }
        });
    },

    onLoad: function() {
        // Basic styling for the overlay
        CKEDITOR.addCss("." + overlayClass + " {" +
            "display: block;" +
            "position: absolute;" +
        "}" +

        // Add a helpful label when the overlay is hovered over
        "." + overlayClass + ":hover::after {" +
            "background: orange;" +
            "color: #000;" +
            "content: '" + hoverLabel + "';" +
            "font-size: 12px;" +
            "padding: 4px;" +
            "position: absolute;" +
            "right: 0;" +
            "top: 0;" +
        "}" +

        // Make sure the iframes don't have tacky borders
        "iframe[src^='data:image/svg+xml'] {" +
            "border: none;" +
        "}");
    },
});

var getLoadHandler = function(editor) {
    return function() {
        var self = this;
        var dialog = this.getDialog();
        var dialogElem = dialog.getElement();

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

        // Get the selected SVG embed (could be <iframe> or <img>)
        var activeEmbed = selectedEmbed;
        selectedEmbed = null;

        // Load the data from the base64-encoded SVG in the embed
        if (activeEmbed) {
            // Support both <iframe> and <img> elements
            var data = activeEmbed.getAttribute("src")
                .replace(prefixRegex, "");
            data = decodeURIComponent(data);

            // Inject the data into the Method Draw environment
            win.methodDraw.canvas.setSvgString(data);
        }

        var handleOk = function() {
            // Get the SVG data and put it in to the image
            var win = self.getElement().$.contentWindow;
            var data = dataPrefix + encodeURIComponent(
                win.methodDraw.canvas.getSvgString());
            var width = win.methodDraw.canvas.contentW;
            var height = win.methodDraw.canvas.contentH;

            // Create the SVG embed (could be <iframe> or <img>, depending
            // upon the browser environment)
            var embed = createEmbed(data, width, height);

            // Replace the existing <iframe> or <img>, if it exists
            if (activeEmbed) {
                embed.replace(activeEmbed);

            } else {
                // Otherwise insert a new one
                editor.insertElement(embed);
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
