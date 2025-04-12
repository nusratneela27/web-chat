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
