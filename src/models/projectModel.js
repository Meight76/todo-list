import { Todo } from "./todos.js";

export default class Project {
    constructor(title, color, dueDate, description) {
        this._title = title;
        this._color = color;
        this._progress = 0;
        this._dueDate = dueDate;
        this._description = description;
        this._id = crypto.randomUUID();
        this._todos = [];
    }

    getAllTodo() {
        return this._todos.slice();
    }

    addTodo(...todoObj) {
        for (const todo of todoObj) {
            if (!(todo instanceof Todo)) {
                console.log(`ERROR: ${todo} is not instance of Todo`);
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
