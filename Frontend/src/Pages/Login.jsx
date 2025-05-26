import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

export default function Login () {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    isStudent: false,
    universityID: ''
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    /* call your SIGN_UP mutation here */
    /* on success: nav('/home') */
  };

  return (
    <div className="SignUp-container">
      <form id="SignUp-Form" className="SignUp-Form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>

        <label htmlFor="su-username">Username</label>
        <input id="su-username" required
               value={form.username}
               onChange={e=>setForm({...form,username:e.target.value})} />

        <label htmlFor="su-password">Password</label>
        <input id="su-password" type="password" required
               value={form.password}
               onChange={e=>setForm({...form,password:e.target.value})} />

        <div className="checkbox-container">
          <input type="checkbox" id="isStudent"
                 checked={form.isStudent}
                 onChange={e=>setForm({...form,isStudent:e.target.checked})}/>
          <label htmlFor="isStudent">I am a student</label>
        </div>

        {form.isStudent && (
          <>
            <label htmlFor="universityID">University ID</label>
            <input id="universityID"
                   value={form.universityID}
                   onChange={e=>setForm({...form,universityID:e.target.value})}/>
          </>
        )}

        <button type="submit">Sign Up</button>

        <h6>
          I already have an account?{' '}
          <Link to="/register">Sign In</Link>
        </h6>
      </form>
    </div>
  );
}
