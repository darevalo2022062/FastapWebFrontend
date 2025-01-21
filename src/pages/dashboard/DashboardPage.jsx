// DashboardPage.jsx
import { Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Importa el ícono de menú

const DashboardPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex lg:flex-row flex-col h-screen overflow-hidden">
            
          
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} open={() => setIsSidebarOpen(true)} onToggle={() => setIsSidebarOpen(false)} />

            {/* Main Content */}
            <div
                className={`flex-1 bg-white overflow-auto transition-all duration-300`}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;
