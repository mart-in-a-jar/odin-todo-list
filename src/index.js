import "./style.css";

const project = (name) => {
    const tasks = [];
    const addTask = (task) => {
        tasks.push(task);
    }
    return { name, tasks, addTask };
};

const task = ({title, description, dueDate, priority = 2}) => {
    const checkList = [];
    let notes;
    function CheckListItem(title) {
        this.title = title;
        this.isDone = false;
        this.toggle = function() {
            this.isDone = !this.isDone;
        }
    }
    const addCheckListItem = (title) => {
        const item = new CheckListItem(title);
        checkList.push(item);
    };
    const addNotes = (text) => {
        notes = text;
    }
    function getNotes() {
        console.log(notes)
        return this.notes;
    }
    return { title, description, dueDate, priority, checkList, notes, addCheckListItem, addNotes, getNotes };
};


let aa = task ({
    title: "Navn",
     description: "Noe som må gjøres",
      dueDate: "2022-08-22"
    });

console.log(aa);
aa.addCheckListItem("Sjekk");
console.log(aa.checkList[0]);
aa.checkList[0].toggle();
console.log(aa.checkList[0]);
aa.notes = "Notater kommer her";
// console.log(aa.notes);
console.log(aa.getNotes());
console.log(aa.notes)

