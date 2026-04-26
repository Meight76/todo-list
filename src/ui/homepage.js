import { createTag, shuffle, resetDiv } from "../helpFunctions.js";
import { main } from "../index.js";
import projectUi from "./projectUi.js";
import "../style/homepageStyle.css";
import Global from "../storage/global.js";

export default function homepageUi() {
    const buttonDiv = createTag("div", "", "btn-div", main);
    const projectBtn = createTag("button", "project", "project-btn", buttonDiv);
    const todosBtn = createTag("button", "todos", "todos-btn", buttonDiv);

    const projectsDiv = document.createElement("div");
    projectsDiv.setAttribute("id", "projects");
    const projectsList = shuffle(Global.allProjects);

    for (let i = 0; i < projectsList.length; i++) {
        if (i === 4) {
            break;
        }
        const projectItem = document.createElement("button");
        projectItem.classList.add("project-item");
        projectItem.value = projectsList[i].id;

        const title = document.createElement("h2");
        title.classList.add("project-item-title");
        title.textContent = projectsList[i].title;

        projectItem.addEventListener("click", (e) => {
            showProjectDetails(e.currentTarget.value);
        });

        projectItem.appendChild(title);
        projectsDiv.appendChild(projectItem);
    }

    main.appendChild(projectsDiv);

    projectBtn.addEventListener("click", () => {
        resetDiv(main);
        projectUi();
    });

    todosBtn.addEventListener("click", () => {
        resetDiv(main);
        todosUi();
    });
}
