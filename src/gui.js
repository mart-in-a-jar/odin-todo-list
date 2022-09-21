import { addProject, projects, task } from "./modules";
import { saveToLocalStorage } from "./storage";
const addProjectButton = document.querySelector("#addProject");
const addProjectModal = document.querySelector(".addProjectModal");
const addTaskModal = document.querySelector(".addTaskModal");
const backDrop = document.querySelector(".blur");
const newTask = document.querySelector("#newTask");
const taskModal = document.querySelector(".taskModal");
const searchField = document.querySelector("#searchField");
const clearSearchButton = document.querySelector(".search .cancel");
const deleteProjectModal = document.querySelector(".delete.modal");

let activeModal;
let activeProject = {
    id: undefined,
    project: undefined
};
let activeTask;
let activeFilter;

function save() {
    saveToLocalStorage("projects", projects);
}

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
            modal.blur();
        }
    }
}

function addEventListeners() {
    addProjectButton.addEventListener("click", () => {
        toggleModal(addProjectModal);
    });

    newTask.addEventListener("click", () => {
        toggleModal(addTaskModal);
    })

    backDrop.addEventListener("click", () => {
        toggleModal(activeModal);
    });

    addProjectModal.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && addProjectModal.value.trim()) {
            addProject(addProjectModal.value.trim());
            populateProjects()
            toggleModal(addProjectModal);
            save();
        } else if(e.key === "Escape") {
            toggleModal(addProjectModal);
        }
    });

    addTaskModal.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && addTaskModal.value.trim()) {
            addTask(addTaskModal.value.trim());
            populateTasks[activeFilter]();
            toggleModal(addTaskModal);
            save();
        } else if(e.key === "Escape") {
            toggleModal(addTaskModal);
        }
    });

    searchField.addEventListener("blur", () => {
        if(!searchField.value.trim()) {
            searchField.value = "";
            populateTasks[activeFilter]();
        }
    });

    searchField.addEventListener("keyup", e => {
        if(e.key === "Escape") {
            searchField.value = "";
            searchField.blur();
        } else populateTasks.search();
    });

    clearSearchButton.addEventListener("click", e => {
        e.preventDefault();
        searchField.value = "";
        populateTasks[activeFilter]();
    });

    window.addEventListener("keyup", (e) => {
        // New task/search - Don't fire if backdrop (ie any modal) is active
        if(!document.querySelector(".blur.active") && !document.querySelector("input:focus")) {
            if(e.code === "KeyN" && document.activeElement != searchField) toggleModal(addTaskModal);
            else if(e.code === "KeyS") searchField.focus();
        }
        // Close taskmodal
        else if(e.key === "Escape") {
            if(!taskModal.classList.contains("hidden")) {
                document.activeElement.blur();
                toggleModal(taskModal);
            } else if(!deleteProjectModal.classList.contains("hidden")) {
                toggleModal(deleteProjectModal);
            }
        }

    });

    document.addEventListener("DOMContentLoaded", () => {
        populateProjects();
        setInitialFilters();
        populateTasks[searchField.value ? "search" : "active"]();
    });    
}

function populateProjects() {
    const projectList = document.querySelector(".projects ul");
    projectList.textContent = "";
    projects.forEach(project => {
        const listItem = document.createElement("li");
        const projectItem = document.createElement("a");
        const editProjectButton = document.createElement("div");
        const deleteProjectButton = document.createElement("div");
        const editName = document.createElement("input");
        editProjectButton.classList.add("edit");
        editProjectButton.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        deleteProjectButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteProjectButton.classList.add("delete");
        projectItem.textContent = project.name;
        projectItem.href = ""; 
        projectItem.dataset.projectNumber = projects.indexOf(project);
        editProjectButton.dataset.projectNumber = projects.indexOf(project);
        deleteProjectButton.dataset.projectNumber = projects.indexOf(project);
        listItem.append(projectItem, editName, deleteProjectButton, editProjectButton);
        projectList.appendChild(listItem);
        
        editProjectButton.addEventListener("click", projectEdit);
        projectItem.addEventListener("click", changeProject);
        deleteProjectButton.addEventListener("click", deleteProject);
    });
    styleActiveProject();
}

