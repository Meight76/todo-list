import { Todo, TodoList } from "./todos.js";
import "./style/projectpage.css";
import { resetDiv, createDivInputs, cleanTags, createSelectOptions, createDialogColorOptions } from "./helpFunctions.js";
import { main } from "./index.js";

export default class project {
    static #allProjects = [];
    constructor(title, color, dueDate, description) {
        this.title = title;
        this.color = color;
        this.progress = 0;
        this.dueDate = dueDate;
        this.description = description;
        this.id = crypto.randomUUID();
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

    static removeProject(id) {
        return project.#allProjects.splice((project.#allProjects
            .filter(item => item.id === id))[0], 1);
    }
}

export function refreshProjects(node) {

    // a dialog to show in a more descriptive way our projects
    const showProjectDialog = document.createElement("dialog");
    showProjectDialog.setAttribute("id", "show-project-dialog");
    showProjectDialog.setAttribute("closedby", "any");
    showProjectDialog.classList.add("show-project-dialog");

    const showTitle = document.createElement("h1");
    const showProgress = document.createElement("h2");
    const showDate = document.createElement("p");
    const showDescription = document.createElement("p");
    showDescription.setAttribute("id", "show-project-dialog-description");
    const showTodosDiv = document.createElement("div");
    showTodosDiv.classList.add("todos-div");

    const showElements = [showTitle, showProgress, showDate, showDescription, showTodosDiv];

    const divRowProgAndDate = document.createElement("div");
    divRowProgAndDate.setAttribute("id", "progress-date-row");

    const dialogTodosAdd = document.createElement("dialog");
    dialogTodosAdd.setAttribute("id", "dialog-todo-add");
    dialogTodosAdd.setAttribute("closedby", "any");

    const titleInputDiv = document.createElement("div");
    titleInputDiv.setAttribute("id", "dialog-todo-title-input-div");
    const titleInput = createDivInputs("dialog-todo-title-input", "dialog-todo-title-input",
        ["dialog-todo-add-title"],
        {   required: "",
            maxlength: "30",
            type: "text",
            autofocus: "",
            placeholder: "go to the gym!"
        }
    );
    const titleInputLabel = document.createElement("label")
    titleInputLabel.textContent = "Title:"
    titleInputLabel.setAttribute("for", "dialog-todo-title-input");


    const descriptionAreaDiv = document.createElement("div");
    descriptionAreaDiv.setAttribute("id", "dialog-todo-description-area-div");
    const descriptionArea = document.createElement("textarea");
    descriptionArea.setAttribute("maxlength", "150");
    descriptionArea.setAttribute("id", "dialog-todo-description-area");
    const descriptionAreaLabel = document.createElement("label");
    descriptionAreaLabel.textContent = "description";
    descriptionAreaLabel.setAttribute("for", "dialog-todo-description-area");


    const dueDateDiv = document.createElement("div");
    dueDateDiv.setAttribute("id", "dialog-todo-due-date");
    const dueDateInput = createDivInputs("dialog-todo-date-input", "dialog-todo-date-input",
        ["date-input"],
        {   required: "",
            type: "date",
        }
    );
    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dialog-todo-date-input");
    dueDateLabel.textContent = "due date";

    const prioritySelectDiv = document.createElement("div");
    prioritySelectDiv.setAttribute("id", "dialog-todo-priority-div");
    const prioritySelectLabel = document.createElement("label");
    prioritySelectLabel.setAttribute("for", "priority-select");
    prioritySelectLabel.textContent = "priority level";
    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("id", "priority-select");
    prioritySelect.setAttribute("name", "priority-select");
    const priorityOptions = ["low", "medium", "high"];
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
    showTodosAddBtn.addEventListener("click", () => {
        dialogTodosAdd.showModal();
    });

    main.appendChild(dialogTodosAdd);

    divRowProgAndDate.appendChild(showProgress);
    divRowProgAndDate.appendChild(showDate);

    showProjectDialog.appendChild(showTitle);
    showProjectDialog.appendChild(divRowProgAndDate);
    showProjectDialog.appendChild(showDescription);
    showProjectDialog.appendChild(showTodosAddBtn);
    showProjectDialog.appendChild(showTodosDiv);

    main.appendChild(showProjectDialog);

        node.textContent = "";
        const arrayProjects = project.globalProjects;
        for (const projectItem of arrayProjects) {
            const projectButton = document.createElement("button");
            projectButton.style.backgroundColor = projectItem.color;
            projectButton.classList.add("project-item");
            projectButton.value = projectItem.id;
            const title = document.createElement("h2");
            title.textContent = projectItem.title

            const date = document.createElement("p");
            date.textContent = projectItem.dueDate.toDateString();

            const progress = document.createElement("h2");
            progress.classList.add("progress-info");
            progress.textContent = `current: ${projectItem.progress}%`;

            const headerInfo = document.createElement("div");
            headerInfo.classList.add("project-header-info");

            headerInfo.appendChild(title);
            headerInfo.appendChild(date);

            projectButton.appendChild(headerInfo);
            projectButton.appendChild(progress);

            projectButton.addEventListener("click", (e) => {
                const projectId = e.currentTarget.value;
                if (projectId === undefined) {
                    console.log("couldn't solve id");
                    return;
                }
                let thisProject = arrayProjects.filter(item => item.id === projectId);
                thisProject = thisProject[0];
                const thisProjectTodos = thisProject.todos;
                cleanTags(showElements);
                showTitle.textContent = thisProject.title;
                showProgress.textContent = `Progress: ${thisProject.progress}%`;
                showDate.textContent = thisProject.dueDate.toDateString();
                showDescription.textContent = thisProject.description;


                if (thisProjectTodos.getTodos().length !== 0) {
                    for (const todo of thisProjectTodos) {
                        const todoItem = document.createElement("div");
                        todoItem.classList.add("todo-item");

                        const todoTitle = document.createElement("h1");
                        todoTitle.textContent = todo.title;
                        const todoDate = document.createElement("p");
                        todoDate.textContent = todo.date;
                        const todoCheckButton = document.createElement("button");
                        todoCheckButton.textContent = todo.check;

                        showTodosDiv.appendChild(todoItem);
                    }
                } else {
                    const para = document.createElement("p");
                    para.textContent = "You don't currently have any todos!";
                    para.classList.add("para-is-empty");
                    showTodosDiv.appendChild(para);
                }
                showProjectDialog.style.backgroundColor = thisProject.color;
                showProjectDialog.showModal();
            });

            node.appendChild(projectButton);

        }
    }

