export function createDiv(arrClass, id) {
    const div = document.createElement("div");
    for (const styleClass of arrClass) {
        div.classList.add(styleClass);
    }
    div.setAttribute("id", id);
    return div;
}
