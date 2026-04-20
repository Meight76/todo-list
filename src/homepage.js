import { main } from "./index.js";
import "./style/homepageStyle.css";
import { createTag, resetDiv, shuffle } from "./helpFunctions.js";
import Project, {projectPage} from "./projects.js";
import { Todo, TodoList} from "./todos.js";

export function homepage() {
    resetDiv(main);
    const buttonDiv = createTag("div", "", "btn-div", main);
    const projectBtn = createTag("button", "Project", "project-btn", buttonDiv);
    const todosBtn = createTag("button", "Todos", "todos-btn", buttonDiv);

    const projectsDiv = document.createElement("div");
    projectsDiv.setAttribute("id", "projects");
    const projectsList = Project.globalProjects;
    shuffle(projectsList);

    for (let i = 0; i < projectsList.length; i++) {
        if (i === 4) {
            break;
        }
        const projectItem = document.createElement("button");
        projectItem.classList.add("project-item");
        projectItem.value = projectsList[i];

        const title = document.createElement("h2");
        title.classList.add("project-item-title");
        title.textContent = projectsList[i].title;

        projectItem.addEventListener("click", (e) => {
            showProjectDetails(e.target.value);
        });

        projectItem.appendChild(title);
        projectsList.appendChild(projectItem);
    }

    main.appendChild(projectsDiv);

    projectBtn.addEventListener("click", () => {
        projectPage();
    });

    todosBtn.addEventListener("click", () => {
        todosPage();
    });
}


