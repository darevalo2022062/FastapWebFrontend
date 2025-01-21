import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Navbar } from "../../components/layout";
import { useCloseSessionMutation } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const [closeSession] = useCloseSessionMutation();

  const logout = async () => {
    document.cookie = "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    await closeSession();
    window.location.reload();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-84px)] lg:h-[calc(100vh-100px)]">
        <div className="flex justify-around h-full p-0 lg:px-4 2xl:px-52">
          <div className="ml-0 bg-white w-72">
            <nav>
              <Link
                className={clsx(
                  "flex items-center p-3 my-6 transition-colors duration-200 rounded-lg",
                  {
                    "text-gray-800 bg-gray-100": isActive(
                      "/profile/change-password"
                    ),
                    "text-gray-600 hover:text-gray-800 hover:bg-gray-100":
                      !isActive("/profile/change-password"),
                  }
                )}
                to="/profile/change-password"
              >
                <span className="mx-4 text-lg font-normal">
                  Cambiar contraseña
                </span>
                <span className="flex-grow text-right"></span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center w-full p-3 my-6 text-white transition-colors duration-200 rounded-lg bg-rose-500 hover:bg-rose-600 active:scale-95"
              >
                <span className="mx-4 text-lg font-normal">Cerrar sesión</span>
                <span className="flex-grow text-right"></span>
              </button>
            </nav>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
