export default class project {
    constructor(title, ...projects) {
        if (!projects) {
            projects = new Array();
        }
        this.title = title;
        this.projects = projects;
    }
}
