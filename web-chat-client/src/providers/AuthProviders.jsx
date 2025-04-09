import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("chat-user")) || null; 
    if (storedToken) {
      setUser(storedToken);
    }
  }, []);

  const signup = (token) => {
    console.log("Signing up with token:", token);
    localStorage.setItem("chat-user", JSON.stringify(token));
    setUser(token);
  };

  const login = (token) => {
    console.log("Logging in with token:", token);
    localStorage.setItem("chat-user", JSON.stringify(token));
    setUser(token);
  };

  const authInfo = {
    user,
    signup,
    login,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
