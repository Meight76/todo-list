import Project from "../models/projectModel.js";
import Global from "../storage/global.js";
import WebStorage from "../storage/storage.js";
import  Todo  from "../models/todoModel.js";
import { renderProjectDiv, projectDiv, updateProjects, renderTodosDiv, updateTodoCheck } from "../ui/projectUi.js";

export const color = ["#1c0705", "#ea8350", "#664d65", "#7f3320", "#39544b",
                   "#ac58e9", "#1c3935", "#670627", "#400e2f",
                ];
export const priorityOptions = ["low", "medium", "high"];


export default function contollerProjectUi() {
    const createProjectBtn = document.querySelector(".add-project-btn");
    const addProjectDialog = document.querySelector("#add-dialog");
    const addDialogButtonClose = document.querySelector(".add-dialog-close-btn");
    const addDialogTitleInput = document.querySelector("#add-dialog-title");
    const addDialogDescriptionArea = document.querySelector(".add-dialog-description");
    const addDialogCallColorBtn = document.querySelector("#color-pick-call");
    const addDialogColorDialog = document.querySelector("#color-pick");
    const addDialogColorBtns = document.querySelectorAll(".color-pickup-btn");
    const addDialogDateInput = document.querySelector("#add-dialog-date");
    const addDialogAddBtn = document.querySelector(".add-dialog-add-btn");
    const removeProjectBtn = document.querySelector(".remove-project-btn");
    const saveProjectBtn = document.querySelector(".save-project-btn");
    let allProjectItems = getProjectItem();
    const showProjectDialog = document.querySelector("#show-project-dialog");
    const showProjectTitle = document.querySelector("#show-dialog-title");
    const showProjectProgress = document.querySelector("#show-dialog-progress");
    const showProjectProgressNumber = document.querySelector("#progress-number");
    const showProjectDate = document.querySelector("#show-dialog-date");
    const showProjectDescription = document.querySelector("#show-dialog-description");
    const showProjectModeInfo = document.querySelector("#show-dialog-change-mode-info");
    const showProjectBtnChange = document.querySelector("#show-dialog-change-mode-btn");
    const showProjectCloseBtn = document.querySelector("#show-dialog-close-btn");
    const showProjectColorCall = document.querySelector("#show-color-pick-call");
    const showProjectColorDialog = document.querySelector("#show-color-pick");
    const showProjectColorPickBtn = document.querySelectorAll(".show-pick-color-btn");
    const showProjectTodoDiv = document.querySelector("#show-todos-div");
    const todoDialog = document.querySelector("#dialog-todo-add");
    const todoDialogCall = document.querySelector("#todos-add-btn");
    const todoDialogCloseBtn = document.querySelector("#todo-dialog-close-btn");
    const todoDialogAddBtn = document.querySelector("#add-todo-btn");
    const todoDialogTitle = document.querySelector("#dialog-todo-title-input");
    const todoDialogDescription = document.querySelector("#dialog-todo-description-area");
    const todoDialogDate = document.querySelector("#dialog-todo-date-input");
    const todoDialogPriority = document.querySelector("#priority-select");
    let todoCheckBtns = document.querySelectorAll(".todo-check-btn");
    let todoItems = document.querySelectorAll(".todo-item");
    const todoDialogEditTodoBtn = document.querySelector("#todos-edit-btn");
    const todoDialogRemoveTodoBtn = document.querySelector("#todos-remove-btn");
    const editTodoDialog = document.querySelector("#todo-edit-dialog");
    const editTodoHeader = document.querySelector("#edit-todo-h1");
    const editTodoCloseBtn = document.querySelector("#edit-todo-close-btn");
    const editTodoModeBtn = document.querySelector("#edit-todo-change-btn");
    const editTodoTitle = document.querySelector("#edit-todo-title");
    const editTodoDescription = document.querySelector("#edit-todo-description");
    const editTodoDate = document.querySelector("#edit-todo-date");

    let isTodoRemovePressed = false;
    let isEditBtnPressed = false;


    createProjectBtn.addEventListener("click", () => {
        addProjectDialog.showModal();
    });

    addDialogButtonClose.addEventListener("click", () => {
        addProjectDialog.close();
    });

    addDialogCallColorBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addDialogColorDialog.showModal();
    });

    for (const btn of addDialogColorBtns) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const color = e.currentTarget.dataset.id;
            addDialogCallColorBtn.value = color;
            addDialogCallColorBtn.style.backgroundColor = color;
            addDialogColorDialog.close();
        });
    }

    addDialogAddBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const title = addDialogTitleInput.value;
        const description = addDialogDescriptionArea.value;
        const color = addDialogCallColorBtn.value;
        const date = addDialogDateInput.value === "" ? new Date() : addDialogDateInput.valueAsDate;
        const project = new Project(title, color, "", "", date, description);
        console.log(project);

        addDialogTitleInput.value = "";
        addDialogDescriptionArea.value = "";
        addDialogCallColorBtn.value = "#000000";
        addDialogDateInput.value = "";
        addProjectDialog.close();
        console.log(projectDiv);
        updateProjects(projectDiv);
        allProjectItems = getProjectItem();
        ProjectItemsEvent(allProjectItems);
    });

    allProjectItems = getProjectItem();
    ProjectItemsEvent(allProjectItems);

    let isRemoveBtnPressed = false;
    removeProjectBtn.addEventListener("click", () => {
        if (isRemoveBtnPressed) {
            updateProjects(projectDiv);
            allProjectItems = getProjectItem();
            ProjectItemsEvent(allProjectItems);
            isRemoveBtnPressed = !isRemoveBtnPressed;
            console.log("yes");
            return;
        }
        isRemoveBtnPressed = !isRemoveBtnPressed;
        allProjectItems = document.querySelectorAll(".project-item");
        for (const projectItem of allProjectItems) {
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("remove-project-item-btn");
            deleteBtn.dataset.id = projectItem.dataset.id;
            deleteBtn.textContent = "Remove";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                isRemoveBtnPressed = false;
                Global.removeProjectById(e.currentTarget.dataset.id);
                updateProjects(projectDiv);
                allProjectItems = getProjectItem();
                ProjectItemsEvent(allProjectItems);
            });
            projectItem.appendChild(deleteBtn);
        }
    });

    saveProjectBtn.addEventListener("click", () => {
        WebStorage.saveProjects();
    });

    function ProjectItemsEvent(arrProjectItem) {
        for (const project of arrProjectItem) {
            project.addEventListener("click", (e) => {
                prepareShowModal(Global.getProjectById(project.dataset.id));
                showProjectDialog.showModal();
            });
        }
    }

    function getProjectItem() {
        return document.querySelectorAll(".project-item");
    }

    function prepareShowModal(projObj) {
        console.log(projObj);
        showProjectDialog.dataset.id = projObj.id;
        showProjectTitle.value = projObj.title;
        document.documentElement.style.setProperty("--show-project-color", projObj.color);

        showProjectProgressNumber.textContent = `${Math.floor(projObj.progress)}%`;
        console.log(showProjectProgressNumber);

        const month = String(projObj.date.getMonth() + 1).padStart(2, "0");
        const day = String(projObj.date.getDate()).padStart(2, "0");
        const year = projObj.date.getFullYear();

        showProjectDate.value = `${year}-${month}-${day}`;

        showProjectDescription.value = projObj.description;

        let mode = "view";
        showProjectModeInfo.textContent = "view mode";
        setInputsReadonly();

        showProjectBtnChange.addEventListener("click", () => {
            mode = mode === "view" ? "edit" : "view";
            if (mode === "edit") {
                removeInputsReadonly();
                showProjectModeInfo.textContent = "editing";
                showProjectBtnChange.textContent = "view mode";
            } else {
                setInputsReadonly();
                showProjectModeInfo.textContent = "visualize";
                showProjectBtnChange.textContent = "edit mode";
            }
        });

        function setInputsReadonly() {
            showProjectDate.setAttribute("readonly", "");
            showProjectDate.classList.add("hidden-input");
            showProjectDescription.setAttribute("readonly", "");
            showProjectDescription.classList.add("hidden-input");
            showProjectTitle.setAttribute("readonly", "");
            showProjectTitle.classList.add("hidden-input");
        }
        function removeInputsReadonly() {
            showProjectDate.removeAttribute("readonly");
            showProjectDate.classList.remove("hidden-input");
            showProjectDescription.removeAttribute("readonly");
            showProjectDescription.classList.remove("hidden-input");
            showProjectTitle.removeAttribute("readonly");
            showProjectTitle.classList.remove("hidden-input");
        }

        renderTodosDiv(projObj.getTodos(), showProjectTodoDiv);
        todoItemsListen();
        updateCheckListen();
    }
    showProjectDate.addEventListener("change", (e) => {
        const projectId = showProjectDialog.dataset.id;
        const project = Global.getProjectById(projectId);
        project.date = showProjectDate.valueAsDate;
        updateProjectDiv(projectDiv);
    });
    showProjectDescription.addEventListener("change", (e) => {
        const projectId = showProjectDialog.dataset.id;
        const project = Global.getProjectById(projectId);
        project.description = showProjectDescription.value;
        updateProjectDiv(projectDiv);
    });
    showProjectTitle.addEventListener("change", (e) => {
        const projectId = showProjectDialog.dataset.id;
        const project = Global.getProjectById(projectId);
        project.title = showProjectTitle.value;
        updateProjectDiv(projectDiv);
    });

    function updateProjectDiv(projDiv) {
        updateProjects(projectDiv);
        allProjectItems = getProjectItem();
        ProjectItemsEvent(allProjectItems);
    }

    showProjectColorCall.addEventListener("click", () => {
        console.log(showProjectColorDialog);
        showProjectColorDialog.showModal();
    });

    for (const colorBtn of showProjectColorPickBtn) {
        colorBtn.addEventListener("click", (e) => {
            const color = e.currentTarget.dataset.id;
            showProjectColorCall.value = color;
            showProjectColorCall.style.backgroundColor = color;

            const projectId = showProjectDialog.dataset.id;
            const project = Global.getProjectById(projectId);
            project.color = showProjectColorCall.value;
            document.documentElement.style.setProperty("--show-project-color", project.color);
            updateProjectDiv(projectDiv);

            showProjectColorDialog.close();
        });
    }

    showProjectCloseBtn.addEventListener("click", () => {
        showProjectDialog.close();
    });

    todoDialogCall.addEventListener("click", () => {
        todoDialog.showModal();
    });

    todoDialogCloseBtn.addEventListener("click", () => {
        todoDialog.close();
    });

    todoDialogAddBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const todo = new Todo(
            todoDialogTitle.value,
            todoDialogDescription.value,
            todoDialogDate.valueAsDate,
            todoDialogPriority.value,
            false,
            ""
        );
        const project = Global.getProjectById(showProjectDialog.dataset.id);
        project.addTodo(todo);
        renderTodosDiv(project.getTodos(), showProjectTodoDiv);
        todoItemsListen();
        todoDialog.close();
        updateCheckListen();
        showProjectProgressNumber.textContent = `${Math.floor(project.progress)}%`;
        updateProjectDiv(projectDiv);
    });

    function updateCheckListen() {
        todoCheckBtns = document.querySelectorAll(".todo-check-btn");
        for (const btn of todoCheckBtns) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const todoId = e.currentTarget.dataset.id;
                const projectId = showProjectDialog.dataset.id;
                const project = Global.getProjectById(projectId);
                const todo = project.getTodoById(todoId);
                todo.toggleCheck();
                updateTodoCheck(todo, e.currentTarget);
                showProjectProgressNumber.textContent = `${Math.floor(project.progress)}%`;
                updateProjectDiv(projectDiv);
            });
        }
    }

    todoDialogRemoveTodoBtn.addEventListener("click", () => {
        const projectId = showProjectDialog.dataset.id;
        const project = Global.getProjectById(projectId);
        renderTodosDiv(project.getTodos(), showProjectTodoDiv);
        isEditBtnPressed = false;

        if (isTodoRemovePressed) {
            todoItemsListen();
            isTodoRemovePressed = false;
            return;
        }
        isTodoRemovePressed = true;
        todoItems = getTodoItems();
        for (const item of todoItems) {
            const deleteTodoBtn = document.createElement("button");
            deleteTodoBtn.textContent = "Delete";
            deleteTodoBtn.classList.add("delete-todo-btn");
            deleteTodoBtn.dataset.id = item.dataset.id;

            deleteTodoBtn.addEventListener("click", (e) => {
                const todoId = e.currentTarget.dataset.id;
                console.log(e.currentTarget);
                project.removeTodoById(todoId);
                renderTodosDiv(project.getTodos(), showProjectTodoDiv);
                todoItemsListen();
                isTodoRemovePressed = false;
            });
            item.appendChild(deleteTodoBtn);
        }
    });

    console.log(editTodoModeBtn);
    todoDialogEditTodoBtn.addEventListener("click", () => {
        const project = Global.getProjectById(showProjectDialog.dataset.id);
        renderTodosDiv(project.getTodos(), showProjectTodoDiv);
        isRemoveBtnPressed = false;
        if (isEditBtnPressed) {
            isEditBtnPressed = false;
            return;
        }
        isEditBtnPressed = true;
        todoItems = getTodoItems();
        for (const el of todoItems) {
            const todo = project.getTodoById(el.dataset.id);
            const editBtn = document.createElement("button");
            editBtn.classList.add("todo-edit-btn");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                prepareEditTodoModal(todo, "edit");
                renderTodosDiv(project.getTodos(), showProjectTodoDiv);
                editTodoDialog.showModal();
                isEditBtnPressed = false;
            });
            el.appendChild(editBtn);
        }
    });

    editTodoModeBtn.addEventListener("click", () => {
        let mode = editTodoDialog.dataset.mode;
        mode = mode === "view" ? "edit" : "view";
        editTodoDialog.dataset.mode = mode;
        updateTodoMode(mode);
    });




    function getTodoItems() {
        return document.querySelectorAll(".todo-item");
    }

    function todoItemsListen() {
        todoItems = getTodoItems();
        for (const btn of todoItems) {
            const project = Global.getProjectById(showProjectDialog.dataset.id);
            const todo = project.getTodoById(btn.dataset.id);
            btn.addEventListener("click", () => {
                prepareEditTodoModal(todo, "view");
                editTodoDialog.showModal();
            });

        }
    }



    function prepareEditTodoModal(todo, mode) {
        updateTodoMode(mode);
        editTodoDescription.value = todo.description;
        editTodoTitle.value = todo.title;
        editTodoDialog.dataset.id = todo.id;
        editTodoDialog.dataset.mode = mode;
        editTodoHeader.textContent = mode === "view" ? "view mode" : "edit mode";

        const month = String(todo.dueDate.getMonth()).padStart(2, "0");
        const day = String(todo.dueDate.getDate()).padStart(2, "0");
        const year = todo.dueDate.getFullYear();

        editTodoDate.value = `${year}-${month}-${day}`;
    }

    editTodoDescription.addEventListener("change", (e) => {
        const project = Global.getProjectById(showProjectDialog.dataset.id);
        const todo = project.getTodoById(editTodoDialog.dataset.id);
        todo.description = editTodoDescription.value;
    });

    editTodoTitle.addEventListener("change", (e) => {
        const project = Global.getProjectById(showProjectDialog.dataset.id);
        const todo = project.getTodoById(editTodoDialog.dataset.id);
        todo.title = editTodoTitle.value;
        renderTodosDiv(project.getTodos(), showProjectTodoDiv);
        todoItemsListen();
    });

    editTodoDate.addEventListener("change", (e) => {
        const project = Global.getProjectById(showProjectDialog.dataset.id);
        const todo = project.getTodoById(editTodoDialog.dataset.id);
        todo.dueDate = editTodoDate.valueAsDate;
        console.log(todo.dueDate);
        renderTodosDiv(project.getTodos(), showProjectTodoDiv);
        todoItemsListen();
    });

    function updateTodoMode(mode) {
        if (mode === "edit") {
            editTodoDescription.setAttribute("readonly", "");
            editTodoDate.setAttribute("readonly", "");
            editTodoTitle.setAttribute("readonly", "");
            editTodoHeader.textContent = "Edit mode";

            editTodoDescription.classList.add("hidden-input");
            editTodoDate.classList.add("hidden-input");
            editTodoTitle.classList.add("hidden-input");
        } else {
            editTodoDescription.removeAttribute("readonly");
            editTodoDate.removeAttribute("readonly");
            editTodoTitle.removeAttribute("readonly");
            editTodoHeader.textContent = "View mode";

            editTodoDescription.classList.remove("hidden-input");
            editTodoDate.classList.remove("hidden-input");
            editTodoTitle.classList.remove("hidden-input");
        }
    }

    editTodoCloseBtn.addEventListener("click", () => {
        editTodoDialog.close();
    });

    todoItemsListen();
    console.log(Global.allProjects);
}

