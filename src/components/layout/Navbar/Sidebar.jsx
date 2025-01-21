import React from "react";
import { Link } from "react-router-dom";
import { iconV2 } from "../../../assets/images";
import clsx from "clsx";

import { CloseIcon } from "../../icons";
import {
  useValidateSessionQuery,
  useCloseSessionMutation,
} from "../../../services/userApi";
import { useState, useEffect } from "react";

export const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  openModal,
  sidebarRef,
}) => {
  const { data, refetch, isSuccess, isLoading } = useValidateSessionQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [closeSession] = useCloseSessionMutation();

  const handlerCloseSession = async () => {
    await closeSession();
    window.location.reload();
  };

  useEffect(() => {
    if (isSuccess && data) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isSuccess, data]);

  return (
    <div
      className={`fixed inset-0 z-20 transition-opacity duration-300 ${
        isSidebarOpen
          ? "bg-black bg-opacity-50 opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={toggleSidebar}
    >
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/" className="cursor-pointer py-1.5">
            <img src={iconV2} className="h-12" alt="Logo" />
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 transition duration-300 hover:text-picton-blue"
          >
            <CloseIcon size={24} />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link
              to="/"
              className="block text-gray-800 transition duration-300 hover:text-picton-blue"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/nosotros"
              className="block text-gray-800 transition duration-300 hover:text-picton-blue"
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className="block text-gray-800 transition duration-300 hover:text-picton-blue"
            >
              Contacto
            </Link>
          </li>

          {!isLoading && isAuthenticated && data?.role === "ADMINISTRADOR" ? (
            <li>
              <Link to="/dashboard">
                <button
                  className={clsx(
                    "border-none select-none rounded-lg ml-4 py-2 px-16 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block bg-yellow-500 text-white"
                  )}
                  type="button"
                >
                  <span>Administrar</span>
                </button>
              </Link>
            </li>
          ) : null}

          {!isLoading && !isAuthenticated ? (
            <li>
              <button
                onClick={openModal}
                className={clsx(
                  "border-none select-none rounded-lg ml-4 py-2 px-20 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block",
                  "bg-picton-blue text-white"
                )}
                type="button"
              >
                <span>Ingresar</span>
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handlerCloseSession}
                className={clsx(
                  "border-none select-none rounded-lg ml-4 py-2 px-14 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block",
                  "bg-picton-blue text-white"
                )}
                type="button"
              >
                <span>Cerrar Sesión</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
