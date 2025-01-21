import { Suspense } from "react"
import { useRoutes } from 'react-router-dom';
import combinedRoutes from "./routes";
import { Toaster } from 'react-hot-toast';

const Routes = () => {
    const routing = useRoutes(combinedRoutes);
    return routing;
};

const App = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Routes />
                <Toaster position="bottom-center" reverseOrder={false} />
            </Suspense>

        </>
    )
}

export default App