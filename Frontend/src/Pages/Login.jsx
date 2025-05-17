import '../Styles/Login.css'
const Login = () => {
  return (
    <>
      <div className="SignUp-container" id="SignUp-Container">
        <form id="SignUp-Form" className="SignUp-Form">
          <h2>Sign Up</h2>
          <label for="Sign-Up-username">Username</label>
          <input type="text" id="Sign-Up-username" name="username" required />
          <label for="Sign-Up-password">Password</label>
          <input
            type="password"
            id="Sign-Up-password"
            name="password"
            required
          />
          <div className="checkbox-container">
            <input type="checkbox" id="isStudent" />
            <label for="isStudent">I am a student</label>
          </div>
          <div id="student-Container" className="Student-Container">
            <label for="universityID">University ID</label>
            <input type="text" id="universityID" name="universityID" />
          </div>
          <button type="button" onclick="signUp()">
            Sign Up
          </button>
          <h6>
            I already have account{" "}
            <a href="#" onclick="SignInForm()">
              Sing In
            </a>
          </h6>
        </form>
      </div>
    </>
  );
};
export default Login;