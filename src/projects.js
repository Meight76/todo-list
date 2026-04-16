import { Todo, TodoList } from "./todos.js";

export default class project {
    static #allProjects = [];
    constructor(title, color, dueDate, description) {
        this._title = title;
        this._color = color;
        this._dueDate = dueDate;
        this._description = description;
        this._todos = new TodoList();
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
