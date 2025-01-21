import { iconV2 } from '../../../assets/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Sidebar = ({ isOpen, onToggle, open }) => {
    const location = useLocation();

    return (
        <>
            <div className={`fixed inset-0 z-30 bg-black opacity-50 ${isOpen ? 'block' : 'hidden'} lg:hidden`} onClick={onToggle}></div>
            <div
                className={`lg:hidden sticky top-0 left-0 w-full bg-white shadow-md  flex items-center justify-between px-4 py-2 transition-all duration-300`}
            >
                <button
                    className="text-xl"
                    onClick={open}
                >
                    <FaBars />
                </button>
                <div className="flex-1 text-center font-semibold text-lg">Dashboard</div>
            </div>

            <div className={`fixed z-40 top-0 left-0 h-screen bg-white shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-20'} lg:relative lg:translate-x-0 lg:w-80`}>
                <div className="flex justify-center items-center p-5 ">
                    <Link to='/'><LazyLoadImage src={iconV2} className='h-24' /></Link>
                </div>
                <div className=" content-center h-full -mt-28 flex justify-center items-center w-full overflow-auto">
                    <ul className="list-none w-full px-5 space-y-4">

                        <li>
                            <Link
                                to="/dashboard/modelos"
                                className={`flex items-center justify-center text-lg transition-all duration-300 ease-in-out p-3 rounded-md hover:shadow-lg ${location.pathname === '/dashboard/modelos' ? 'bg-picton-blue text-white' : 'hover:bg-picton-blue hover:text-white'
                                    }`}
                            >
                                <span className="ml-3">Modelos</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/categorias"
                                className={`flex items-center justify-center text-lg transition-all duration-300 ease-in-out p-3 rounded-md hover:shadow-lg ${location.pathname === '/dashboard/categorias' ? 'bg-picton-blue text-white' : 'hover:bg-picton-blue hover:text-white'
                                    }`}
                            >
                                <span className="ml-3">Categorías</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/colores"
                                className={`flex items-center justify-center text-lg transition-all duration-300 ease-in-out p-3 rounded-md hover:shadow-lg ${location.pathname === '/dashboard/colores' ? 'bg-picton-blue text-white' : 'hover:bg-picton-blue hover:text-white'
                                    }`}
                            >
                                <span className="ml-3">Colores</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/productos"
                                className={`flex items-center justify-center text-lg transition-all duration-300 ease-in-out p-3 rounded-md hover:shadow-lg ${location.pathname === '/dashboard/productos' ? 'bg-picton-blue text-white' : 'hover:bg-picton-blue hover:text-white'
                                    }`}
                            >
                                <span className="ml-3">Productos</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
