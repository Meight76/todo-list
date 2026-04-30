import Todo from "./todoModel.js";
import { color } from "../controller/projectController.js";
import Global from "../storage/global.js";

export default class Project {
    constructor(title, color, progress, id, dueDate, description) {
        if (id.length !== 36) {
            id = "";
            console.log(`ERROR: unvalid id for Project`);
        }
        this._title = title;
        this._color = color;
        this._progress = progress || 0;
        this._dueDate = dueDate || new Date();
        this._description = description;
        this._id = id || crypto.randomUUID();
        this._todos = [];
        Global.addProject(this);
    }

    static reconstructor(arrProj) {
        const hydrate = arrProj.map(item => {
            const title = item._title;
            const color = item._color;
            const progress = item._progress;
            const dueDate = new Date(item._dueDate);
            const description = item._description;
            const id = item._id;
            const todos = item._todos;
            const hidProj = new Project(title, color, progress, id, dueDate, description);
            hidProj.addTodo(Todo.reconstructor(todos));
            Global.addProject(hidProj);
            return hidProj;
    });

return hydrate;
}

    get id() {
        return this._id;
    }
    set id(text) {
        if (text.length !== 36) {
            console.log(`ERROR: invalid project id ${text}`);
        } else {
            this._id = text;
        }
    }

    get date() {
        return this._dueDate;
    }
    set date(dateObj) {
        if (!(dateObj instanceof Date)) {
            console.log(`ERROR: ${dateObj} not instance of date`);
        } else {
            this._dueDate = dateObj;
        }
    }
    get title() {
        return this._title;
    }
    set title(text) {
        if (typeof text !== "string" || text.length < 1) {
            console.log(`ERROR: invalid title ${text}`);
        } else {
            this._title = text;
        }
    }
    get color() {
        return this._color;
    }
    set color(hexCode) {
        if (!color.includes(hexCode)) {
            console.log(`ERROR: invalid color ${hexCode}`);
        } else {
            this._color = hexCode;
        }
    }
    get description() {
        return this._description;
    }
    set description(text) {
        if (typeof text !== "string" || text.length > 300) {
            console.log(`ERROR: invalid description ${text}`);
        } else {
            this._description = text;
        }
    }
    get progress() {
        const todos = this.getTodos();
        const checkedNum = todos.reduce((value, el) => {
            return el.check === true ? value + 1 : value;
        }, 0);
        return (checkedNum / todos.length) * 100;
    }

    getTodos() {
        return this._todos.slice();
    }

    getTodoById(todoId) {
        return (this._todos.filter(item => item.id === todoId))[0];
    }

    addTodo(...todoObj) {
        if (Array.isArray(todoObj) && Array.isArray(todoObj[0])) {
            todoObj = todoObj.flat();
        }
        for (const todo of todoObj) {
            console.log(todo, todoObj[0]);
            if (!(todo instanceof Todo)) {
                console.log(`ERROR: ${todo} is not instance of Todo`);
                console.log(todo);
                console.log(Object.getPrototypeOf(todo));
            } else if (this.isTodoAlreadyExist(todo.title)) {
                console.log(`ERROR: todo: ${todo.title} already exist`);
            }
             else {
                this._todos.push(todo);
            }
        }
    }

    removeTodoById(todoId) {
        const newTodoArr = this._todos.filter(todo => todo.id != todoId);
        this._todos = newTodoArr;
    }

    isTodoAlreadyExist(todoName) {
        return this._todos.some(todo => todo.title === todoName);
    }

    editTodoById(todoId, objWithChanges) {
        const todo = (this._todos.filter(item => item.id === todoId))[0];
        if (todo === undefined) {
            console.log(`ERROR: could not solve id for editing todo`);
            return;
        }
        if (!(objWithChanges instanceof Object)) {
            console.log(`ERROR: objWithChanges is not an object`);
            return;
        }
        for (const key in objWithChanges) {
            switch (key) {
                case "title":
                    todo.title = objWithChanges.title;
                    break;

                case "description":
                    if (objWithChanges.description.length > 300) {
                        console.log(`ERROR: description too long`);
                    } else {
                        todo.description = objWithChanges.description;
                    }
                    break;

                case "date":
                    if (objWithChanges.date instanceof Date) {
                        todo.date = objWithChanges.date;
                    } else {
                        console.log(`ERROR: ${objWithChanges.date} is not instanceof Date`);
                    }
                    break;

                case "priority":
                    const priorities = ["low", "medium", "high"];
                    let isChangeMade = false;
                    for (const elem of priorities) {
                        if (objWithChanges.priority.toLowerCase() === elem) {
                            todo.priority = objWithChanges.priority;
                            isChangeMade = true;
                            break;
                        }
                    }
                    if (!isChangeMade) {
                        console.log(`ERROR: no priority match`);
                    }
                    break;

                case "notes":
                    todo.notes = objWithChanges.notes;
                    break;

                default:
                    console.log(`key: ${key} not match property`);
                    break;
            }
        }
    }
}
