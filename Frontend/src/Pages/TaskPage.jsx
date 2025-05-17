import Task from "../Components/Task";
import LeftSideBar from "../Components/LeftSideBare";
import Navbar from "../Components/Navbar";  
const ProjectPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ minWidth: "250px", backgroundColor: "#272727" }}>
          <LeftSideBar />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <Task />
        </div>
      </div>
    </div>
  );
};
export default ProjectPage;
