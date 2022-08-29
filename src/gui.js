const addProjectButton = document.querySelector("#addProject");
const addProjectModal = document.querySelector(".addProjectModal");

function toggleModal(modal) {
    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
    }
    else {
        modal.classList.add("hidden");
    }
}

function addEventListeners() {
    addProjectButton.addEventListener("click", () => {
        toggleModal(addProjectModal);
    });    
}

export { toggleModal, addEventListeners }