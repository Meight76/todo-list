import { Todo, TodoList } from "./todos.js";
import { resetDiv, createDivInputs } from "./helpFunctions.js";
import { main } from "./index.js";

export default class project {
    static #allProjects = [];
    constructor(title, color, dueDate, description) {
        this._title = title;
        this._color = color;
        this._dueDate = dueDate;
        this._description = description;
        this._id = crypto.randomUUID();
        this.todos = new TodoList();
        project.#allProjects.push(this);
    }
    static set globalProjects(TodoObj) {
        if (!(TodoObj instanceof Todo)) {
            console.log(`ERROR: ${TodoObj} is not instanceof Todo`);
        } else {
            project.#allProjects.push(TodoObj);
        }
    } static get globalProjects() {
        return project.#allProjects.slice();
    }
}

export function projectPage() {
    resetDiv(main);
    const allProject = project.globalProjects

    const addDialog = document.createElement("dialog");
    addDialog.setAttribute("id", "add-dialog");
    addDialog.setAttribute("closedby", "any");

    const addDialogButtonClose = document.createElement("button");
    addDialogButtonClose.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`
    addDialogButtonClose.classList.add("add-dialog-close-btn");
    addDialogButtonClose.addEventListener("click", () => {
        addDialog.close();
    });

    const addDialogTitle = document.createElement("h1");
    addDialogTitle.classList.add("add-dialog-title");
    addDialogTitle.textContent = "Add Your Project";

    const addDialogDivHeader = document.createElement("div");
    addDialogDivHeader.classList.add("add-dialog-header");

    addDialogDivHeader.appendChild(addDialogTitle);
    addDialogDivHeader.appendChild(addDialogButtonClose);

    const addDialogDivInputs = document.createElement("div");
    addDialogDivInputs.classList.add("add-dialog-inputs");

    const divTitleInput = document.createElement("div");
    divTitleInput.classList.add("add-dialog-div");

    const titleInput = createDivInputs("title", "title", ["add-dialog-title"],
        { required: "",});
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "title:";
    divTitleInput.appendChild(titleLabel);
    divTitleInput.appendChild(titleInput);

    const divDescriptionArea = document.createElement("div");
    divDescriptionArea.classList.add("add-dialog-div");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "description:";
    descriptionLabel.setAttribute("for", "description");

    const descriptionArea = document.createElement("textarea");
    descriptionArea.classList.add("add-dialog-description");
    descriptionArea.setAttribute("id", "description");
    descriptionArea.setAttribute("max", "300");
    descriptionArea.setAttribute("min", "50");

    divDescriptionArea.appendChild(descriptionLabel);
    divDescriptionArea.appendChild(descriptionArea);

    const divColorPick = document.createElement("div");
    divColorPick.classList.add("add-dialog-div");

    const colorPickInput = document.createElement("input");
    colorPickInput.setAttribute("id", "color");
    colorPickInput.setAttribute("name", "color");
    colorPickInput.setAttribute("type", "color");
    colorPickInput.setAttribute("required", "");
    colorPickInput.classList.add("add-dialog-color-pick");
    const colorPickInputLabel = document.createElement("label");
    colorPickInputLabel.textContent = "Pick a color";
    colorPickInputLabel.setAttribute("for", "color");

    divColorPick.appendChild(colorPickInputLabel);
    divColorPick.appendChild(colorPickInput);

    const divDatePick = document.createElement("div");
    divDatePick.classList.add("add-dialog-div");

    const datePickInput = document.createElement("input");
    datePickInput.classList.add("date-input");
    datePickInput.setAttribute("type", "date");
    datePickInput.setAttribute("id", "date");
    datePickInput.setAttribute("name", "date");

    const datePickInputLabel = document.createElement("label");
    datePickInputLabel.textContent = "Due date";

    divDatePick.appendChild(datePickInputLabel);
    divDatePick.appendChild(datePickInput);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Project";
    addButton.classList.add("add-btn");

    const form = document.createElement("form");

    form.appendChild(divTitleInput);
    form.appendChild(divColorPick);
    form.appendChild(divDatePick);
    form.appendChild(divDescriptionArea);
    form.appendChild(addButton);

    addDialog.appendChild(addDialogDivHeader);
    addDialog.appendChild(form);
    main.appendChild(addDialog);

    const createProjectBtn = document.createElement("button");
    createProjectBtn.textContent = "Add project";
    createProjectBtn.classList.add("add-project-btn");
    createProjectBtn.addEventListener("click", (e) => {
        addDialog.showModal();
    });
    main.appendChild(createProjectBtn);
}
