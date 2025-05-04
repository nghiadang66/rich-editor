(function initEditor() {
    const container = document.getElementById("editor-container");
  
    // Create toolbar
    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";
  
    const buttons = [
        { cmd: "bold", label: "B" },
        { cmd: "italic", label: "I" },
        { cmd: "underline", label: "U" },
        { cmd: "h1", label: "H1" },
    ];
  
    buttons.forEach(({ cmd, label }) => {
        const btn = document.createElement("button");
        btn.innerHTML = label;
        btn.addEventListener("click", () => formatText(cmd));
        toolbar.appendChild(btn);
    });
  
    // Create editor
    const editor = document.createElement("div");
    editor.className = "editor";
    editor.contentEditable = "true";

    // Create preview
    const preview = document.createElement("pre");
    preview.className = "preview";
    preview.style.marginTop = "1rem";
    preview.style.background = "#fafafa";
    preview.style.padding = "1rem";
    preview.style.border = "1px solid #ccc";
    preview.style.borderRadius = "5px";
    preview.style.whiteSpace = "pre-wrap";

    // Update preview on input
    editor.addEventListener("input", () => {
        preview.textContent = editor.innerHTML;
    });
  
    // Append to DOM
    container.appendChild(toolbar);
    container.appendChild(editor);
    container.appendChild(preview);
  
    // Format logic
    function formatText(cmd) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        if (!selectedText) return;
    
        let tag;
        if (cmd === "bold") tag = "strong";
        if (cmd === "italic") tag = "em";
        if (cmd === "underline") tag = "u";
        if (cmd === "h1") tag = "h1";
    
        // Wrap
        const wrapper = document.createElement(tag);
        wrapper.appendChild(range.extractContents());
        range.insertNode(wrapper);
    
        // Reselect
        const newRange = document.createRange();
        newRange.selectNodeContents(wrapper);
        selection.removeAllRanges();
        selection.addRange(newRange);

        // Update preview
        preview.textContent = editor.innerHTML;
    }
})();
  