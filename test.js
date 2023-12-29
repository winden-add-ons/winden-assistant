document.addEventListener("DOMContentLoaded", (event) => {
    let tailwindScreens = [
        {
            name: "mob",
            size: "640px",
        },
        {
            name: "tab",
            size: "768px",
        },
        {
            name: "desk",
            size: "1024px",
        },
    ];

    var additionalPrefixes = [
        "*:",
        "first-letter:",
        "first-line:",
        "marker:",
        "selection:",
        "before:",
        "after:",
        "first:",
        "last:",
        "only:",
        "odd:",
        "even:",
        "visited:",
        "target:",
        "empty:",
        "hover:",
        "focus:",
        "active:",
        "group-[]:",
        "group-odd:",
        "group-even:",
        "group-target:",
        "group-open:",
        "group-default:",
    ];

    var prefixesFromScreens = tailwindScreens.map(
        (screen) => screen.name + ":"
    );

    var prefixes = prefixesFromScreens.concat(additionalPrefixes);
    window.prefixes = prefixes;
    console.log(prefixes);
});
