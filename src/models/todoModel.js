export class Todo {
    constructor(title, description, dueDate, priority, check, notes) {
        // i call setter for setting my private properties
        // that's because my validations live in setters
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.id = crypto.randomUUID();
        this.priority = priority;
        this.check = check;
        this.notes = notes;
    }

    get title() {
        return this._title;
    }
    set title(text) {
        if (!(typeof text === "string")) {
            console.log(`ERROR: title must be string`);
            return;
        } else if (text.length > 30) {
            console.log(`ERROR: title cannot be longer than 30 chars`);
            return;
        } else if (text.trim() === "") {
            console.log(`ERROR: title must not be set with empty string`);
            return;
        }
        this._title = text.trim();
    }

    get description() {
        return this._description;
    }
    set description(text) {
        if (!(typeof text === "string")) {
            console.log(`ERROR: descripton must be set with string`);
            return;
        }
        if (text.length > 300) {
            console.log(`ERROR: description too long`);
            return;
        }
        this._description = text;
    }

    get dueDate() {
        return this._dueDate;
    }
    set dueDate(dateObj) {
        if (!(dateObj instanceof Date)) {
            console.log(`ERROR: dateObj not instanceof Date`);
            return;
        }
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        dateObj.setHours(0, 0, 0, 0);
        if (dateObj < currentDate) {
            console.log(`ERROR: you cannot set date in the past`);
            return;
        }
        this._dueDate = dateObj;
    }

    get priority() {
        return this._priority;
    }
    set priority(text) {
        const priorities = ["low", "medium", "high"];
        if (!(typeof text === "string")) {
            console.log(`ERROR: priority must be set with string`);
            return;
        }
        if (!priorities.includes(text.toLowerCase())) {
            console.log(`ERROR: not valid priority to set`);
            return;
        }
        this._priority = text.toLowerCase();
    }

    get check() {
        return this._check;
    }
    set check(boolean) {
        if (!(typeof boolean === "boolean")) {
            console.log(`ERROR: check must be a boolean value`);
            return;
        }
        this._check = boolean;
    }
    toggleCheck() {
        this._check = !this._check;
    }

    get notes() {
        return this._notes;
    }
    set notes(text) {
        this._notes = text;
    }
}
