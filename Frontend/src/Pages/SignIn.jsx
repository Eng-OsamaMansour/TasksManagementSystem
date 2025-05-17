import "../Styles/SignIn.css";
const SignIn = () => {
  return (
    <>
      <form id="SignIn-Form" className="SignIn-Form">
        <h2>Sign in</h2>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        <div className="checkbox-container">
          <input type="checkbox" id="stay" />
          <label for="stay">Stay Signed in</label>
        </div>
        <button type="button" onclick="signIn()">
          Sign In
        </button>
        <h6>
          I dont have account?{" "}
          <a href="#" onclick="SignUpForm()">
            Sing Up
          </a>
        </h6>
      </form>
    </>
  );
};
export default SignIn;
