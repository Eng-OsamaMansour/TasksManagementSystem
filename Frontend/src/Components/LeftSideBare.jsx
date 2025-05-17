import "../Styles/LeftSideBar.css";
import { Link, NavLink } from "react-router-dom";
const LeftSideBar = () => {
  return (
    <>
      <div className="left-side-bar-container" id="left-side-bar-Container">
        <div className="left-side-bar" id="left-side-bar">
          <div className="left-side-bar-items">
            <NavLink to="/home">
              <button id="Home" type="button" onclick="activateButton(this.id)">
                Home
              </button>{" "}
            </NavLink>
            <NavLink to="/projects">
              <button
                id="Projects"
                type="button"
                onclick="activateButton(this.id)"
              >
                Projects
              </button>
            </NavLink>
            <NavLink to="/tasks">
              <button
                id="Tasks"
                type="button"
                onclick="activateButton(this.id)"
              >
                Tasks
              </button>
            </NavLink>
            <NavLink to="/chat">
              <button id="Chat" type="button" onclick="activateButton(this.id)">
                Chat
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default LeftSideBar;