export function projectPage() {
    resetDiv(main);

    const testProjectItem = new project("example", "#000000", new Date("2026-04-22"),"Just for have a base looking" );
    const allProject = project.globalProjects
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("id", "project-div");
    projectDiv.classList.add("project-div");

    const addDialog = document.createElement("dialog");
    addDialog.classList.add("add-dialog");
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
        {   required: "",
            type: "text",
            minlength: "5",
            maxlength: "30",
            placeholder: "study for the exam",
        });
    // titleInput.setAttribute("type", "text");
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
    descriptionArea.setAttribute("maxlength", "150");

    divDescriptionArea.appendChild(descriptionLabel);
    divDescriptionArea.appendChild(descriptionArea);

    const choseColorDiv = document.createElement("div");
    const choseColor = document.createElement("dialog");
    choseColorDiv.appendChild(choseColor);
    const choseColorLabel = document.createElement("label");

    choseColorDiv.setAttribute("id", "chose-color-div");
    choseColor.setAttribute("id", "color-pick");
    choseColor.setAttribute("closedby", "any");
    choseColorLabel.setAttribute("for", "color-pick-call");
    choseColorLabel.textContent = "pick a color";

    const color = ["#1c0705", "#ea8350", "#664d65", "#7f3320", "#39544b",
                   "#ac58e9", "#1c3935", "#670627", "#400e2f",
                ]

    const callChoseColor = document.createElement("button");
    callChoseColor.classList.add("call-chose-color");
    callChoseColor.setAttribute("id", "color-pick-call");
    callChoseColor.value = "#000000";
    callChoseColor.addEventListener("click", (e) => {
        e.preventDefault();
        choseColor.show();
    });
    choseColorDiv.appendChild(callChoseColor);
    choseColorDiv.appendChild(choseColorLabel);
    createDialogColorOptions(choseColor, color);


    const divDatePick = document.createElement("div");
    divDatePick.classList.add("add-dialog-div");

    const datePickInput = document.createElement("input");
    datePickInput.classList.add("date-input");
    datePickInput.setAttribute("type", "date");
    datePickInput.setAttribute("id", "date");
    datePickInput.setAttribute("name", "date");

    const datePickInputLabel = document.createElement("label");
    datePickInputLabel.setAttribute("for", "date");
    datePickInputLabel.textContent = "Due date:";

    divDatePick.appendChild(datePickInputLabel);
    divDatePick.appendChild(datePickInput);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Project";
    addButton.classList.add("add-btn");
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const title = titleInput.value;
        const color = callChoseColor.value;
        const date = new Date(datePickInput.value);
        const description = descriptionArea.value;
        new project(title, color, date, description);
        console.log(project.globalProjects);
        refreshProjects(projectDiv);
        addDialog.close();
    });

    const form = document.createElement("form");

    form.appendChild(divTitleInput);
    form.appendChild(choseColorDiv);
    form.appendChild(divDatePick);
    form.appendChild(divDescriptionArea);
    form.appendChild(addButton);

    addDialog.appendChild(addDialogDivHeader);
    addDialog.appendChild(form);
    main.appendChild(addDialog);

    // i have to put it down here, because otherwise its querySelector wouldn't be connected to dom
    const colorButtons = document.querySelectorAll(".color-pickup-btn");
    for (const colorPick of colorButtons) {
        colorPick.addEventListener("click", (e) => {
            const color = e.currentTarget.dataset.id;
            callChoseColor.style.backgroundColor = color;
            callChoseColor.value = color;
            choseColor.close();
        });
    }



    const addProjectBtnDiv = document.createElement("div");
    addProjectBtnDiv.classList.add("project-btn");

    const createProjectBtn = document.createElement("button");
    createProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title></title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>` + `<span>Add Project</span>`;
    createProjectBtn.classList.add("add-project-btn");
    createProjectBtn.addEventListener("click", (e) => {
        addDialog.showModal();
    });

    addProjectBtnDiv.appendChild(createProjectBtn);

    const removeProjectBtnDiv = document.createElement("div");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-project-btn");
    removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>minus-thick</title><path d="M20 14H4V10H20" /></svg> <span>Remove project</span>`
    let isRemoveBtnClicked = false;
    removeBtn.addEventListener("click", () => {
        if (!isRemoveBtnClicked) {
            isRemoveBtnClicked = true;
            const projects = document.querySelectorAll(".project-item");
            const showDialog = document.querySelector("#show-project-dialog");
            for (const projectItem of projects) {
                const removeBtn = document.createElement("button");
                removeBtn.textContent = "Remove";
                removeBtn.classList.add("remove-project-item-btn");
                removeBtn.value = project.value;
                removeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const id = e.currentTarget.value;
                    project.removeProject(id);
                    refreshProjects(projectDiv);
                });
                projectItem.append(removeBtn);
            }
        } else {
            refreshProjects(projectDiv);
            isRemoveBtnClicked = false;
        }
    });
    removeProjectBtnDiv.appendChild(removeBtn);

    main.appendChild(addProjectBtnDiv);
    main.appendChild(removeProjectBtnDiv);
    main.appendChild(projectDiv);
    refreshProjects(projectDiv);
        }

