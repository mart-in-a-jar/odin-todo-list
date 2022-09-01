import { addProject, projects } from "./modules";
import { saveToLocalStorage } from "./storage";

const addProjectButton = document.querySelector("#addProject");
const addProjectModal = document.querySelector(".addProjectModal");
const backDrop = document.querySelector(".blur");
const newTask = document.querySelector("#newTask");

let activeModal;
let activeProject = {
    id: undefined,
    project: undefined
};

function setActiveModal(modal) {
    activeModal = modal;
}

function toggleModal(modal) {
    // Show
    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        backDrop.classList.add("active");
        setActiveModal(modal);
        modal.focus();
    }
    // Hide
    else {
        modal.classList.add("hidden");
        backDrop.classList.remove("active");
        if (modal.nodeName === "INPUT") {
            modal.value = "";
        }
    }
}

function addEventListeners() {
    addProjectButton.addEventListener("click", () => {
        toggleModal(addProjectModal);
    });

    backDrop.addEventListener("click", () => {
        toggleModal(activeModal);
    });

    addProjectModal.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addProject(e.target.value);
            populateProjects()
            toggleModal(addProjectModal);
        } else if (e.key === "Escape") {
            toggleModal(addProjectModal);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        populateProjects();
        setInitialActiveProject();
    });

    newTask.addEventListener("click", () => {
        saveToLocalStorage("projects", projects);
        console.log(projects);
    });
    
}

function populateProjects() {
    const projectList = document.querySelector(".projects ul");
    projectList.textContent = "";
    projects.forEach(project => {
        const listItem = document.createElement("li");
        const projectItem = document.createElement("a");
        listItem.appendChild(projectItem);
        projectList.appendChild(listItem);
        projectItem.textContent = project.name;
        projectItem.href = ""; 
        projectItem.dataset.projectNumber = projects.indexOf(project);
        
        
        projectItem.addEventListener("click", changeProject)
    });
    styleActiveProject("add");
}

function changeProject(e) {
    e.preventDefault();
    
    styleActiveProject("remove");
    activeProject.id = e.target.dataset.projectNumber;
    activeProject.project = projects[e.target.dataset.projectNumber];
    styleActiveProject("add");
}

function styleActiveProject(task) {
    if(task === "add") {
        if(activeProject.id) {
            document.querySelectorAll(".projects ul li a")[activeProject.id].classList.add("active");
        } else {
            document.querySelector(".projects ul li a").classList.add("active");
        }
    } else if(task === "remove") {
        document.querySelectorAll(".projects ul li a")[activeProject.id].classList.remove("active");
    }
        
}

function setInitialActiveProject() {
    activeProject.project = projects[0];
    activeProject.id = 0;
    styleActiveProject("add")
}

function populateTasks() {
    const taskList = document.querySelector(".main .tasks");
}

export { toggleModal, addEventListeners }

////
// toggleModal(addProjectModal);