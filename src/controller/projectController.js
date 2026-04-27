import Project from "../models/projectModel.js";
import Global from "../storage/global.js";
import { renderProjectDiv, projectDiv, updateProjects } from "../ui/projectUi.js";

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
                Global.removeProjectById(e.currentTarget.dataset.id);
                updateProjects(projectDiv);
                allProjectItems = getProjectItem();
                ProjectItemsEvent(allProjectItems);
            });
            projectItem.appendChild(deleteBtn);
        }
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

        showProjectProgressNumber.textContent = projObj.progress;
        console.log(showProjectProgressNumber);

        const month = String(projObj.date.getMonth() + 1).padStart(2, "0");
        const day = String(projObj.date.getDate()).padStart(2, "0");
        const year = projObj.date.getFullYear();

        showProjectDate.value = `${year}-${month}-${day}`;

        showProjectDescription.value = projObj.description;

        let mode = "view";
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
}

