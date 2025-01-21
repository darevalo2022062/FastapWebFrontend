import { useValidateSessionQuery } from "../../services/userApi";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const { data, isLoading } = useValidateSessionQuery();
  if (isLoading) {
    return null;
  }
  if (data && data.role === "ADMINISTRADOR") {
    return children;
  }
  console.log("data: ", data);
  console.log("Eres: ", data.role);
  return <Navigate to="/" />;
};

export default AdminGuard;
