const projects = [];

function addProject(name) {
    projects.push(project(name));
}

const project = (name) => {
    const tasks = [];
    const addTask = (task) => {
        tasks.push(task);
    }
    const getTasks = (() => {
        const all = () => {
            return tasks;
        }
        const active = () => {
            return tasks.filter(task => task.complete === false);
        }
        const today = () => {

        }
        const completed = () => {

        }
        return { all, active, today, completed }
    })()
    return { name, tasks, addTask, getTasks };
};

function task({title, description, dueDate, priority = 2}) {
    this.checkList = [];
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;

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