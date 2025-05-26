import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Styles/SignIn.css';



export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export default function SignIn () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMut, { loading, error }] = useMutation(LOGIN);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await loginMut({ variables: { username, password } });
    login(data.login.token);  
    navigate('/home', { replace: true });
  };





  return (
    <form id="SignIn-Form" className="SignIn-Form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="checkbox-container">
        <input type="checkbox" id="stay" />
        <label htmlFor="stay">Stay signed in</label>
      </div>
      <button type="submit" disabled={loading}>Sign In</button>
      {error && <p className="error">{error.message}</p>}
      <h6>
        I don’t have an account?{' '}
        <Link to="/signin">Sign Up</Link>
      </h6>
    </form>
  );
}
