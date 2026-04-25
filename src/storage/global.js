import Project from "../models/projectModel";

export default class Global {
    static _allProjects = [];

    static get allTodos() {
        return this._allProjects.reduce((arr, currItem) => {
            for (const todo of currItem.getTodos()) {
                arr.push(todo);
            }
            return arr;
        }, []);
    }

    static get allProjects() {
        return this._allProjects.slice();
    }

    static addArrProj(arrProj) {
        for (const proj of arrProj) {
            Global.addProject(proj);
        }
    }

    static addProject(proj) {
        if (!(proj instanceof Project)) {
            console.log(`ERROR: project must be instance of Project`);
            return;
        }
        this._allProjects.push(proj);
    }
    static removeProjectById(projId) {
        this._allProjects = this._allProjects.filter(item => item.id !== projId);
    }
    static getProjectById(projId) {
        return (this._allProjects.filter(item => item.id === projId))[0];
    }
}