function changeProject(e) {
    e.preventDefault();
    
    activeProject.id = e.target.dataset.projectNumber;
    activeProject.project = projects[e.target.dataset.projectNumber];
    styleActiveProject();

    populateTasks[activeFilter]();
}

function deleteProject(e) {
    const projectNumber = e.target.dataset.projectNumber;
    deleteProjectModal.textContent = "";
    const message = document.createElement("div");
    message.innerHTML = `Are you sure you wish to delete <span class="projectName">
    ${projects[projectNumber].name}</span>?`;
    message.classList.add("message");
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Delete";

    confirmButton.addEventListener("click", () => {
        projects.splice(projectNumber, 1);
        save();
        toggleModal(deleteProjectModal);
        setInitialFilters();
        populateProjects();
        populateTasks[activeFilter]();

    });

    deleteProjectModal.append(message, confirmButton);
    
    
    toggleModal(deleteProjectModal);
    confirmButton.focus();
    document.querySelector(".sidebar .projects li input.active").classList.remove("active");
    document.querySelector(".sidebar .projects li .delete.active").classList.remove("active");

    
}


function projectEdit(e) {
    const projectNumber = e.target.dataset.projectNumber;
    const projectName = document.querySelector(`.sidebar .projects [data-project-number = "${projectNumber}"]`);
    const nameInput = document.querySelectorAll(`.sidebar .projects ul li input`)[projectNumber];
    const deleteButton = document.querySelectorAll(`.sidebar .projects ul li .delete`)[projectNumber];
    const newNameInput = nameInput.cloneNode();
    nameInput.parentNode.replaceChild(newNameInput, nameInput);
    newNameInput.value = projectName.textContent;
    newNameInput.classList.add("active");
    newNameInput.focus();
    newNameInput.selectionStart = newNameInput.value.length;
    deleteButton.classList.add("active");

    function changeName() {
        newNameInput.classList.remove("active");
        deleteButton.classList.remove("active");
        if(newNameInput.value != projectName.textContent) {
            projects[projectNumber].name = newNameInput.value.trim();
            save();
            projectName.textContent = newNameInput.value.trim();
        }
    }

    newNameInput.addEventListener("keyup", e => {
        if(e.key === "Enter") {
            changeName();
        } else if(e.key === "Escape") {
            newNameInput.value = projectName.textContent;
            newNameInput.blur();
        }
    });
    newNameInput.addEventListener("blur", () => {
        if(!deleteButton.matches(":hover")){
            changeName();
        }
    });

}

function styleActiveProject() {
    document.querySelectorAll(".projects ul li a").forEach(element => 
        element.classList.remove("active"));
    if(activeProject.id) {
        document.querySelectorAll(".projects ul li a")[activeProject.id].classList.add("active");
    } else {
        document.querySelector(".projects ul li a").classList.add("active");
    }   
}

function styleActiveFilter() {
    document.querySelectorAll(".sideContent .filter ul li a").forEach(element => 
        element.classList.remove("active"));
    if(activeFilter) {
        document.querySelector(`.sideContent .filter ul li a[data-filter="${activeFilter}"]`)
        .classList.add("active");
    } else {
        document.querySelector(".sideContent .filter ul li a").classList.add("active");
    }
}

function setInitialFilters() {
    activeProject.project = projects[0];
    activeProject.id = 0;
    styleActiveProject();

    activeFilter = "active";
    styleActiveFilter();
}

const filterTasks = (() => {
    const filters = document.querySelectorAll(".sideContent .filter ul li a");

    filters.forEach(filter => {
        filter.addEventListener("click", e => {
            let filter = e.target.dataset.filter;
            e.preventDefault();
            styleActiveFilter();
            activeFilter = filter;
            styleActiveFilter();
            searchField.value = "";
            populateTasks[filter]();
        });
    });
})();

