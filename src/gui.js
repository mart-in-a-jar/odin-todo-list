import { addProject, projects } from "./modules";
import { saveToLocalStorage } from "./storage";

const addProjectButton = document.querySelector("#addProject");
const addProjectModal = document.querySelector(".addProjectModal");
const backDrop = document.querySelector(".blur");
const newTask = document.querySelector("#newTask");

let activeModal;

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
    });
}


export { toggleModal, addEventListeners }

////
// toggleModal(addProjectModal);