import { isToday, isThisWeek } from "date-fns";

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
            return tasks.filter(task => !task.complete).sort((a, b) => {
                return a.priority < b.priority ? -1 : 1; 
            });
        }
        const today = () => {
            return active().filter(task => isToday(new Date(task.dueDate)))
        }
        const thisWeek = () => {
            return active().filter(task => isThisWeek(new Date(task.dueDate), { weekStartsOn: 1 }));
        }
        const completed = () => {
            return tasks.filter(task => task.complete);
        }
        const search = (string) => {
            return tasks.filter(task => task.title.includes(string));
        }
        return { all, active, today, thisWeek, completed, search }
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

    this.toggle = function() {
        this.complete = !this.complete;
    }

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