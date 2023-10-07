import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }: { user: string | null | undefined }) => {
  if (user === undefined) {
    return <p>Loading</p>;
  } else if (!user) {
    return <Navigate to={"/signin"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
