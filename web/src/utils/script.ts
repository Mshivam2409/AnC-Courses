const insertScript = (src: string, id: string, parentElement: HTMLElement) => {
    const script = window.document.createElement("script");
    script.async = true;
    script.src = src;
    script.id = id;
    parentElement.appendChild(script);
    return script;
};
// Helper to remove scripts from our page
const removeScript = (id: string, parentElement: HTMLElement) => {
    const script = window.document.getElementById(id);
    if (script) {
        parentElement.removeChild(script);
    }
};

export { insertScript, removeScript }