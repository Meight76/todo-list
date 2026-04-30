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

    const saveProjectBtn = document.createElement("button");
    saveProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg> <span>Save</span>`;
    saveProjectBtn.classList.add("save-project-btn");

    projectDiv = document.createElement("div");
    projectDiv.setAttribute("id", "project-div");
    projectDiv.classList.add("project-div");

    const buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("id", "btn-div");
    buttonsDiv.appendChild(createProjectBtn);
    buttonsDiv.appendChild(saveProjectBtn);
    buttonsDiv.appendChild(removeProjectBtn);

    main.appendChild(buttonsDiv);
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
    createDialogColorOptions(choseColor, color, "color-pickup-btn");

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
    updateProjects(projectDiv);
    controller();
}

export function renderProjectDiv(node) {
    const showProjectDialog = document.createElement("dialog");
    showProjectDialog.setAttribute("id", "show-project-dialog");
    showProjectDialog.setAttribute("closedby", "any");
    showProjectDialog.classList.add("show-project-dialog");

    const modeInfo = document.createElement("h1");
    modeInfo.classList.add("show-dialog-mode");
    modeInfo.textContent = "visualize";
    modeInfo.setAttribute("id", "show-dialog-change-mode-info");

    const buttonChangeMode = document.createElement("button");
    buttonChangeMode.dataset.id = "view";
    buttonChangeMode.classList.add("change-mode-btn");
    buttonChangeMode.textContent = "edit mode";
    buttonChangeMode.setAttribute("id", "show-dialog-change-mode-btn");

    const showCloseBtn = document.createElement("button");
    showCloseBtn.classList.add("show-dialog-close-btn");
    showCloseBtn.setAttribute("id", "show-dialog-close-btn");
    showCloseBtn.textContent = "Stop";

    const showBtnsDiv = document.createElement("div");
    showBtnsDiv.setAttribute("id", "show-dialog-btns-div");
    showBtnsDiv.appendChild(buttonChangeMode);
    showBtnsDiv.appendChild(showCloseBtn);

    const divHeader = document.createElement("div");
    divHeader.setAttribute("id", "show-dialog-header");
    divHeader.appendChild(modeInfo);
    divHeader.appendChild(showBtnsDiv);

    const showTitle = document.createElement("input");
    showTitle.setAttribute("id", "show-dialog-title");
    showTitle.setAttribute("type", "text");
    showTitle.setAttribute("maxlength", "30");

    const choseColorDiv = document.createElement("div");
    const choseColor = document.createElement("dialog");
    choseColorDiv.appendChild(choseColor);
    const choseColorLabel = document.createElement("label");

    choseColorDiv.setAttribute("id", "show-chose-color-div");
    choseColor.setAttribute("id", "show-color-pick");
    choseColor.setAttribute("closedby", "any");
    choseColor.setAttribute("for", "show-color-pick");
    choseColorLabel.textContent = "pick a color";
    choseColorLabel.setAttribute("for", "show-color-pick-call");

    const callChoseColor = document.createElement("button");
    callChoseColor.classList.add("call-chose-color");
    callChoseColor.setAttribute("id", "show-color-pick-call");
    callChoseColor.value = "#000000";
    callChoseColor.style.backgroundColor = callChoseColor.value;

    choseColorDiv.appendChild(callChoseColor);
    choseColorDiv.appendChild(choseColorLabel);
    createDialogColorOptions(choseColor, color, "show-pick-color-btn");

    const showProgressNumber = document.createElement("span");
    showProgressNumber.setAttribute("id", "progress-number");

    const showProgress = document.createElement("h2");
    showProgress.textContent = "progress: ";
    showProgress.setAttribute("id", "show-dialog-progress");
    showProgress.appendChild(showProgressNumber);


    const showDate = document.createElement("input");
    showDate.setAttribute("id", "show-dialog-date");
    showDate.setAttribute("type", "date");

    const showDescription = document.createElement("textarea");
    showDescription.setAttribute("id", "show-dialog-description");
    showDescription.setAttribute("maxlength", "300");

    const showTodosDiv = document.createElement("div");
    showTodosDiv.classList.add("todos-div");
    showTodosDiv.setAttribute("id", "show-todos-div");

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

    const addDialogCloseBtn = document.createElement("button");
    addDialogCloseBtn.classList.add("todo-dialog-close-btn");
    addDialogCloseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`
    addDialogCloseBtn.setAttribute("id", "todo-dialog-close-btn");

    const addDialogHeader = document.createElement("h1");
    addDialogHeader.classList.add("todo-dialog-header");
    addDialogHeader.textContent = "Add todo";
    addDialogHeader.appendChild(addDialogCloseBtn);


    const addDialogBtn = document.createElement("button");
    addDialogBtn.classList.add("add-todo-btn");
    addDialogBtn.setAttribute("id", "add-todo-btn");
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

    const showTodosEditBtn = document.createElement("button");
    showTodosEditBtn.setAttribute("id", "todos-edit-btn");
    showTodosEditBtn.classList.add("todos-edit-btn");
    showTodosEditBtn.textContent = "Edit todo";

    const showTodosRemoveBtn = document.createElement("button");
    showTodosRemoveBtn.setAttribute("id", "todos-remove-btn");
    showTodosRemoveBtn.classList.add("todos-remove-btn");
    showTodosRemoveBtn.textContent = "remove todo";

    const showTodosBtnsDiv = document.createElement("div");
    showTodosBtnsDiv.setAttribute("id", "show-todos-btns");
    showTodosBtnsDiv.appendChild(showTodosAddBtn);
    showTodosBtnsDiv.appendChild(showTodosEditBtn);
    showTodosBtnsDiv.appendChild(showTodosRemoveBtn);

    main.appendChild(dialogTodosAdd);

    divProgressAndDate.appendChild(showProgress);
    divProgressAndDate.appendChild(showDate);

    showProjectDialog.appendChild(divHeader);
    showProjectDialog.appendChild(showTitle);
    showProjectDialog.appendChild(choseColorDiv);
    showProjectDialog.appendChild(divProgressAndDate);
    showProjectDialog.appendChild(showDescription);
    showProjectDialog.appendChild(showTodosBtnsDiv);
    showProjectDialog.appendChild(showTodosDiv);

    const showProjectEditTodoDialog = document.createElement("dialog");
    showProjectEditTodoDialog.setAttribute("id", "todo-edit-dialog");
    showProjectEditTodoDialog.setAttribute("closedby", "any");
    showProjectEditTodoDialog.classList.add("todo-edit-dialog");

    const editTodoDialogHeaderDiv = document.createElement("div");
    editTodoDialogHeaderDiv.setAttribute("id", "edit-todo-header-div");
    editTodoDialogHeaderDiv.classList.add("edit-todo-header-div");

    const editTodoHeader = document.createElement("h1");
    editTodoHeader.textContent = "View todo";
    editTodoHeader.classList.add("edit-todo-header");
    editTodoHeader.setAttribute("id", "edit-todo-h1");

    const editTodoDialogCloseBtn = document.createElement("button");
    editTodoDialogCloseBtn.textContent = "stop";
    editTodoDialogCloseBtn.classList.add("edit-todo-close-btn");
    editTodoDialogCloseBtn.setAttribute("id", "edit-todo-close-btn");

    const editTodoDialogChangeMode = document.createElement("button");
    editTodoDialogChangeMode.textContent = "edit mode";
    editTodoDialogChangeMode.classList.add("edit-todo-change-btn");
    editTodoDialogChangeMode.setAttribute("id", "edit-todo-change-btn");

    editTodoDialogHeaderDiv.appendChild(editTodoHeader);
    editTodoDialogHeaderDiv.appendChild(editTodoDialogCloseBtn);
    editTodoDialogHeaderDiv.appendChild(editTodoDialogChangeMode);

    const editTodoTitleInput = createInput("edit-todo-title", "edit-todo-title", ["edit-todo-title"],
        {
            type: "text",
            maxlength: "30",
        }
    );

    const editTodoDescriptionArea = document.createElement("textarea");
    editTodoDescriptionArea.setAttribute("id", "edit-todo-description");
    editTodoDescriptionArea.setAttribute("maxlength", "300");

    const editTodoDateInput = createInput("edit-todo-date", "edit-todo-date", ["edit-todo-date"],
        {
            type: "date",
        }
    );

    showProjectEditTodoDialog.appendChild(editTodoDialogHeaderDiv);
    showProjectEditTodoDialog.appendChild(editTodoTitleInput);
    showProjectEditTodoDialog.appendChild(editTodoDateInput);
    showProjectEditTodoDialog.appendChild(editTodoDescriptionArea);


    main.appendChild(showProjectDialog);
    main.appendChild(showProjectEditTodoDialog);
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
        progress.textContent = `current: ${Math.floor(project.progress)}%`;

        const headerInfo = document.createElement("div");
        headerInfo.classList.add("project-header-info");

        headerInfo.appendChild(title);
        headerInfo.appendChild(date);

        projectBtn.appendChild(headerInfo);
        projectBtn.appendChild(progress);

        node.appendChild(projectBtn);
    }
}

