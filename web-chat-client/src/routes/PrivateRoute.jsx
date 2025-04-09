import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext"

const PrivateRoute = ({ children }) => {
  const {authUser} = useAuthContext();
  const location = useLocation();

  if(!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default PrivateRoute;


// import { Navigate } from "react-router";

// const PrivateRoute = ({ children }) => {
//   const authUser = JSON.parse(localStorage.getItem("chat-user"));

//   return authUser ? children : <Navigate to="/signup" replace />;
// };

// export default PrivateRoute;

// =======================================

// import { useAuth } from "../providers/AuthProviders";
// import { Navigate, useLocation } from "react-router";

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
