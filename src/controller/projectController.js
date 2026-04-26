import Project from "../models/projectModel.js";
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
        const date = new Date(addDialogDateInput.value);
        const project = new Project(title, color, "", "", date, description);
        console.log(project);

        addDialogTitleInput.value = "";
        addDialogDescriptionArea.value = "";
        addDialogCallColorBtn.value = "";
        addDialogDateInput.value = "";
        addProjectDialog.close();
        console.log(projectDiv);
        updateProjects(projectDiv);
    });
}
