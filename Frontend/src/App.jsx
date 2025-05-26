import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { apollo } from './apollo';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

import HomePage   from './Pages/HomePage';
import ProjectPage from './Pages/ProjectPage';
import TaskPage    from './Pages/TaskPage';
import ChatPage    from './Pages/ChatPage';
import Login       from './Pages/Login';     // sign-up form
import SignIn      from './Pages/SignIn';    // sign-in form

export default function App () {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin"     element={<Login />} />
            <Route path="/auth" element={<SignIn />} />

            {/* everything below requires a valid user */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route path="home"     element={<HomePage />} />
                    <Route path="projects" element={<ProjectPage />} />
                    <Route path="tasks"    element={<TaskPage />} />
                    <Route path="chat"     element={<ChatPage />} />
                    {/* default -- redirect to /home */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}
