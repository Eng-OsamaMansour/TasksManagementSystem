import Chat from "../Components/Chat";
import LeftSideBar from "../Components/LeftSideBare";
import Navbar from "../Components/Navbar";  
const ChatPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar on the left */}
        <div style={{ minWidth: "250px", backgroundColor: "#272727" }}>
          <LeftSideBar />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <Chat />
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
