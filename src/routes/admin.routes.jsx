import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import AdminGuard from "./guards/AdminGuard";

const Dashboard = lazy(() => import("../pages/dashboard/DashboardPage"));
const Model = lazy(() => import("../pages/dashboard/pages/ModelPage"));
const Categories = lazy(() =>
  import("../pages/dashboard/pages/CategoriesPage")
);
const Color = lazy(() => import("../pages/dashboard/pages/ColorsPage"));
const Products = lazy(() => import("../pages/dashboard/pages/ProductsPage"));

const adminRoutes = [
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <AdminGuard>
          <Dashboard />
        </AdminGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: "modelos",
        element: (
          <AuthGuard>
            <AdminGuard>
              <Model />
            </AdminGuard>
          </AuthGuard>
        ),
      },
      {
        path: "categorias",
        element: (
          <AuthGuard>
            <AdminGuard>
              <Categories />
            </AdminGuard>
          </AuthGuard>
        ),
      },
      {
        path: "colores",
        element: (
          <AuthGuard>
            <AdminGuard>
              <Color />
            </AdminGuard>
          </AuthGuard>
        ),
      },
      {
        path: "",
        element: <Navigate to="modelos" />,
      },
      {
        path: "productos",
        element: (
          <AuthGuard>
            <AdminGuard>
              <Products />
            </AdminGuard>
          </AuthGuard>
        ),
      },
    ],
  },
];

export default adminRoutes;
