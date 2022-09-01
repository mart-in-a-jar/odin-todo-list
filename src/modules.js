const projects = [];

function addProject(name) {
    projects.push(project(name));
}

const project = (name) => {
    const tasks = [];
    const addTask = (task) => {
        tasks.push(task);
    }
    return { name, tasks, addTask };
};

function task({title, description, dueDate, priority = 2}) {
    this.checkList = [];
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

    function CheckListItem(title) {
        this.title = title;
        this.isDone = false;
        this.toggle = function() {
            this.isDone = !this.isDone;
        }
    }
    this.addCheckListItem = function(title) {
        const item = new CheckListItem(title);
        this.checkList.push(item);
    };
    this.addNotes = function(text) {
        this.notes = text;
    }
    this.getNotes = function() {
        return this.notes;
    }
};



export { addProject, task, projects }