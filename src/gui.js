import { addProject, projects, task } from "./modules";
import { saveToLocalStorage } from "./storage";

const addProjectButton = document.querySelector("#addProject");
const addProjectModal = document.querySelector(".addProjectModal");
const addTaskModal = document.querySelector(".addTaskModal");
const backDrop = document.querySelector(".blur");
const newTask = document.querySelector("#newTask");
const taskModal = document.querySelector(".taskModal");

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

    newTask.addEventListener("click", () => {
        toggleModal(addTaskModal);
    })

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

    addTaskModal.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask(e.target.value);
            populateTasks.all();
            toggleModal(addTaskModal);
        } else if (e.key === "Escape") {
            toggleModal(addTaskModal);
        }
    });

    window.addEventListener("keypress", (e) => {
        // Don't fire if backdrop (ie any modal) is active
        if (!document.querySelector(".blur.active") && e.code === "KeyN") {
            toggleModal(addTaskModal);
        };
    });

    document.addEventListener("DOMContentLoaded", () => {
        populateProjects();
        setInitialActiveProject();
        populateTasks.all();
    });

    newTask.addEventListener("click", () => {

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

    populateTasks.all();
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

const populateTasks = (() => {
    function writeTasks(tasks) {
        const taskList = document.querySelector(".main .tasks");
        taskList.textContent = "";
        tasks.forEach(task => {
            const taskBox = document.createElement("div");
            taskBox.classList.add("task");
            taskBox.dataset.taskNumber = activeProject.project.tasks.indexOf(task);
            taskBox.innerHTML = `<article>
            <h3>${task.title}</h3>
            <p>${task.description || ""}</p>
        </article>
        <div class="buttons">
            <a href=""><i class="fa-solid fa-square-check fa-2xl"></i></a>
        </div>`
        taskBox.addEventListener("click", taskEdit.show);
        taskList.appendChild(taskBox);
        });
    }
    function all() {
        let tasks = activeProject.project.getTasks.active();
        writeTasks(tasks);
    }

    return { all }
})();

const taskEdit = (() => {

    function show() {
        let task = activeProject.project.tasks[this.dataset.taskNumber];
        taskModal.textContent = "";
        taskModal.innerHTML = `<div class="taskCard">
        <div class="task leftSide">
            <div class="task title">
                <i class="fa-solid fa-square-check fa-2xl"></i>
                <div class="checkMark"></div>
                <input type="text" value="${task.title}">
            </div>
            <div class="task checkList">
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
                    <option value="2" selected>2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="task notes">
                <button>Notes</button>
            </div>
        </div>
</div>`

        const titleInput = document.querySelector(".task.title input");
        const descriptionInput = document.querySelector(".taskCard textarea");
        const dateInput = document.querySelector("#taskDueDate");

        let checkList = document.querySelector(".task.checkList");
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
            wrapper.append(box, title);
            checkList.appendChild(wrapper);
        });

        // Auto extend text area
        descriptionInput.addEventListener("keyup", (e) => {
            extendTextArea(e.target);
        });

        titleInput.addEventListener("blur", e => {
            scrollLeft(e.target);
        });
        titleInput.addEventListener("focus", e => {
            e.target.selectionStart = e.target.value.length;
        });


        dateInput.addEventListener("change", (e) => {
            console.log(e.target.value);
        });

        toggleModal(taskModal);
        extendTextArea(descriptionInput);


    
    }

    
    
    return { show }
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

////
// toggleModal(addProjectModal);

document.querySelector("#save").addEventListener("click", () => {
    saveToLocalStorage("projects", projects);
    console.log(projects);
});

document.querySelector("#addTask").addEventListener("click", () => {
    let no = prompt("Proj. no");
    projects[no].addTask(new task(
        {
        title: "Navn",
         description: "Noe som må gjøres",
          dueDate: new Date(2022, 7, 25)
        }
        ));
});

