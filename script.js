function SignUpForm(){
   document.getElementById("SignIn-Container").style.display = "none"
   document.getElementById("SignUp-Container").style.display = "flex"
}
function SignInForm(){
   document.getElementById("SignIn-Container").style.display = "flex"
   document.getElementById("SignUp-Container").style.display = "none"
}

function logOut(){
   document.getElementById("footer").style.display = "none";
   document.getElementById("SignIn-Container").style.display = "flex";
   document.getElementById("Home-Container").style.display = "none";
   document.getElementById("project-container").style.display = "none";
   document.getElementById("left-side-bar-Container").style.display = "none";
   document.getElementById("tasks-container").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
   updateDateTime();
   loadTasks();
   let isStudentCheckbox = document.getElementById("isStudent");
   let studentContainer = document.getElementById("student-Container");

   isStudentCheckbox.addEventListener("change", function () {
      studentContainer.style.display = this.checked ? "flex" : "none";
   });

   const projectCount = parseInt(document.getElementById("num-pro").textContent.trim());
   const studentCount = parseInt(document.getElementById("num-stu").textContent.trim());
   const taskCount = parseInt(document.getElementById("num-ts").textContent.trim());
   const finishedProjectCount = parseInt(document.getElementById("num-fp").textContent.trim());
   const canvas = document.getElementById("dashboardChart");
   if (canvas) {
      const ctx = canvas.getContext("2d");
      new Chart(ctx, {
         type: "bar",
         data: {
            labels: ["Projects", "Students", "Tasks", "Finished Projects"],
            datasets: [{
               label: "Count",
               data: [projectCount, studentCount, taskCount, finishedProjectCount],
               backgroundColor: [
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(153, 102, 255, 0.2)"
               ],
               borderColor: [
                  "rgba(75, 192, 192, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(153, 102, 255, 1)"
               ],
               borderWidth: 1
            }]
         },
         options: {
            responsive: true,
            scales: {
               y: {
                  beginAtZero: true
               }
            },
            plugins: {
               legend: {
                  labels: {
                     color: "white"
                  }
               }
            }
         }
      });
   } else {
      console.error("Error: Canvas element not found.");
   }
});

function homePage(){
   document.getElementById("SignIn-Container").style.display = "none";
   document.getElementById("SignUp-Container").style.display = "none";
   document.getElementById("footer").style.display = "flex";
   document.getElementById("left-side-bar-Container").style.display = "flex";
   document.getElementById("Home-Container").style.display = "flex";
   document.getElementById("Home").style.backgroundColor = "#027afd";
}
function activateButton(ID){
   document.getElementById(ID).style.backgroundColor = "#027afd";
   switch (ID){
      case "Home":
         document.getElementById("Projects").style.backgroundColor = "#444444";
         document.getElementById("Tasks").style.backgroundColor = "#444444";
         document.getElementById("Chat").style.backgroundColor = "#444444";
         document.getElementById("Home-Container").style.display = "flex";
         document.getElementById("project-container").style.display = "none";
         document.getElementById("tasks-container").style.display = "none";

         break;
      case "Tasks":
         document.getElementById("Home").style.backgroundColor = "#444444";
         document.getElementById("Projects").style.backgroundColor = "#444444";
         document.getElementById("Chat").style.backgroundColor = "#444444";
         document.getElementById("Home-Container").style.display = "none";
         document.getElementById("project-container").style.display = "none";
         document.getElementById("tasks-container").style.display = "flex";
         break;
      case "Chat":
         document.getElementById("Home").style.backgroundColor = "#444444";
         document.getElementById("Projects").style.backgroundColor = "#444444";
         document.getElementById("Tasks").style.backgroundColor = "#444444";
         document.getElementById("Home-Container").style.display = "none";
         document.getElementById("project-container").style.display = "none";
         document.getElementById("tasks-container").style.display = "none";

         break;
      case "Projects":
            document.getElementById("Home").style.backgroundColor = "#444444";
            document.getElementById("Tasks").style.backgroundColor = "#444444";
            document.getElementById("Chat").style.backgroundColor = "#444444";
            document.getElementById("Home-Container").style.display = "none";
            document.getElementById("project-container").style.display = "flex";
            document.getElementById("tasks-container").style.display = "none";
            break;
   }
}

function OpenSideBar() {
   let sidebar = document.getElementById("left-side-bar-Container");
   let computedStyle = window.getComputedStyle(sidebar).display;
   if (computedStyle === "none") {
      sidebar.style.display = "flex";
   } else {
      sidebar.style.display = "none";
   }
}

function updateDateTime() {
   const now = new Date();
   document.getElementById("welcome-date").textContent = (new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
}
setInterval(updateDateTime, 1000);

function AddNewProject() {
   document.getElementById("add-project").style.display = "flex";

}
function AddProject(){

}
function CloseAddP(){
   document.getElementById("add-project").style.display = "none";
}

async function loadTasks() {
   try {
      const response = await fetch("Data/tasks.json");
      const tasks = await response.json();

      let tableBody = document.getElementById("task-table-body");
      tableBody.innerHTML = "";

      tasks.forEach(task => {
         let row = document.createElement("tr");
         row.innerHTML = `
                <td>${task.id}</td>
                <td>${task.project}</td>
                <td>${task.task}</td>
                <td>${task.description}</td>
                <td>${task.assigned}</td>
                <td class="status ${task.status.toLowerCase().replace(" ", "-")}">${task.status}</td>
                <td>${task.due}</td>`;
         tableBody.appendChild(row);
      });

   } catch (error) {
      console.error("Error loading tasks:", error);
   }
}

function sortTasks() {
   let table = document.getElementById("task-table-body");
   let rows = Array.from(table.rows);
   let sortBy = document.getElementById("sort-tasks").value;
   rows.sort((a, b) => {
      let valueA, valueB;
      switch (sortBy) {
         case "status":
            valueA = a.querySelector(".status").textContent.trim();
            valueB = b.querySelector(".status").textContent.trim();
            let order = { "Completed": 1, "In Progress": 2, "Pending": 3 };
            return order[valueA] - order[valueB];

         case "name":
            valueA = a.cells[1].textContent.trim().toLowerCase();
            valueB = b.cells[1].textContent.trim().toLowerCase();
            return valueA.localeCompare(valueB);

         case "dueDate":
            valueA = new Date(a.cells[6].textContent.trim());
            valueB = new Date(b.cells[6].textContent.trim());
            return valueA - valueB;

         case "assignedStudent":
            valueA = a.cells[4].textContent.trim().toLowerCase();
            valueB = b.cells[4].textContent.trim().toLowerCase();
            return valueA.localeCompare(valueB);
      }
   });
   table.innerHTML = "";
   rows.forEach(row => table.appendChild(row));
}


