import Project from "../models/projectModel.js";

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
    static editProjectbyId(projId, changesObj) {
        const proj = this.getProjectById(projId);
        if (proj === undefined) {
            console.log(`ERROR: couldn't solve id`)
            return;
        }
        for (const attr in changesObj) {
            switch (attr) {
                case title:
                    proj.title = changesObj.title;
                    break;
                case color:
                    proj.color = changesObj.color;
                    break;
                case description:
                    proj.description = changesObj.description;
                    break;
                case date:
                    proj.date = changesObj.date;
                    break;
                case id:
                    proj.id = changesObj.id;
                    break;
                default:
                    console.log(`ERROR: couldn't match attr ${attr}`);
            }
        }
    }
}
