import { Navigate } from "react-router-dom";
import { useValidateSessionQuery } from "../../services/userApi";

const AuthGuard = ({ children }) => {
  const { data, isLoading } = useValidateSessionQuery();
  if (isLoading) {
    return null;
  }
  if (!data) {
      return <Navigate to="/" />;
  }
  return children;
};

export default AuthGuard;
