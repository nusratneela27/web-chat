import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUser({
        email: decodedToken.email,
        name: decodedToken.name,
      });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    const decodedToken = jwtDecode(token);
    setUser({
      email: decodedToken.email,
      name: decodedToken.name,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const authInfo = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
