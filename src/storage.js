import { addProject, projects, task } from "./modules";

function saveToLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

function retrieveFromLocalStorage() {
    let result = JSON.parse(localStorage.getItem("projects"));
    if(!result) {
        addProject("Default project");
        return;
    } else {
        result.forEach(project => {
            addProject(project.name);
        });
        for(let i = 0; i < projects.length; i++) {
            for(let j = 0; j < result[i].tasks.length; j++) {
                projects[i].addTask(Object.assign(new task({title: "", description: "", dueDate: ""}), result[i].tasks[j]));
            }
        }
    }
}

export { saveToLocalStorage, retrieveFromLocalStorage }