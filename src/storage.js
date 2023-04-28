import { isUserSignedIn, writeToFirestore } from "./firebase";
import { addProject, projects, task } from "./modules";

function saveToFirestore(object) {
    writeToFirestore({ data: JSON.stringify(object) });
}

function saveToLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

function saveData(object) {
    if (isUserSignedIn()) {
        saveToFirestore(object);
    } else {
        saveToLocalStorage("projects", object);
    }
}

function retrieveData() {
    let result;
    if (isUserSignedIn()) {
        // result =
    } else {
        result = JSON.parse(localStorage.getItem("projects"));
        addData(result);
    }
}

function addData(data) {
    if (!data || data.length < 1) {
        addProject("Default project");
        return;
    } else {
        data.forEach((project) => {
            addProject(project.name);
        });
        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < data[i].tasks.length; j++) {
                projects[i].addTask(
                    Object.assign(
                        new task({ title: "", description: "", dueDate: "" }),
                        data[i].tasks[j]
                    )
                );
                projects[i].tasks[j].checkList = [];
                for (let k = 0; k < data[i].tasks[j].checkList.length; k++) {
                    projects[i].tasks[j].addCheckListItem("");
                    projects[i].tasks[j].checkList[k] = Object.assign(
                        projects[i].tasks[j].checkList[k],
                        data[i].tasks[j].checkList[k]
                    );
                }
            }
        }
    }
}

export { saveData, retrieveData, addData };
