import "./style.css";

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
    let hemmelig = "Hemmelig";

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
    this.getSecret = function() {
        return hemmelig;
    }
    this.modifySecret = function() {
        hemmelig += " |";
    }
};

let aa = new task ({
    title: "Navn",
     description: "Noe som må gjøres",
      dueDate: "2022-08-22"
    });

let bb = new task ({
    title: "Navn 2",
        description: "Noe som må gjøres",
        dueDate: "2022-08-22"
    });
    

console.log(aa);
aa.addCheckListItem("Sjekk");
console.log(aa.checkList[0]);
aa.checkList[0].toggle();
console.log(aa.checkList[0]);
aa.addNotes ("Notater kommer her");
console.log(aa.getNotes());
console.log(aa.notes);
console.log(aa);
console.log(aa.getSecret());
aa.modifySecret();
aa.modifySecret();
aa.modifySecret();
aa.modifySecret();
console.log(aa.getSecret());


console.log(bb.getSecret());
