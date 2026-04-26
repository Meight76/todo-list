import "./style/style.css";
import homepageUi from "./ui/homepage.js";
import  projectUi  from "./ui/projectUi.js";
import { todosPage } from "./todos.js";
import { resetDiv } from "./helpFunctions.js";
export const main = document.querySelector("#main-content");

homepageUi();

const navHome = document.querySelector("#nav-home-btn");
const navProject = document.querySelector("#nav-project-btn");
const navTodos = document.querySelector("#nav-todos-btn");
const navCustomize = document.querySelector("#nav-customize-btn");
const navSettings = document.querySelector("#nav-settings-btn");
const navProfile = document.querySelector("#nav-profile-btn");

navHome.addEventListener("click", () => {
    resetDiv(main);
    homepageUi();
});
navProject.addEventListener("click", () => {
    resetDiv(main);
    projectUi();
});
navTodos.addEventListener("click", () => {
    resetDiv(main);
    todosPage()
});

// i'll have a web page using tab navigation
// user should be able to navigate between create/delete a Todo,
// a project, add/remove from project
// all of this inside of a gui
