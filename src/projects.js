import { Todo, TodoList } from "./todos.js";
import "./style/projectpage.css";
import { resetDiv, createDivInputs, cleanTags } from "./helpFunctions.js";
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
    const showTodosDiv = document.createElement("div");

    const showElements = [showTitle, showProgress, showDate, showDescription, showTodosDiv];

    const divRowProgAndDate = document.createElement("div");
    divRowProgAndDate.setAttribute("id", "progress-date-row");

    divRowProgAndDate.appendChild(showProgress);
    divRowProgAndDate.appendChild(showDate);

    showProjectDialog.appendChild(showTitle);
    showProjectDialog.appendChild(divRowProgAndDate);
    showProjectDialog.appendChild(showDescription);
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
                }
                showProjectDialog.style.backgroundColor = thisProject.color;
                showProjectDialog.showModal();
            });

            node.appendChild(projectButton);

        }
    }

export function projectPage() {
    resetDiv(main);

    const testProjectItem = new project("call sofia to go out with me", "#ff00f1", new Date("2026-04-22"),"send her and dm" );
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
        { required: "",});
    titleInput.setAttribute("type", "text");
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
    colorPickInput.setAttribute("value", "#ff0000");
    colorPickInput.classList.add("add-dialog-color-pick");
    const colorPickInputLabel = document.createElement("label");
    colorPickInputLabel.textContent = "Pick a color";
    colorPickInputLabel.setAttribute("for", "color");

    divColorPick.appendChild(colorPickInput);
    divColorPick.appendChild(colorPickInputLabel);

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
        const color = colorPickInput.value;
        const date = new Date(datePickInput.value);
        const description = descriptionArea.value;
        new project(title, color, date, description);
        console.log(project.globalProjects);
        refreshProjects(projectDiv);
        addDialog.close();
    });

    const form = document.createElement("form");

    form.appendChild(divTitleInput);
    form.appendChild(divColorPick);
    form.appendChild(divDatePick);
    form.appendChild(divDescriptionArea);
    form.appendChild(addButton);

    addDialog.appendChild(addDialogDivHeader);
    addDialog.appendChild(form);
    main.appendChild(addDialog);

    const divProjectBtn = document.createElement("div");
    divProjectBtn.classList.add("project-btn");

    const createProjectBtn = document.createElement("button");
    createProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title></title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>` + `<span>Add Project</span>`;
    createProjectBtn.classList.add("add-project-btn");
    createProjectBtn.addEventListener("click", (e) => {
        addDialog.showModal();
    });

    divProjectBtn.appendChild(createProjectBtn);

    const emptyDiv = document.createElement("div");

    main.appendChild(divProjectBtn);
    main.appendChild(emptyDiv);
    main.appendChild(projectDiv);
    refreshProjects(projectDiv);

}
