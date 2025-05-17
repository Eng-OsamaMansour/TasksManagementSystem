import '../Styles/Navbar.css'

const Navbar = () => {
  return (
    <>
      <div id="footer">
        <div className="side-bar-btn" id="side-bar-btn">
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="footer-content">
          <h1 id="user-name"> Osama Mansour </h1>
          <button id="logout-btn" type="button">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
