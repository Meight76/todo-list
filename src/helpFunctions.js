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

export function shuffle(array) {
    // generate an i index that goes from the last index until first
    for (let i = array.length - 1; i > 0; i--) {
        // generate an random j index in range of i to swap
        let j = Math.floor(Math.random() * (i + 1));
        // desconstructing method to swap indexes, this one is pretty much useful
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function createDivInputs(id, name, classList, attributesObj) {
    const input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("name", name);
    for (const styleClass of classList) {
        input.classList.add(styleClass);
    }
    for (const attributeKey in attributesObj) {
        const attributeKeyString = String(attributeKey);
        input.setAttribute(attributeKeyString, attributesObj[attributeKey]);
    }
    return input;
}
