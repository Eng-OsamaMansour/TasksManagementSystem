let selectedProjectItem = null;
let activeContact = null;
let loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") ||
    "null"
);

let studentRole = false;
document.addEventListener("DOMContentLoaded", function () {
   let isStudentCheckbox = document.getElementById("isStudent");
   let studentContainer = document.getElementById("student-Container");

   isStudentCheckbox.addEventListener("change", function () {
      studentContainer.style.display = this.checked ? "flex" : "none";
   });
   generateLargeTestData();
   updateDateTime();
   loadData();


});
function studentSite(){
   document.getElementById("number-of-students").style.display = "none";
   document.getElementById("addProject").style.display = "none";
   document.getElementById("control-container").style.gridTemplateColumns = "auto 150px";
   document.getElementById("new-task-btn").style.display = "none";
}
function SignUpForm(){
   document.getElementById("SignIn-Container").style.display = "none"
   document.getElementById("SignUp-Container").style.display = "flex"
}
function SignInForm(){
   document.getElementById("SignIn-Container").style.display = "flex"
   document.getElementById("SignUp-Container").style.display = "none"
}
function signUp() {
   const username = document.getElementById("Sign-Up-username").value.trim();
   const password = document.getElementById("Sign-Up-password").value.trim();
   const isStudent = document.getElementById("isStudent").checked;
   const role = isStudent ? "student" : "admin";
   if (!username || !password) {
      alert("Please enter a username and password.");
      return;
   }
   let users = JSON.parse(localStorage.getItem("users")) || [];
   if (users.some(user => user.username === username)) {
      alert("Username already taken.");
      return;
   }
   const newUser = {
      id: users.length + 1,
      username: username,
      password: password,
      role: role
   };
   users.push(newUser);
   localStorage.setItem("users", JSON.stringify(users));
   alert("Sign-up successful! You can now sign in.");
   document.getElementById("SignIn-Container").style.display = "flex"
   document.getElementById("SignUp-Container").style.display = "none"
}
function signIn() {
   const username = document.getElementById("username").value.trim();
   const password = document.getElementById("password").value.trim();
   let users = JSON.parse(localStorage.getItem("users")) || [];
   const user = users.find(u => u.username === username && u.password === password);
   if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      loggedInUser = user;
      if(user.role === "student"){
         studentRole = true;
         studentSite();
      }
      document.getElementById("user-name").innerHTML=`${user.role}  ${user.username} `;
      homePage();
      displayChart();
      displayDashboard();
      displayProjects();
      loadTasks()
   } else {
      alert("Invalid username or password.");
   }
}
function logOut(){
   localStorage.removeItem("loggedInUser");
   alert("You have been logged out.");
   location.reload();
   document.getElementById("footer").style.display = "none";
   document.getElementById("SignIn-Container").style.display = "flex";
   document.getElementById("Home-Container").style.display = "none";
   document.getElementById("project-container").style.display = "none";
   document.getElementById("left-side-bar-Container").style.display = "none";
   document.getElementById("tasks-container").style.display = "none";
   document.getElementById("chat-container").style.display = "none";
}
function displayDashboard(){
   let projects = JSON.parse(localStorage.getItem("projects")) || [];
   let users = JSON.parse(localStorage.getItem("users")) || [];
   let students = users.filter(user => user.role === "student");
   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
   let finished = projects.filter(project => project.status === "Completed");
   let studentProjects = projects.filter(project => project.students.includes(loggedInUser.username));
   let studentFinished = studentProjects.filter(project => project.status === "Completed");
   let studentTask = tasks.filter(task => task.assigned === loggedInUser.username);
   if(!studentRole){
      document.getElementById("num-pro").innerHTML = `${projects.length}`;
      document.getElementById("num-stu").innerHTML = `${students.length}`;
      document.getElementById("num-fp").innerHTML = `${finished.length}`;
      document.getElementById("num-ts").innerHTML = `${tasks.length}`;
   }else{
      document.getElementById("num-pro").innerHTML = `${studentProjects.length}`;
      document.getElementById("num-fp").innerHTML = `${studentFinished.length}`;
      document.getElementById("num-ts").innerHTML = `${studentTask.length}`;
   }

}
function displayChart(){
   let projects = JSON.parse(localStorage.getItem("projects")) || [];
   let users = JSON.parse(localStorage.getItem("users")) || [];
   let students = users.filter(user => user.role === "student");
   let finished = projects.filter(project => project.status === "Completed");
   let studentProjects = projects.filter(project => project.students.includes(loggedInUser.username));
   let studentFinished = studentProjects.filter(project => project.status === "Completed");
   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
   let studentTask = tasks.filter(task => task.assignedStudent === loggedInUser.username);

   const projectCount = projects.length;
   const studentCount = students.length;
   const taskCount = tasks.length;
   const finishedProjectCount = finished.length;
   const studentProjectCount = studentProjects.length;
   const studentTaskCount = studentTask.length;
   const studentFinishedProjectCount = studentFinished.length;
   const canvas = document.getElementById("dashboardChart");
   if (canvas && !studentRole) {
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
      if(canvas && studentRole){
         const ctx = canvas.getContext("2d");
         new Chart(ctx, {
            type: "bar",
            data: {
               labels: ["Projects", "Tasks", "Finished Projects"],
               datasets: [{
                  label: "Count",
                  data: [studentProjectCount, studentTaskCount, studentFinishedProjectCount],
                  backgroundColor: [
                     "rgba(75, 192, 192, 0.2)",
                     "rgba(255, 206, 86, 0.2)",
                     "rgba(153, 102, 255, 0.2)"
                  ],
                  borderColor: [
                     "rgba(75, 192, 192, 1)",
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
      }
   }
}
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
         document.getElementById("chat-container").style.display = "none";

         break;
      case "Tasks":
         document.getElementById("Home").style.backgroundColor = "#444444";
         document.getElementById("Projects").style.backgroundColor = "#444444";
         document.getElementById("Chat").style.backgroundColor = "#444444";
         document.getElementById("Home-Container").style.display = "none";
         document.getElementById("project-container").style.display = "none";
         document.getElementById("tasks-container").style.display = "flex";
         document.getElementById("chat-container").style.display = "none";
         break;
      case "Chat":
         document.getElementById("Home").style.backgroundColor = "#444444";
         document.getElementById("Projects").style.backgroundColor = "#444444";
         document.getElementById("Tasks").style.backgroundColor = "#444444";
         document.getElementById("Home-Container").style.display = "none";
         document.getElementById("project-container").style.display = "none";
         document.getElementById("tasks-container").style.display = "none";
         document.getElementById("chat-container").style.display = "flex";
         loadContacts();

         break;
      case "Projects":
            document.getElementById("Home").style.backgroundColor = "#444444";
            document.getElementById("Tasks").style.backgroundColor = "#444444";
            document.getElementById("Chat").style.backgroundColor = "#444444";
            document.getElementById("Home-Container").style.display = "none";
            document.getElementById("project-container").style.display = "flex";
            document.getElementById("tasks-container").style.display = "none";
            document.getElementById("chat-container").style.display = "none";
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
function loadData() {
   let studentSelect = document.getElementById("project-students");
   let studentSelect2 = document.getElementById("assignedStudent");
   let projectSelect = document.getElementById("project-name");
   studentSelect.innerHTML = "";
   studentSelect2.innerHTML = "";
   projectSelect.innerHTML = "";
   let users = JSON.parse(localStorage.getItem("users")) || [];
   let projects = JSON.parse(localStorage.getItem("projects")) || [];
   let students = users.filter(user => user.role === "student");
   students.forEach(student => {
      let option = document.createElement("option");
      option.value = student.username;
      option.textContent = student.username;
      studentSelect.appendChild(option);
   });
   students.forEach(student => {
      let option = document.createElement("option");
      option.value = student.username;
      option.textContent = student.username;
      studentSelect2.appendChild(option);
   });
   projects.forEach(project => {
      let option = document.createElement("option");
      option.value = project.title;
      option.textContent = project.title;
      projectSelect.appendChild(option);
   });

}
function addProject() {
   let title = document.getElementById("project-title").value.trim();
   let description = document.getElementById("project-description").value.trim();
   let students = Array.from(document.getElementById("project-students").selectedOptions).map(opt => opt.value);
   let category = document.getElementById("project-category").value;
   let startDate = document.getElementById("project-start-date").value;
   let endDate = document.getElementById("project-end-date").value;
   let status = document.getElementById("project-status").value;
   if (!title || !description || students.length === 0 || !category || !startDate || !endDate || !status) {
      alert("Please fill in all fields.");
      return;
   }
   let projects = JSON.parse(localStorage.getItem("projects")) || [];
   let newProject = {
      id: projects.length + 1,
      title: title,
      description: description,
      students: students,
      category: category,
      startDate: startDate,
      endDate: endDate,
      status: status
   };
   projects.push(newProject);
   localStorage.setItem("projects", JSON.stringify(projects));
   alert("Project added successfully!");
   CloseAddP();
   displayProjects();
}
function getProgressPercentage(status) {
   switch (status) {
      case "Pending": return 25;
      case "In Progress": return 50;
      case "On Hold": return 75;
      case "Completed": return 100;
      case "Cancelled": return 0;
      default: return 0;
   }
}
function displayProjects() {
   let projectContainer = document.querySelector(".project-list");
   projectContainer.innerHTML = "";
   let adminProjects = JSON.parse(localStorage.getItem("projects")) || [];
   if(studentRole){
       adminProjects = adminProjects.filter(project => project.students.includes(loggedInUser.username));
   }
   let users = JSON.parse(localStorage.getItem("users")) || [];
   adminProjects.forEach(project => {
      let studentNames = project.students
          .map((username) => {
             let student = users.find(user => user.username === username && user.role === "student");
             return student ? student.username : "Unknown";
          })
          .join(", ");
      let progressPercentage = getProgressPercentage(project.status);
      let projectElement = document.createElement("div");
      projectElement.classList.add("project-item");
      projectElement.innerHTML = `
            <div class="project-title">
                <h2>${project.title}</h2>
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="students">
                <p><b>Students:</b> ${studentNames}</p>
            </div>
            <div class="category">
                <p><b>Category:</b> ${project.category}</p>
            </div>
            <div class="progress-container">
                <span class="start-date">${project.startDate}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%;">${progressPercentage}%</div>
                </div>
                <span class="end-date">${project.endDate}</span>
            </div>
        `;
      projectElement.addEventListener("click", function() {
         if (selectedProjectItem && selectedProjectItem !== this) {
            selectedProjectItem.style.border = "1px solid #027afd";
         }
         this.style.border = "2px solid orange";
         selectedProjectItem = this;
         displayProjectInfo(project);
      });
      projectElement.addEventListener("mouseenter", function() {
         if (this !== selectedProjectItem) {
            this.style.border = "1px solid #027afd";
         }
      });
      projectElement.addEventListener("mouseleave", function() {
         if (this !== selectedProjectItem) {
            this.style.border = "1px solid #838383";
         }
      });
      projectContainer.appendChild(projectElement);
   });
}
function displayProjectInfo(project) {
   const projectInfoContainer = document.getElementById("project-info-container");
   projectInfoContainer.style.display = "flex";
   const infoDiv = projectInfoContainer.querySelector(".info");
   document.getElementById("project-info-title").innerHTML = `${project.title}`;
   infoDiv.innerHTML = `
      <p><span>Description: </span>${project.description}</p>
      <p><span>Category: </span>${project.category}</p>
      <p><span>Students: </span>${Array.isArray(project.students) ? project.students.join(", ") : project.students}</p>
      <p><span>Start Date: </span>${project.startDate}</p>
      <p><span>Ending Date: </span>${project.endDate}</p>
      <p><span>Project Status:</span> ${project.status}</p>
   `;
   const tasksInfoContainer = document.getElementById("tasks-info-container");
   tasksInfoContainer.innerHTML = `
      <div class="info-title">
         <h1>Tasks</h1>
      </div>
   `;
   const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
   const projectTasks = allTasks.filter(task => task.project === project.title);
   projectTasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("tasks-info-item");
      taskItem.innerHTML = `
         <h4>Task ID: <span class="task-id">${task.id}</span></h4>
         <h4>Task Name: <span class="task-name">${task.task}</span></h4>
         <h4>Task Description: <span class="task-description">${task.description}</span></h4>
         <h4>Task Assigned: <span class="task-assigned">${task.assigned}</span></h4>
         <h4>Task Status: <span class="task-status">${task.status}</span></h4>
      `;
      tasksInfoContainer.appendChild(taskItem);
   });
}
document.addEventListener("DOMContentLoaded", function () {
   let searchInput = document.getElementById("search-input");
   if (searchInput) {
      searchInput.addEventListener("input", function () {
         searchProjects(this.value.trim().toLowerCase());
      });
   } else {
      console.error("Element with ID 'search-input' not found.");
   }
});
function searchProjects(query) {
   let projects;
   if(studentRole){
      let dummy = JSON.parse(localStorage.getItem("projects")) || [];
      let studentProjects = dummy.filter(project => project.students.includes(loggedInUser.username)) || [];
      projects = studentProjects.filter(project => project.students.includes(loggedInUser.username) || []);
   }else{
      projects = JSON.parse(localStorage.getItem("projects")) || [];
   }
   let projectContainer = document.querySelector(".project-list");
   projectContainer.innerHTML = "";
   let filteredProjects = projects.filter(project =>
       project.title.toLowerCase().includes(query) ||
       project.description.toLowerCase().includes(query)
   );

   filteredProjects.forEach(project => {
      let progressPercentage = getProgressPercentage(project.status);
      let studentNames = Array.isArray(filteredProjects.students) ? project.students.join(", ") : project.students
      let projectElement = document.createElement("div");
      projectElement.classList.add("project-item");
      projectElement.innerHTML = `
            <div class="project-title">
                <h2>${project.title}</h2>
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="students">
                <p><b>Students:</b> ${studentNames}</p>
            </div>
            <div class="category">
                <p><b>Category:</b> ${project.category}</p>
            </div>
            <div class="progress-container">
                <span class="start-date">${project.startDate}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%;">${progressPercentage}%</div>
                </div>
                <span class="end-date">${project.endDate}</span>
            </div>
        `;
      projectElement.addEventListener("click", function() {
         if (selectedProjectItem && selectedProjectItem !== this) {
            selectedProjectItem.style.border = "1px solid #027afd";
         }
         this.style.border = "2px solid orange";
         selectedProjectItem = this;
         displayProjectInfo(project);
      });
      projectElement.addEventListener("mouseenter", function() {
         if (this !== selectedProjectItem) {
            this.style.border = "1px solid #027afd";
         }
      });
      projectElement.addEventListener("mouseleave", function() {
         if (this !== selectedProjectItem) {
            this.style.border = "1px solid #838383";
         }
      });
      projectContainer.appendChild(projectElement);
   });
}
document.addEventListener("DOMContentLoaded", function () {
   let filterElement = document.getElementById("filter");
   if (filterElement) {
      filterElement.addEventListener("change", function () {
         filterProjects(this.value);
      });
   } else {
      console.error("Element with ID 'filter' not found.");
   }
});
function filterProjects(status) {
   let projects;
   if(studentRole){
      let dummy = JSON.parse(localStorage.getItem("projects")) || [];
      let studentProjects = dummy.filter(project => project.students.includes(loggedInUser.username)) || [];
      projects = studentProjects.filter(project => project.students.includes(loggedInUser.username) || []);
   }else{
      projects = JSON.parse(localStorage.getItem("projects")) || [];
   }
   let projectContainer = document.querySelector(".project-list");
   projectContainer.innerHTML = "";
   let filteredProjects = status === "All Statuses" ? projects : projects.filter(p => p.status === status);
   filteredProjects.forEach(project => {
      let progressPercentage = getProgressPercentage(project.status);
      let projectElement = document.createElement("div");
      let studentNames = Array.isArray(project.students) ? project.students.join(", ") : project.students
      projectElement.classList.add("project-item");
      projectElement.innerHTML = `
            <div class="project-title">
                <h2>${project.title}</h2>
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="students">
                <p><b>Students:</b> ${studentNames}</p>
            </div>
            <div class="category">
                <p><b>Category:</b> ${project.category}</p>
            </div>
            <div class="progress-container">
                <span class="start-date">${project.startDate}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%;">${progressPercentage}%</div>
                </div>
                <span class="end-date">${project.endDate}</span>
            </div>
        `;
      projectElement.addEventListener("click", function() {
         if (selectedProjectItem && selectedProjectItem !== this) {
            selectedProjectItem.style.border = "1px solid #027afd";
         }
         this.style.border = "2px solid orange";
         selectedProjectItem = this;
         displayProjectInfo(project);
      });
      projectElement.addEventListener("mouseenter", function() {
         if (this !== selectedProjectItem) {
            this.style.border = "1px solid #027afd";
         }
      });
      projectElement.addEventListener("mouseleave", function() {
         if (this !== selectedProjectItem) {
            this.style.border = "1px solid #838383";
         }
      });
      projectContainer.appendChild(projectElement);
   });
}
function CloseAddP(){
   document.getElementById("add-project").style.display = "none";
}
function CloseProInfo() {
   document.getElementById("project-info-container").style.display = "none";
   document.querySelectorAll(".project-item").forEach(item => {
      item.style.border = "1px solid #838383";
   });
}
function loadTasks() {
   let tasks;
   if (studentRole) {
      let dummy = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = dummy.filter(task => task.assigned === loggedInUser.username);
      alert("Student");
   } else {
      alert("Admin");
      tasks = JSON.parse(localStorage.getItem("tasks")) || [];
   }
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
         <td>${task.due}</td>
      `;
      tableBody.appendChild(row);
   });
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
function openCreT(){
   document.getElementById("task-create-container").style.display = "flex";
}
function closeCreT(){
   document.getElementById("task-create-container").style.display = "none";
}
function addTask() {
   const projectName = document.getElementById("project-name").value;
   const taskName = document.getElementById("task-name").value.trim();
   const description = document.getElementById("description").value.trim();
   const assignedStudent = document.getElementById("assignedStudent").value;
   const status = document.getElementById("status").value;
   const dueDate = document.getElementById("dueDate").value;
   if (!taskName || !description || !dueDate || !projectName || !assignedStudent || !status) {
      alert("Please fill out the required fields.");
      return;
   }
   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
   let newTask = {
      id: tasks.length + 1,
      project: projectName,
      task: taskName,
      description: description,
      assigned: assignedStudent,
      status: status,
      due: dueDate
   };
   tasks.push(newTask);
   localStorage.setItem("tasks", JSON.stringify(tasks));
   alert("Task added successfully!");
   closeCreT();
   loadTasks();
}
function loadContacts() {
   const contactsContainer = document.getElementById("contacts");
   contactsContainer.innerHTML = "";
   if (!loggedInUser) {
      return;
   }
   const allUsers = JSON.parse(localStorage.getItem("users")) || [];
   let filteredUsers;
   if (loggedInUser.role === "admin") {
      filteredUsers = allUsers.filter(u => u.role === "student");
       document.getElementById("contacts-list-header").innerHTML = "";
       document.getElementById("contacts-list-header").innerHTML = "List of Students";
   } else {
       document.getElementById("contacts-list-header").innerHTML = "";
       document.getElementById("contacts-list-header").innerHTML = "List of Admins";
      filteredUsers = allUsers.filter(u => u.role === "admin");
   }
   filteredUsers.forEach(user => {
      const contactDiv = document.createElement("div");
      contactDiv.classList.add("contact-username");
      contactDiv.onclick = () => selectContact(user.username);
      const span = document.createElement("span");
      span.textContent = user.username;
      contactDiv.appendChild(span);
      contactsContainer.appendChild(contactDiv);
   });
}
function loadMessages() {
   const messagesContainer = document.getElementById("messages-container");
   messagesContainer.innerHTML = "";
   let allMessages = JSON.parse(localStorage.getItem("messages")) || [];
   let chatMessages = allMessages.filter(msg => {
      return (
          (msg.from === loggedInUser.username && msg.to === activeContact) ||
          (msg.from === activeContact && msg.to === loggedInUser.username)
      );
   })
   chatMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
   chatMessages.forEach(msg => {
      let messageDiv = document.createElement("div");
      messageDiv.classList.add("messages");
      if (msg.from === loggedInUser.username) {
         messageDiv.innerHTML = `<span class="sender">${msg.text}</span>`;
      } else {
         messageDiv.innerHTML = `<span class="receiver">${msg.text}</span>`;
      }
      messagesContainer.appendChild(messageDiv);
   });
}

function sendMessage() {
   const messageInput = document.getElementById("message-input");
   const messageText = messageInput.value.trim();
   if (!activeContact) {
      alert("Please select a contact first.");
      return;
   }
   if (!messageText) {
      alert("Please type a message.");
      return;
   }
   const newMessage = {
      from: loggedInUser.username,
      to: activeContact,
      text: messageText,
      timestamp: new Date().toISOString()
   };
   let allMessages = JSON.parse(localStorage.getItem("messages")) || [];
   allMessages.push(newMessage);
   localStorage.setItem("messages", JSON.stringify(allMessages));
   messageInput.value = "";
   loadMessages();
}
function selectContact(contactUsername) {
   activeContact = contactUsername;
   document.getElementById("active-contact").textContent = contactUsername;
   loadMessages();
}

function generateLargeTestData() {
   // Prevent multiple generations
   if (localStorage.getItem("largeTestDataGenerated")) {
      console.log("Large test data has already been generated.");
      return;
   }

   // --- USERS ---

   // 10 realistic admin names
   const adminNames = [
      "John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "William Brown",
      "Olivia Wilson", "James Taylor", "Sophia Anderson", "Robert Thomas", "Isabella Martinez"
   ];

   // 40 realistic student names
   const studentNames = [
      "Liam Miller", "Noah Garcia", "Oliver Rodriguez", "Elijah Martinez", "William Hernandez",
      "James Lopez", "Benjamin Gonzalez", "Lucas Wilson", "Henry Anderson", "Alexander Thomas",
      "Mason Taylor", "Michael Moore", "Ethan Jackson", "Daniel Martin", "Jacob Lee",
      "Logan Perez", "Jackson Thompson", "Sebastian White", "Jack Harris", "Aiden Sanchez",
      "Owen Clark", "Samuel Ramirez", "Matthew Lewis", "Joseph Robinson", "Levi Walker",
      "Mateo Young", "David Allen", "John King", "Wyatt Wright", "Carter Scott",
      "Julian Torres", "Luke Nguyen", "Grayson Hill", "Isaac Flores", "Jayden Green",
      "Theodore Adams", "Gabriel Nelson", "Anthony Baker", "Dylan Hall", "Leo Rivera"
   ];

   const users = [];
   // Create admin users
   adminNames.forEach((name, index) => {
      users.push({
         id: index + 1,
         username: name.toLowerCase().replace(/ /g, ""),
         password: "admin" + (index + 1),
         role: "admin"
      });
   });
   // Create student users
   studentNames.forEach((name, index) => {
      users.push({
         id: adminNames.length + index + 1,
         username: name.toLowerCase().replace(/ /g, ""),
         password: "student" + (index + 1),
         role: "student"
      });
   });

   // --- PROJECTS ---

   const categories = ["Web Development", "Mobile App Development", "Cybersecurity", "Cloud Computing", "Artificial Intelligence", "Data Science", "Internet of Things", "Embedded Systems", "Digital Marketing", "E-commerce", "Blockchain"];
   const statuses = ["In Progress", "Pending", "Completed", "On Hold", "Cancelled"];
   // Some words to generate more realistic project titles and descriptions
   const adjectives = ["Innovative", "Modern", "Dynamic", "Cutting-Edge", "Advanced", "Scalable", "Efficient", "Robust", "Interactive", "Responsive"];
   const nouns = ["Solution", "Platform", "System", "Application", "Framework", "Interface", "Network", "Tool", "Module", "Service"];
   const projects = [];

   for (let i = 0; i < 100; i++) {
      const title = `Project ${i + 1}: ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
      const description = `This project focuses on developing a ${title.toLowerCase()} aimed at improving user engagement and operational efficiency.`;

      // Randomly choose between 1 and 5 students from the studentNames list
      const numStudents = Math.floor(Math.random() * 5) + 1;
      const assignedStudents = [];
      while (assignedStudents.length < numStudents) {
         const randomStudent = studentNames[Math.floor(Math.random() * studentNames.length)].toLowerCase().replace(/ /g, "");
         if (!assignedStudents.includes(randomStudent)) {
            assignedStudents.push(randomStudent);
         }
      }

      // Generate random dates in 2023
      const start = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const end = new Date(start.getTime() + (Math.floor(Math.random() * 90) + 30) * 24 * 60 * 60 * 1000); // 30 to 120 days later

      projects.push({
         id: i + 1,
         title: title,
         description: description,
         students: assignedStudents,
         category: categories[Math.floor(Math.random() * categories.length)],
         startDate: start.toISOString().split("T")[0],
         endDate: end.toISOString().split("T")[0],
         status: statuses[Math.floor(Math.random() * statuses.length)]
      });
   }

   // --- TASKS ---

   const taskStatuses = ["In Progress", "Pending", "Completed", "On Hold", "Cancelled"];
   const tasks = [];
   for (let i = 0; i < 200; i++) {
      // Randomly assign a project from the projects array
      const randomProject = projects[Math.floor(Math.random() * projects.length)];
      const taskTitle = `Task ${i + 1}: ${nouns[Math.floor(Math.random() * nouns.length)]} Implementation`;
      const taskDescription = `Implement a critical component of the project "${randomProject.title}".`;

      // Randomly choose one student from the project's assigned students (if any)
      let assignedUser = "";
      if (randomProject.students.length > 0) {
         assignedUser = randomProject.students[Math.floor(Math.random() * randomProject.students.length)];
      } else {
         assignedUser = studentNames[Math.floor(Math.random() * studentNames.length)].toLowerCase().replace(/ /g, "");
      }

      // Generate a due date sometime after the project's start date
      const projectStart = new Date(randomProject.startDate);
      const due = new Date(projectStart.getTime() + (Math.floor(Math.random() * 60) + 15) * 24 * 60 * 60 * 1000);

      tasks.push({
         id: i + 1,
         project: randomProject.title,
         task: taskTitle,
         description: taskDescription,
         assigned: assignedUser,
         status: taskStatuses[Math.floor(Math.random() * taskStatuses.length)],
         due: due.toISOString().split("T")[0]
      });
   }

   // --- CHAT MESSAGES ---

   // We'll generate 100 chat messages between random admins and students.
   const sampleTexts = [
      "Please review the latest updates.",
      "Can you update the project status?",
      "I have completed my task.",
      "Let's schedule a meeting.",
      "Need more details on the requirements.",
      "The deadline is approaching.",
      "Great work on the project!",
      "I will get back to you soon.",
      "Can we discuss this further?",
      "Thank you for your prompt response."
   ];
   const messages = [];
   for (let i = 0; i < 100; i++) {
      // Randomly choose sender type: admin or student
      const isAdminSender = Math.random() < 0.5;
      let from, to;
      if (isAdminSender) {
         from = adminNames[Math.floor(Math.random() * adminNames.length)].toLowerCase().replace(/ /g, "");
         to = studentNames[Math.floor(Math.random() * studentNames.length)].toLowerCase().replace(/ /g, "");
      } else {
         from = studentNames[Math.floor(Math.random() * studentNames.length)].toLowerCase().replace(/ /g, "");
         to = adminNames[Math.floor(Math.random() * adminNames.length)].toLowerCase().replace(/ /g, "");
      }
      // Generate a random timestamp in 2023
      const randomTime = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
      messages.push({
         from: from,
         to: to,
         text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
         timestamp: randomTime.toISOString()
      });
   }

   // Save all generated data to localStorage
   localStorage.setItem('users', JSON.stringify(users));
   localStorage.setItem('projects', JSON.stringify(projects));
   localStorage.setItem('tasks', JSON.stringify(tasks));
   localStorage.setItem('messages', JSON.stringify(messages));
   localStorage.setItem('largeTestDataGenerated', 'true');

   // --- Generate a human-readable text file for testers ---
   let content = "LARGE TEST DATA FOR WEBSITE\n";
   content += "============================\n\n";

   content += "USERS:\n";
   users.forEach(user => {
      content += `ID: ${user.id}, Username: ${user.username}, Password: ${user.password}, Role: ${user.role}\n`;
   });
   content += "\n";

   content += "PROJECTS:\n";
   projects.forEach(project => {
      content += `ID: ${project.id}\n`;
      content += `Title: ${project.title}\n`;
      content += `Description: ${project.description}\n`;
      content += `Students: ${project.students.join(", ")}\n`;
      content += `Category: ${project.category}\n`;
      content += `Start Date: ${project.startDate}\n`;
      content += `End Date: ${project.endDate}\n`;
      content += `Status: ${project.status}\n`;
      content += "----------------------------\n";
   });
   content += "\n";

   content += "TASKS:\n";
   tasks.forEach(task => {
      content += `ID: ${task.id}\n`;
      content += `Project: ${task.project}\n`;
      content += `Task: ${task.task}\n`;
      content += `Description: ${task.description}\n`;
      content += `Assigned: ${task.assigned}\n`;
      content += `Status: ${task.status}\n`;
      content += `Due: ${task.due}\n`;
      content += "----------------------------\n";
   });
   content += "\n";

   content += "MESSAGES:\n";
   messages.forEach(message => {
      content += `From: ${message.from}, To: ${message.to}\n`;
      content += `Text: ${message.text}\n`;
      content += `Timestamp: ${message.timestamp}\n`;
      content += "----------------------------\n";
   });

   // Create a Blob and trigger download of the text file
   const blob = new Blob([content], { type: 'text/plain' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = 'largeTestData.txt';
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);

   alert("Large test data generated, stored in localStorage, and downloaded as largeTestData.txt");
}
