import "../Styles/Task.css";
const Task = () => {
  return (
    <>
      <div class="tasks-container" id="tasks-container">
        <div class="task-header">
          <div class="task-controller">
            <label for="sort-tasks">Sort By:</label>
            <select id="sort-tasks" onchange="sortTasks()">
              <option value="status">Task Status</option>
              <option value="name">Project</option>
              <option value="dueDate">Due Date</option>
              <option value="assignedStudent">Assigned Student</option>
            </select>
          </div>
          <button class="new-task-btn" id="new-task-btn" onclick="openCreT()">
            Create a New Task
          </button>
        </div>
        <div class="table-container">
          <table class="task-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Project</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Assigned Student</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody id="task-table-body">
              <tr>
                <td>1</td>
                <td>Website Redesign</td>
                <td>Design Homepage</td>
                <td>Create a responsive design for the homepage.</td>
                <td>Ali Yaseen</td>
                <td class="status in-progress">In Progress</td>
                <td>4/22/2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Task;
