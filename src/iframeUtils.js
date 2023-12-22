// iframeUtils.js

export function injectCSSIntoIframe(iframeId, cssRules) {
    const iframe = document.getElementById(iframeId);

    if (!iframe) {
        console.error(`Iframe with id '${iframeId}' not found.`);
        return;
    }

    iframe.addEventListener("load", () => {
        const iframeDocument =
            iframe.contentDocument || iframe.contentWindow.document;

        const styleElement = iframeDocument.createElement("style");
        styleElement.appendChild(iframeDocument.createTextNode(cssRules));

        iframeDocument.head.appendChild(styleElement);
    });
}
