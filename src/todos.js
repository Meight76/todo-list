
export class Todo {
    constructor(title, description, dueDate, priority, check, notes) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._check = check;
        this._notes = notes;
    }
    //    " some methods to allow editing later "

    get title() {
        return this._title;
    }
    set title(newTitle) {
        this._title = newTitle;
    }

    get description() {
        return this._description;
    }
    set description(text) {
        if (text.length < 50) {
            console.log("ERROR: description too short");
        } else if (text.length > 300) {
            console.log("ERROR: description too long");
        } else {
            this._description = text;
        }
    }

    // set day, month, year, hour and returns as string
    get date() {
        return this._dueDate.toDateString();
    }
    set date([day, month, year, hour]) {
        const currentDate = new Date();
        if (month === undefined) {
            month = currentDate.getMonth();
        }
        if (year === undefined) {
            year = currentDate.getFullYear();
        }
        if (day === undefined) {
            day = currentDate.getDate();
        }
        if (hour === undefined) {
            hour = 23;
        }
        this._dueDate = new Date(year, month, day, hour);
    }

    get priority() {
        return this._priority;
    }
    set priority(number) {
        if (!Number.isInteger(number) ||number > 10 || number < 0) {
            console.log(`${number} is not a valid priority`);
        } else {
            this._priority = number;
        }
    }

    get check() {
        return this._check;
    }
    toggleCheck() {
        if (this._check === false) {
            this._check = true;
        } else {
            this._check = true;
        }
    }

    get notes() {
        return this._notes;
    }
    set notes(text) {
        this._notes = text;
    }
}
// allow to manage todo list
export class TodoList {
    #todos;
    constructor(projName) {
        this._name = projName;
        this.#todos = [];
    }
    getTodos() {
        return this.#todos.slice();
    }
    addTodo(...todoObjs) {
        for (const obj of todoObjs) {
            if (!(obj instanceof Todo)) {
                console.log("ERROR: object is not an instance of todo");
                console.log(obj);
            } else if(!this.#isNameAlreadyExisting(obj.title)) {
                console.log(`ERROR: ${obj.title} already exists`);
            } else {
                this.#todos.push(obj);
            }
        }
    }
    removeTodo(todoName) {
        const indexToRemove = this.#todos.findIndex(element => element.title === todoName);
        if (indexToRemove != -1) {
            this.#todos.splice(indexToRemove, 1);
        }
    }
    #isNameAlreadyExisting(name) {
        return this.#todos.some( element => element.title === name );
    }
}
// it should be one class for handling all the logic

