import { addProject, projects, task } from "./modules";

function saveToLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

function retrieveFromLocalStorage() {
    let result = JSON.parse(localStorage.getItem("projects"));
    if(!result || result.length < 1) {
        addProject("Default project");
        return;
    } else {
        result.forEach(project => {
            addProject(project.name);
        });
        for(let i = 0; i < projects.length; i++) {
            for(let j = 0; j < result[i].tasks.length; j++) {
                projects[i].addTask(Object.assign(new task({title: "", description: "", dueDate: ""}), result[i].tasks[j]));
                projects[i].tasks[j].checkList = [];
                for(let k = 0; k < result[i].tasks[j].checkList.length; k++) {
                    projects[i].tasks[j].addCheckListItem("");
                    projects[i].tasks[j].checkList[k] = Object.assign(projects[i].tasks[j].checkList[k], result[i].tasks[j].checkList[k]);
                }
            }
        }
    }
}

export { saveToLocalStorage, retrieveFromLocalStorage }