import { addProject, projects } from "./modules";

const addProjectButton = document.querySelector("#addProject");
const addProjectModal = document.querySelector(".addProjectModal");
const backDrop = document.querySelector(".blur");

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
    addProjectModal.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addProject(e.target.value);
            populateProjects()
            toggleModal(addProjectModal);
        }
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
        
        console.log(project);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateProjects();
});

export { toggleModal, addEventListeners }

////
// toggleModal(addProjectModal);