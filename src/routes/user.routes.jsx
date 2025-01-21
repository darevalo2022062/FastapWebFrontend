import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";

const Profile = lazy(() => import("../pages/profile/ProfilePage"));
const ChangePassword = lazy(() =>
  import("../pages/profile/pages/ChangePasswordPage")
);

const userRoutes = [
  {
    path: "/profile",
    element: (
      <AuthGuard>
        <Profile />
      </AuthGuard>
    ),
    children: [
      { 
        index: true, 
        element: (
          <AuthGuard>
            <Navigate to="change-password" />
          </AuthGuard>
        ) 
      },
      { 
        path: "change-password", 
        element: (
          <AuthGuard>
            <ChangePassword />
          </AuthGuard>
        ) 
      },
    ],
  },
];

export default userRoutes;
