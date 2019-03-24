/**
 * Markdown editor
 * @type {Element | null}
 */
let myEditor = new MediumEditor(".editor", {
    buttons: [
        "bold"
      , "italic"
      , "underline"
      , "anchor"
      , "header1"
      , "header2",
      , "quote"
    ]
});