const populateTasks = (() => {
    function writeTasks(tasks) {
        const taskList = document.querySelector(".main .tasks");
        taskList.textContent = "";
        if(!tasks) return;
        tasks.forEach(task => {
            const taskBox = document.createElement("div");
            taskBox.classList.add("task");
            taskBox.dataset.taskNumber = activeProject.project.tasks.indexOf(task);
            taskBox.innerHTML = `<article>
            <h3>${task.title}</h3>
            <p>${task.description || ""}</p>
        </article>
        <div class="buttons">
            <a class="complete${task.complete ? " done":""}" data-task-number="${activeProject.project.tasks.indexOf(task)}" href="">
            <i class="fa-solid fa-square-check fa-2xl"></i></a>
        </div>`
        taskBox.addEventListener("click", e => taskEdit.show(e.target.dataset.taskNumber));
        taskList.appendChild(taskBox);
        });
    document.querySelectorAll(".task .buttons a.complete").forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation(); // So eventlistener on taskBox does not trigger, opening the task
            let task = activeProject.project.tasks[e.target.dataset.taskNumber];
            taskEdit.complete(task);
            populateTasks[activeFilter]();
        });
    });
    }
    function active() {
        let tasks = activeProject.project.getTasks.active();
        writeTasks(tasks);
    }

    function today() {
        let tasks = activeProject.project.getTasks.today();
        writeTasks(tasks);
    }

    function thisWeek() {
        let tasks = activeProject.project.getTasks.thisWeek();
        writeTasks(tasks);
    }

    function completed() {
        let tasks = activeProject.project.getTasks.completed();
        writeTasks(tasks);
    }

    function search() {
        let tasks = activeProject.project.getTasks.search(searchField.value);
        writeTasks(tasks);
    }

    return { active, completed, today, thisWeek, search }
})();

