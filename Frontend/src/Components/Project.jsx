import React from "react";
import '../Styles/Project.css'
const AddNewProject = () => {
  console.log("Add new project clicked");
  // Add your logic here
};

const Project = () => {
  return (
    <>
      <div id="project-container" className="project-container">
        <div className="title">
          <h1>Projects Overview</h1>
        </div>

        <div className="control-container" id="control-container">
          <button onClick={AddNewProject} id="addProject">
            Add New Project
          </button>

          <input
            type="text"
            id="search-input"
            placeholder="Search projects by title or description..."
          />

          <select name="filter" id="filter">
            <option value="All Statuses">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="project-list">
          {/* Project Item 1 */}
          <div className="project-item">
            <div className="project-title">
              <h2>Project Title</h2>
            </div>
            <div className="project-description">
              <p>Project Description:</p>
            </div>
            <div className="students">
              <p>Students</p>
            </div>
            <div className="category">
              <p>Category</p>
            </div>
            <div className="progress-container">
              <span className="start-date">2023-04-01</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "56%" }}>
                  56%
                </div>
              </div>
              <span className="end-date">2026-09-01</span>
            </div>
          </div>

          {/* Project Item 2 */}
          <div className="project-item">
            <div className="project-title">
              <h2>Project Title</h2>
            </div>
            <div className="project-description">
              <p>Project Description:</p>
            </div>
            <div className="students">
              <p>Students</p>
            </div>
            <div className="category">
              <p>Category</p>
            </div>
            <div className="progress-container">
              <span className="start-date">2023-04-01</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "56%" }}>
                  56%
                </div>
              </div>
              <span className="end-date">2026-09-01</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
