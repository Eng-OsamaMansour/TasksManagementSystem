import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import HomePage from "./Pages/HomePage";
import ProjectPage from "./Pages/ProjectPage";
import TaskPage from "./Pages/TaskPage"
import ChatPage from "./Pages/ChatPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/Chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
  2;
}

export default App;
