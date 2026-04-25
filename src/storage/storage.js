import Project from "../models/projectModel.js";
import Todo from "../models/todoModel.js";
import Global from "./global.js";

export default class Storage {
    saveProjects() {
        const stringData = JSON.stringify(Global.allProjects);
        localStorage.setItem("projects", stringData);
    }

    loadStorage() {
        const JsonProjects = localStorage.getItem("projects");
        if (JsonProjects !== null) {
            // const Projects = this.#rehydrateProjects(JsonProjects);
            const projects = Project.reconstructor(JSON.parse(JsonProjects));
            Global.addArrProj(projects);
        }
    }
}
