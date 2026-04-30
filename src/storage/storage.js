import Project from "../models/projectModel.js";
import Todo from "../models/todoModel.js";
import Global from "./global.js";

export default class Storage {
    static saveProjects() {
        const stringData = JSON.stringify(Global.allProjects);
        localStorage.removeItem("projects");
        localStorage.setItem("projects", stringData);
    }

    static loadStorage() {
        const JsonProjects = localStorage.getItem("projects");
        if (JsonProjects !== null) {
            // const Projects = this.#rehydrateProjects(JsonProjects);
            console.log(JsonProjects);
            const projects = Project.reconstructor(JSON.parse(JsonProjects));
            console.log(projects);
            console.log(Global.allProjects);
            Global.resetProj();
            Global.addArrProj(projects);
        }
    }
}
