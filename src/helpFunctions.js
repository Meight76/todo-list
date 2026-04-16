export function createTag(tag, textInside, styleClass, node) {
    const element = document.createElement(tag);
    element.textContent = textInside;
    element.classList.add(styleClass);
    node.appendChild(element);
    return element;
}

export function resetDiv(div) {
    div.removeAttribute("style");
    div.textContent = "";
}
