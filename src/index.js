import "./style/style.css";
import { homepage } from "./homepage.js";
import { projectPage } from "./projects.js";
export const main = document.querySelector("#main-content");

projectPage();

// i'll have a web page using tab navigation
// user should be able to navigate between create/delete a Todo,
// a project, add/remove from project
// all of this inside of a gui