export function renderTodosDiv(arrTodo, node) {
    node.textContent = "";
    if (arrTodo.length === 0) {
        const para = document.createElement("p");
        para.textContent = "You don't currently has any todo!";
        para.classList.add("para-is-empty");
        node.appendChild(para);
        return;
    }
    for (const todo of arrTodo) {
        const todoItem = document.createElement("button");
        todoItem.dataset.id = todo.id;
        todoItem.classList.add("todo-item");

        const todoTitle = document.createElement("h1");
        todoTitle.textContent = todo.title;
        if (todo.title.length > 15) {
            todoTitle.style.fontSize = "1rem";
        }

        const todoDate = document.createElement("p");
        todoDate.textContent = todo.dueDate.toDateString();

        const todoCheckButton = document.createElement("button");
        todoCheckButton.classList.add("todo-check-btn");
        todoCheckButton.dataset.id = todo.id;

        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoDate);
        todoItem.appendChild(todoCheckButton);
        updateTodoCheck(todo, todoCheckButton);

        node.appendChild(todoItem);
    }
}

export function updateTodoCheck(todoObj, btn) {
    if (todoObj.check) {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>`;
        console.log("checked");
        btn.classList.add("is-checked");
        console.log(btn);
    } else {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exclamation</title><path d="M 11,4L 13,4L 13,15L 11,15L 11,4 Z M 13,18L 13,20L 11,20L 11,18L 13,18 Z" /></svg>`;
        console.log("unchecked");
        console.log(btn);
        btn.classList.remove("is-checked");
    }
    console.log(todoObj.check);
}

