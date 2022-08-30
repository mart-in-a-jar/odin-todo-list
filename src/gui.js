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
            toggleModal(addProjectModal);
        }
    });
}

function populateProjects() {

}

export { toggleModal, addEventListeners }

////
toggleModal(addProjectModal);