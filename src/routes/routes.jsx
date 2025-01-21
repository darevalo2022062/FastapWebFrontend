import { lazy } from "react";

const Home = lazy(() => import("../pages/home/HomePage"))
const About = lazy(() => import("../pages/about/AboutPage"))
const CasesPage = lazy(() => import("../pages/casesPage/CasesPage"))
const Contact = lazy(() => import("../pages/contact/ContactPage"))
const ProductDetail = lazy(() => import("../pages/productDetails/ProductDetailsPage"))
const NotFound = lazy(() => import("../pages/utils/NotFound"))
const GymPage = lazy(() => import("../pages/gymPage/GymPage"))
const ConfirmEmail = lazy(() => import("../pages/utils/ConfirmEmail"))

const routes = [
    { path: '/', element: <Home /> },
    { path: '/nosotros', element: <About /> },
    { path: '/contacto', element: <Contact /> },
    { path: '/fastap-cases', element: <CasesPage /> },
    { path: '/fastap-gym', element: <GymPage /> },
    { path: '/detalle-de-producto/:id', element: <ProductDetail /> },
    {path: '/confirm-email/:authorization', element: <ConfirmEmail />},
    { path: "*", element: <NotFound /> },

]

export default routes;