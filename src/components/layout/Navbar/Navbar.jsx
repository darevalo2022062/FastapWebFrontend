import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { iconV1, iconV2 } from "../../../assets/images";
import { Link } from "react-router-dom";
import { MenuIcon } from "../../icons/index";
import { Modal } from "../../common";
import { Sidebar } from "./Sidebar";
import { AuthForm } from "./AuthForm";
import {
  useValidateSessionQuery,
  useCloseSessionMutation,
} from "../../../services/userApi";
export const Navbar = ({
  isScrolledInitially = false,
  status = false,
  color = "bg-picton-blue",
}) => {
  const { data, refetch, isSuccess, isLoading } = useValidateSessionQuery();
  const [isScrolled, setIsScrolled] = useState(isScrolledInitially);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const sidebarRef = useRef(null);

  const handlerCloseSession = async () => {
    await closeSession();
    window.location.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? "auto" : "hidden";
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!status) {
        const section = document.getElementById("section");
        const scrollPosition = window.scrollY;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition > sectionTop + sectionHeight) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        } else {
          setIsScrolled(scrollPosition !== 0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [status]);

  useEffect(() => {
    if (isSuccess && data) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isSuccess, data]);

  const handleLoginSuccess = () => {
    refetch(); // Actualiza el estado de la sesión
    closeModal(); // Cierra el modal de autenticación
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <>
      <nav
        className={clsx(
          "sticky top-0 z-10 block w-full max-w-screen px-4 py-2 shadow-xl lg:px-8 lg:py-4 transition-opacity duration-300",
          {
            [`${color} text-white`]: isScrolled,
            "bg-white text-gray-800": !isScrolled,
          },
          { "opacity-0": !isPageLoaded, "opacity-100": isPageLoaded }
        )}
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl text-blue-gray-900">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
              type="button"
            >
              <MenuIcon size={24} className="stroke-2" />
            </button>
            <Link to="/" className="cursor-pointer py-1.5 ml-4">
              <img
                src={isScrolled ? iconV1 : iconV2}
                className="h-14"
                alt="Icon"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {["/", "/nosotros", "/contacto"].map((path, index) => (
                  <li
                    key={index}
                    className={clsx(
                      "block p-1 font-sans text-md antialiased tracking-wide font-medium leading-normal transition-all",
                      {
                        "hover:opacity-70": isScrolled,
                        "hover:text-picton-blue": !isScrolled,
                      }
                    )}
                  >
                    <Link to={path} className="flex items-center">
                      {path === "/"
                        ? "Inicio"
                        : path.charAt(1).toUpperCase() + path.slice(2)}
                    </Link>
                  </li>
                ))}

                {!isLoading &&
                isAuthenticated &&
                data?.role === "ADMINISTRADOR" ? (
                  <li>
                    <Link to="/dashboard">
                      <button
                        className={clsx(
                          "hidden border-none select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block",
                          {
                            "bg-white text-black": isScrolled,
                            "bg-yellow-500 text-white": !isScrolled,
                          }
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
                        "hidden border-none select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block",
                        {
                          "bg-white text-black": isScrolled,
                          "bg-picton-blue text-white": !isScrolled,
                        }
                      )}
                      type="button"
                    >
                      <span>Ingresar</span>
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/profile"
                      className={clsx(
                        "hidden border-none select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block",
                        {
                          "bg-white text-black": isScrolled,
                          "bg-picton-blue text-white": !isScrolled,
                        }
                      )}
                      type="button"
                    >
                      <span>Mi cuenta</span>
                    </Link>
                  </li>
                )}

                {isLoading && (
                  <li className="p-1 font-medium text-gray-500 text-md">...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        openModal={openModal}
        toggleSidebar={toggleSidebar}
        sidebarRef={sidebarRef}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        maxWidth="max-w-md w-full"
      >
        <AuthForm onClose={closeModal} onLoginSuccess={handleLoginSuccess} />
      </Modal>
    </>
  );
};
