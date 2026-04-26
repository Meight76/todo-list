import "../style/projectpage.css";
import Project from "../models/projectModel.js";
import Global from "../storage/global.js";
import controller, { color, priorityOptions } from "../controller/projectController.js";
import Todo from "../models/todoModel.js";
import { main } from "../index.js";
import { createInput, createDialogColorOptions, createSelectOptions } from "../helpFunctions.js";

export let projectDiv;

export default function projectUi() {
    const createProjectBtn = document.createElement("button");
    createProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title></title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>` + `<span>Add Project</span>`;
    createProjectBtn.classList.add("add-project-btn");

    const removeProjectBtn = document.createElement("button");
    removeProjectBtn.classList.add("remove-project-btn");
    removeProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>minus-thick</title><path d="M20 14H4V10H20" /></svg> <span>Remove project</span>`

    projectDiv = document.createElement("div");
    projectDiv.setAttribute("id", "project-div");
    projectDiv.classList.add("project-div");

    main.appendChild(createProjectBtn);
    main.appendChild(removeProjectBtn);
    main.appendChild(projectDiv);

    const addDialog = document.createElement("dialog");
    addDialog.classList.add("add-dialog");
    addDialog.setAttribute("id", "add-dialog");
    addDialog.setAttribute("closedby", "any");

    const addDialogButtonClose = document.createElement("button");
    addDialogButtonClose.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`
    addDialogButtonClose.classList.add("add-dialog-close-btn");

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

    const titleInput = createInput("add-dialog-title", "add-dialog-title", ["add-dialog-title"],
        {   required: "",
            type: "text",
            minlength: "1",
            maxlength: "30",
            placeholder: "study for the exam",
        });

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "add-dialog-title");
    titleLabel.textContent = "title:";

    divTitleInput.appendChild(titleLabel);
    divTitleInput.appendChild(titleInput);

    const divDescriptionArea = document.createElement("div");
    divDescriptionArea.classList.add("add-dialog-div");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "description:";
    descriptionLabel.setAttribute("for", "add-dialog-description");

    const descriptionArea = document.createElement("textarea");
    descriptionArea.classList.add("add-dialog-description");
    descriptionArea.setAttribute("id", "add-dialog-description");
    descriptionArea.setAttribute("maxlength", "300");

    divDescriptionArea.appendChild(descriptionLabel);
    divDescriptionArea.appendChild(descriptionArea);

    const choseColorDiv = document.createElement("div");
    const choseColor = document.createElement("dialog");
    choseColorDiv.appendChild(choseColor);
    const choseColorLabel = document.createElement("label");

    choseColorDiv.setAttribute("id", "chose-color-div");
    choseColor.setAttribute("id", "color-pick");
    choseColor.setAttribute("closedby", "any");
    choseColor.setAttribute("for", "color-pick-call");
    choseColorLabel.textContent = "pick a color";
    choseColorLabel.setAttribute("for", "color-pick-call");

    const callChoseColor = document.createElement("button");
    callChoseColor.classList.add("call-chose-color");
    callChoseColor.setAttribute("id", "color-pick-call");
    callChoseColor.value = "#000000";
    callChoseColor.style.backgroundColor = callChoseColor.value;

    choseColorDiv.appendChild(callChoseColor);
    choseColorDiv.appendChild(choseColorLabel);
    createDialogColorOptions(choseColor, color);

    const divDatePick = document.createElement("div");
    divDatePick.classList.add("add-dialog-div");

    const datePickInput = createInput("add-dialog-date", "add-dialog-date", ["date-input"],
        {
            type: "date",
        });

    const datePickInputLabel = document.createElement("label");
    datePickInputLabel.setAttribute("for", "add-dialog-date");
    datePickInputLabel.textContent = "due date:";

    divDatePick.appendChild(datePickInputLabel);
    divDatePick.appendChild(datePickInput);

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Project";
    addBtn.classList.add("add-dialog-add-btn");

    const form = document.createElement("form");

    form.appendChild(divTitleInput);
    form.appendChild(choseColorDiv);
    form.appendChild(divDatePick);
    form.appendChild(divDescriptionArea);
    form.appendChild(addBtn);

    addDialog.appendChild(addDialogDivHeader);
    addDialog.appendChild(form);

    main.appendChild(addDialog);

    renderProjectDiv(projectDiv);
    controller();

}

export function renderProjectDiv(node) {
    const showProjectDialog = document.createElement("dialog");
    showProjectDialog.setAttribute("id", "show-project-dialog");
    showProjectDialog.setAttribute("closedby", "any");
    showProjectDialog.classList.add("show-project-dialog");

    const showTitle = document.createElement("h1");
    const showProgress = document.createElement("h2");
    const showDate = document.createElement("p");
    const showDescription = document.createElement("p");
    const showTodosDiv = document.createElement("div");

    showDescription.setAttribute("id", "show-project-dialog-description");
    showTodosDiv.classList.add("todos-div");

    const divProgressAndDate = document.createElement("div");
    divProgressAndDate.setAttribute("id", "progress-date");

    const dialogTodosAdd = document.createElement("dialog");
    dialogTodosAdd.setAttribute("id", "dialog-todo-add");
    dialogTodosAdd.setAttribute("closedby", "any");

    const titleInputDiv = document.createElement("div");
    titleInputDiv.setAttribute("id", "dialog-todo-title-input-div");
    const titleInput = createInput("dialog-todo-title-input", "dialog-todo-title-input", ["dialog-todo-add-title"],
        {
            required: "",
            maxlength: "30",
            type: "text",
            autofocus: "",
            placeholder: "buy milk"
        });
    const titleInputLabel = document.createElement("label");
    titleInputLabel.textContent = "title:";
    titleInputLabel.setAttribute("for", "dialog-todo-title-input");

    const descriptionAreaDiv = document.createElement("div");
    descriptionAreaDiv.setAttribute("id", "dialog-todo-description-area-div");

    const descriptionArea = document.createElement("textarea");
    descriptionArea.setAttribute("maxlength", "300");
    descriptionArea.setAttribute("id", "dialog-todo-description-area");

    const descriptionAreaLabel = document.createElement("label");
    descriptionAreaLabel.textContent = "description:";
    descriptionAreaLabel.setAttribute("for", "dialog-todo-description-area");

    const dueDateDiv = document.createElement("div");
    dueDateDiv.setAttribute("id", "dialog-todo-due-date");

    const dueDateInput = createInput("dialog-todo-date-input", "dialog-todo-date-input", ["date-input"],
        {
            required: "",
            type: "date",
        });

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dialog-todo-date-input");
    dueDateLabel.textContent = "due date:";

    const prioritySelectDiv = document.createElement("div");
    prioritySelectDiv.setAttribute("id", "dialog-todo-priority-div");

    const prioritySelectLabel = document.createElement("label");
    prioritySelectLabel.setAttribute("for", "priority-select");
    prioritySelectLabel.textContent = "priority level:";

    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("id", "priority-select");
    prioritySelect.setAttribute("name", "priority-select");
    createSelectOptions(prioritySelect, priorityOptions, "priority level");

    titleInputDiv.appendChild(titleInputLabel);
    titleInputDiv.appendChild(titleInput);
    descriptionAreaDiv.appendChild(descriptionAreaLabel);
    descriptionAreaDiv.appendChild(descriptionArea);
    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDateInput);
    prioritySelectDiv.appendChild(prioritySelectLabel);
    prioritySelectDiv.appendChild(prioritySelect);

    const addDialogHeader = document.createElement("h1");
    addDialogHeader.classList.add("todo-dialog-header");
    addDialogHeader.textContent = "Add todo";

    const addDialogBtn = document.createElement("button");
    addDialogBtn.classList.add("add-todo-btn");
    addDialogBtn.textContent = "Create todo";

    dialogTodosAdd.appendChild(addDialogHeader);
    dialogTodosAdd.appendChild(titleInputDiv);
    dialogTodosAdd.appendChild(dueDateDiv);
    dialogTodosAdd.appendChild(prioritySelectDiv);
    dialogTodosAdd.appendChild(descriptionAreaDiv);
    dialogTodosAdd.appendChild(addDialogBtn);

    const showTodosAddBtn = document.createElement("button");
    showTodosAddBtn.setAttribute("id", "todos-add-btn");
    showTodosAddBtn.classList.add("show-todos-btn");
    showTodosAddBtn.textContent = "Add todo";

    main.appendChild(dialogTodosAdd);

    divProgressAndDate.appendChild(showProgress);
    divProgressAndDate.appendChild(showDate);

    showProjectDialog.appendChild(showTitle);
    showProjectDialog.appendChild(divProgressAndDate);
    showProjectDialog.appendChild(showDescription);
    showProjectDialog.appendChild(showTodosAddBtn);
    showProjectDialog.appendChild(showTodosDiv);

    main.appendChild(showProjectDialog);
    updateProjects(projectDiv);

}

export function updateProjects(node) {
    node.textContent = "";
    const arrProjects = Global.allProjects;
    console.log(`arrProject: ${arrProjects}`);
    for (const project of arrProjects) {
        const projectBtn = document.createElement("button");
        projectBtn.style.backgroundColor = project.color;
        projectBtn.classList.add("project-item");
        projectBtn.dataset.id = project.id;

        const title = document.createElement("h2");
        title.textContent = project.title;

        const date = document.createElement("p");
        console.log("project:", project);
        date.textContent = project.date.toDateString();

        const progress = document.createElement("h2");
        progress.classList.add("progress-info");
        progress.textContent = `current: ${project.progress}`;

        const headerInfo = document.createElement("div");
        headerInfo.classList.add("project-header-info");

        headerInfo.appendChild(title);
        headerInfo.appendChild(date);

        projectBtn.appendChild(headerInfo);
        projectBtn.appendChild(progress);

        node.appendChild(projectBtn);
    }
}

function renderTodosDiv(arrTodo, node) {
    node.textContent = "";
    for (const todo of arrTodo) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const todoTitle = document.createElement("h1");
        todoTitle.textContent = todo.title;
        if (todo.title.length > 15) {
            todoTitle.style.fontSize = "1rem";
        }

        const todoDate = document.createElement("p");
        todoDate.textContent = todo.date.toDateString();

        const todoCheckButton = document.createElement("button");
        todoCheckButton.dataset.id = todo.id;

        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoDate);
        todoItem.appendChild(todoCheckButton);

        node.appendChild(todoItem);
    }
}
