import { Navigate } from "react-router-dom";
import { useValidateSessionQuery } from "../../services/userApi";

const NoAuthGuard = ({ children }) => {
  const { data, isLoading } = useValidateSessionQuery();
  if (isLoading) {
    return null;
  }
  if (data) {
    return <Navigate to="/home" />; // Redirige a la página de inicio o cualquier otra ruta
  }
  return children;
};

export default NoAuthGuard;
