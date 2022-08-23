import "./style.css";

const project = (name) => {
    const tasks = [];
    const addTask = (task) => {
        tasks.push(task);
    }
    return { name, tasks, addTask };
};

// const task = (title, description, dueDate, priority, checkList, notes) => {
const task = ({title, description, dueDate, priority = 2}) => {
    const checkList = [];
    let notes;
    function checkListItem(title) {
        this.title = title;
        this.isDone = false;
        this.toggle = function() {
            this.isDone = !this.isDone;
        }
    }
    // const checkListItem = (title) => {
    //     let isDone = false;
    //     const toggle = () => {
    //         console.log(this.isDone);
    //         isDone = !isDone; // få denne til å virke
    //         console.log(this.isDone);
    //     };
    //     return {title, isDone, toggle}
    // }
    const addCheckListItem = (title) => {
        // const item = checkListItem(title);
        const item = new checkListItem(title);
        checkList.push(item);
    };
    return { title, description, dueDate, priority, checkList, notes, addCheckListItem };
};
let aa = task ({
    title: "Navn",
     description: "Noe som må gjøres",
      dueDate: "2022-08-22"});

console.log(aa);
aa.addCheckListItem("Sjekk");
console.log(aa.checkList[0]);
aa.checkList[0].toggle();
console.log(aa.checkList[0]);