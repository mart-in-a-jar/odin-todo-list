import "./style.css";
import { addEventListeners } from "./gui";
import { retrieveFromLocalStorage } from "./storage";
import "@fortawesome/fontawesome-pro/js/all";



addEventListeners();
retrieveFromLocalStorage();





/////////// TESTING


/* let demoOppgave = new task({title: "Navn?"});
demoOppgave.addCheckListItem("Sjekk 1");
demoOppgave.addCheckListItem("Sjekk 2");
demoOppgave.addCheckListItem("Sjekk 3");
demoOppgave.checkList[1].toggle();
demoOppgave.description = "JALKjrfkeladnj jalkwej lakjaklwej jklawerj og hjawejakl !! \n aeaw \n\n\n\n\n aweawe"
demoOppgave.dueDate = "2022-09-09"

projects[0].addTask(demoOppgave); */



/* addProject("Prosjekt");

projects[0].addTask(
    new task ({
    title: "Navn",
     description: "Noe som må gjøres",
      dueDate: new Date(2022, 7, 25)
    })
);

projects[0].addTask(
    new task ({
    title: "Navn 2",
        description: "Noe som må gjøres",
        dueDate: "2022-08-22"
    })
);
    

console.log(projects[0]);
projects[0].tasks[0].addCheckListItem("Sjekk");
console.log(projects[0].tasks[0].checkList[0]);
projects[0].tasks[0].checkList[0].toggle();
console.log(projects[0].tasks[0].checkList[0]);
projects[0].tasks[0].addNotes ("Notater kommer her");
console.log(projects[0].tasks[0].getNotes());
console.log(projects[0].tasks[0].notes);
console.log(projects[0].tasks[0]);


console.log(format(projects[0].tasks[0].dueDate, "dd.MM.yyyy")); */

/* const dateInput = document.querySelector("#dato");
dateInput.addEventListener("change", () => {
    if (dateInput.value) {
        console.log(format(dateInput.valueAsDate, "dd.MM.yyyy"));
    }
}); */