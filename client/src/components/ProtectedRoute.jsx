import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);

  if (!user.token) return <Navigate to="/login" replace />;
  //   console.log(allowedRoles.includes(user.role));
  if (!user.role || !allowedRoles.includes(user.role))
    return <Navigate to="/not-authorised" replace />;

  return children;
};

export default ProtectedRoute;
