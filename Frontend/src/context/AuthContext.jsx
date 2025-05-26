import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // notice: default import, not { jwtDecode }

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp, ...rest } = jwtDecode(token);
      if (exp * 1000 > Date.now()) {
        setUser(rest); // still valid ⇒ keep user
      } else {
        localStorage.removeItem("token"); // expired ⇒ wipe token
      }
    }
  }, []);

  /* login helper (called after successful mutation) */
  const login = (token) => {
    localStorage.setItem("token", token);
    const { exp, ...rest } = jwtDecode(token);
    setUser(rest); // { userId, role, … }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
