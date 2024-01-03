document.addEventListener("keydown", function (event) {
    const keyCode = event.key;

    // if (twaPopup.open && event.metaKey) {
    //     if (keyCode === "Enter") {
    //         event.preventDefault();
    //         submitClassesForm(event);
    //     } else if (keyCode === "ArrowLeft") {
    //         event.preventDefault();
    //         const prevBtn = twaRelativeElementButtons.find(
    //             (treb) =>
    //                 treb.getAttribute("data-relative") === "prev"
    //         );
    //         if (prevBtn) {
    //             const event = new Event("click");
    //             prevBtn.dispatchEvent(event);
    //         }
    //     } else if (keyCode === "ArrowUp") {
    //         event.preventDefault();
    //         const parentBtn = twaRelativeElementButtons.find(
    //             (treb) =>
    //                 treb.getAttribute("data-relative") === "parent"
    //         );
    //         if (parentBtn) {
    //             const event = new Event("click");
    //             parentBtn.dispatchEvent(event);
    //         }
    //     } else if (keyCode === "ArrowRight") {
    //         event.preventDefault();
    //         const nextBtn = twaRelativeElementButtons.find(
    //             (treb) =>
    //                 treb.getAttribute("data-relative") === "next"
    //         );
    //         if (nextBtn) {
    //             const event = new Event("click");
    //             nextBtn.dispatchEvent(event);
    //         }
    //     } else if (keyCode === "ArrowDown") {
    //         event.preventDefault();
    //         const childBtn = twaRelativeElementButtons.find(
    //             (treb) =>
    //                 treb.getAttribute("data-relative") === "child"
    //         );
    //         if (childBtn) {
    //             const event = new Event("click");
    //             childBtn.dispatchEvent(event);
    //         }
    //     }
    // }

    if (event.metaKey) {
        if (keyCode >= "1" && keyCode <= "9") {
            if (Array.from(twaBreakpointInputs)?.length) {
                event.preventDefault();
                const twaInput = twaBreakpointInputs[parseInt(keyCode) - 1];
                if (twaInput) {
                    const event = new Event("click");
                    twaInput.dispatchEvent(event);
                } else {
                    [
                        ...document.querySelectorAll(
                            '[data-type="breakpoint"]:focus'
                        ),
                    ].forEach((twaInput) => twaInput.blur());
                }
            }
        }
    }
});
