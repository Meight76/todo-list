import "./style/style.css";
import { homepage } from "./homepage.js";
import { projectPage } from "./projects.js";
import { todosPage } from "./todos.js";
export const main = document.querySelector("#main-content");

homepage();

const navHome = document.querySelector("#nav-home-btn");
const navProject = document.querySelector("#nav-project-btn");
const navTodos = document.querySelector("#nav-todos-btn");
const navCustomize = document.querySelector("#nav-customize-btn");
const navSettings = document.querySelector("#nav-settings-btn");
const navProfile = document.querySelector("#nav-profile-btn");

navHome.addEventListener("click", homepage);
navProject.addEventListener("click", projectPage);
navTodos.addEventListener("click", todosPage);

// i'll have a web page using tab navigation
// user should be able to navigate between create/delete a Todo,
// a project, add/remove from project
// all of this inside of a gui
