import '../Styles/Home.css'
const Home = () => {
  return (
    <>
      <div className="welcome-message">
        <div className="welcome-message-content">
          <h1>Welcome to TasksManagement System</h1>
        </div>
        <div className="welcome-date" id="welcome-date"></div>
      </div>
      <div className="dashboard">
        <div className="dashboard-content">
          <h3>
            Number Of Projects <span id="num-pro"> </span>
          </h3>
        </div>
        <div className="dashboard-content" id="number-of-students">
          <h3>
            Number Of Students <span id="num-stu"> </span>
          </h3>
        </div>
        <div className="dashboard-content">
          <h3>
            Number Of Tasks <span id="num-ts"> </span>
          </h3>
        </div>
        <div className="dashboard-content">
          <h3>
            Number Of Finished Projects <span id="num-fp"> </span>
          </h3>
        </div>
      </div>
      <div className="chart-container">
        <canvas id="dashboardChart"></canvas>
      </div>
    </>
  );
};
export default Home;
