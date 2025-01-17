import { createProject, projects } from "./project";
//import { addTodoDom, updateMain } from "./todoDom.js";

function renderProjectList() {
    const projectList = document.querySelector(".projectList");
    projectList.innerHTML = "";
    projects.forEach((project) => {
        const projectListItem = document.createElement("li");
        projectListItem.textContent = project.Name;
        projectListItem.classList.add("project");
        projectListItem.setAttribute("data-index", project.id);
        projectList.append(projectListItem);
    });

    const projectViews = document.querySelectorAll(".project");
    projectViews.forEach((project) => {
        project.addEventListener("click", () => {
            const projectIndex = project.getAttribute("data-index");
            projectView(projects[projectIndex - 1]);
        });
    });
}

function addProjectForm() {
    const addProjectButton = document.querySelector(".addProject");

    const form = document.querySelector(".projectForm");
    const projectNameInput = document.querySelector(".projectName");
    const addBtn = document.querySelector(".createProject");
    const cancelBtn = document.querySelector(".cancelProject");

    addProjectButton.addEventListener("click", () => {
        form.style.display = "flex";
    });

    addBtn.addEventListener("click", () => {
        addProjectToList(projectNameInput.value);
        renderProjectList();
        form.style.display = "none";
        form.reset();
    });

    cancelBtn.addEventListener("click", () => {
        form.style.display = "none";
        form.reset();
    });
}

function addProjectToList(projectName) {
    createProject(projectName);
}

function projectView(project) {
    const mainHeader = document.querySelector(".main-header");
    mainHeader.textContent = project.Name;
    //updateMain(project.Todos);
}

export { addProjectForm, renderProjectList };