const taskEdit = (() => {

    function show(taskNo) {
        activeTask = taskNo;
        let task = activeProject.project.tasks[taskNo];
        taskModal.textContent = "";
        taskModal.innerHTML = `<div class="taskCard">
        <div class="task leftSide">
            <div class="task title">
                <a class="complete${task.complete ? " done":""}">
                <i class="fa-solid fa-square-check fa-2xl"></i>
                <div class="checkMark"></div>
                </a>
                <input type="text" value="${task.title}">
            </div>
            <div class="checkListWrapper">
                <div class="task checkList">
                </div>
                <a class="addCheckListItem"><i class="fa-solid fa-plus"></i></a>
                <input type="text" class="addCheckListInput hidden"></input>
            </div>
            <textarea class="task description" placeholder="Beskrivelse">${task.description || ""}</textarea>
        </div>
        <div class="task rightSide">
            <div class="task date">
                <label for="taskDueDate">Due date</label>
                <input type="date" name="dueDate" id="taskDueDate" value="${task.dueDate}" required>
            </div>
            <div class="task priority">
                <label for="taskPriority">Priority</label>
                <select name="priority" id="taskPriority">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="task delete">
                <button id="deleteTask">Delete</button>
            </div>
        </div>
</div>`

        const titleInput = taskModal.querySelector(".task.title input");
        const descriptionInput = taskModal.querySelector(".taskCard textarea");
        const dateInput = taskModal.querySelector("#taskDueDate");
        const prioritySelect = document.querySelector("#taskPriority");
        let addCheckListInput = document.querySelector(".addCheckListInput");
        const addCheckListItem = document.querySelector(".addCheckListItem");
        const deleteTaskButton = document.querySelector("#deleteTask");

        let checkList = taskModal.querySelector(".task.checkList");
        task.checkList.forEach(item => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("checkListItem");
            const box = document.createElement("input");
            box.type = "checkbox";
            const taskId = task.checkList.indexOf(item);
            box.id = "check-" + (taskId + 1);
            box.checked = item.isDone;
            box.dataset.checkListId = taskId;
            const title = document.createElement("label");
            title.htmlFor = box.id;
            title.textContent = item.title;
            const deleteButton = document.createElement("a");
            deleteButton.classList.add("delete");
            deleteButton.dataset.checkListId = taskId;
            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-trash");
            deleteButton.appendChild(deleteIcon);
            wrapper.append(box, title, deleteButton);
            checkList.appendChild(wrapper);
        });

        if(task.checkList.length < 1) {
            checkList.textContent = "Add work items";
        }

        prioritySelect.value = task.priority;

        taskModal.querySelector(".task.title a.complete").addEventListener("click", e => {
            taskEdit.complete(task);
            populateTasks[activeFilter]();
            if(task.complete) {
                e.target.classList.add("done");
            } else e.target.classList.remove("done");
        });

        // Auto extend text area
        descriptionInput.addEventListener("keyup", (e) => {
            extendTextArea(e.target);
        });

        titleInput.addEventListener("blur", e => {
            scrollLeft(e.target);
            if(titleInput.value.trim()) {
                task.title = titleInput.value.trim();
                save();
                populateTasks[activeFilter]();
            } else {
                titleInput.value = task.title;
            }
        });

        titleInput.addEventListener("focus", e => {
            e.target.selectionStart = e.target.value.length;
        });

        dateInput.addEventListener("change", (e) => {
            task.dueDate = e.target.value;
            save();
            populateTasks[activeFilter]();
        });

        descriptionInput.addEventListener("blur", () => {
            task.description = descriptionInput.value.trim();
            save();
            populateTasks[activeFilter]();
        });

        prioritySelect.addEventListener("change", () => {
            task.priority = +prioritySelect.value;
            save();
            populateTasks[activeFilter]();
        });

        checkList.querySelectorAll("input[type=checkbox]").forEach(item => {
            item.addEventListener("change", e => {
                task.checkList[e.target.dataset.checkListId].toggle();
                save();
            });
        });

        checkList.querySelectorAll(".delete").forEach(item => {
            item.addEventListener("click", () => {
                task.checkList.splice([item.dataset.checkListId], 1);
                save();
                taskEdit.show(activeTask);
                toggleModal(taskModal);
                extendTextArea(descriptionInput);
            });
        });

        deleteTaskButton.addEventListener("click", () => {
            activeProject.project.tasks.splice(activeTask, 1);
            save();
            toggleModal(taskModal);
            setTimeout(() => {
                populateTasks[activeFilter]();
            }, 200);
        });

        addCheckListItem.addEventListener("click", () => {
            addCheckListInput.classList.remove("hidden");
            addCheckListInput.focus();
        });

        let enterBlurCheck = false;

        addCheckListInput.addEventListener("blur", () => {
            if (enterBlurCheck) {
                enterBlurCheck = false;
            } else {
                if(addCheckListInput.value.trim()) {
                    newCheckListItem(task);
                } else {
                    addCheckListInput.value = "";
                }
                addCheckListInput.classList.add("hidden");
            }
        });

        addCheckListInput.addEventListener("keyup", e => {
            if(e.key === "Enter") {
                if(addCheckListInput.value.trim()) {
                    enterBlurCheck = true;
                    newCheckListItem(task);
                    addCheckListInput.focus();
                }
            } else if(e.key === "Escape") {
                addCheckListInput.value = "";
                addCheckListInput.classList.add("hidden");
                e.stopPropagation();
            }
        });
        
        function newCheckListItem(task) {
            task.addCheckListItem(addCheckListInput.value.trim());
            save();
            taskEdit.show(activeTask);
            toggleModal(taskModal);
            extendTextArea(descriptionInput);
            addCheckListInput = document.querySelector(".addCheckListInput");
            addCheckListInput.classList.remove("hidden");
        }

        toggleModal(taskModal);
        extendTextArea(descriptionInput);

    }
    function complete(task) {
        task.toggle();
        save();
    }




    
    
    return { show, complete }
})();

function scrollLeft(element) {
    element.scrollLeft = 0;
}

function extendTextArea(element) {
    element.style.height = "1px";
    element.style.height = (20 + element.scrollHeight) + "px";
}

function addTask(data) {
    activeProject.project.addTask(new task({title: data}))
}

export { addEventListeners }