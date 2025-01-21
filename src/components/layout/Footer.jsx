import React from 'react';
import { iconV2 } from '../../assets/images';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../icons';

export const Footer = () => {
    return (
        <section>
            <div className="mx-auto px-4 lg:px-12 p-12 bg-neutral-100">
                <div className="flex flex-col min-[830px]:flex-row items-center justify-between gap-6 pb-10 border-b-2 border-gray-200">
                    <a href="https://pagedone.io/" className="py-1.5">
                        <img src={iconV2} className='h-20' alt="Logo" />
                    </a>
                    <ul className="flex flex-col sm:flex-row items-center gap-5 sm:gap-12">
                        <li>
                            <Link to="/" className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-picton-blue focus-within:text-picton-blue focus-within:outline-0">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/nosotros" className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-picton-blue focus-within:text-picton-blue focus-within:outline-0">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link to="/contacto" className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-picton-blue focus-within:text-picton-blue focus-within:outline-0">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="pt-7 flex flex-col min-[520px]:flex-row items-center justify-end gap-6">
                    <div className="flex items-center gap-4">
                        <a href="https://www.facebook.com/FasTapFB" className="border border-gray-300 p-2 rounded-full aspect-square text-gray-700 transition-all duration-500 hover:text-indigo-600 hover:border-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 focus-within:border-indigo-600">
                            <FacebookIcon size={20} />
                        </a>
                        <a href="https://www.instagram.com/fastap.ig/" className="border border-gray-300 p-2 rounded-full aspect-square text-gray-700 transition-all duration-500 hover:text-indigo-600 hover:border-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 focus-within:border-indigo-600">
                            <InstagramIcon size={20} />
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=50241722381&text=Hola,%20vi%20su%20p%C3%A1gina%20en%20internet%20y%20estoy%20interesado%20en%20un%20producto." className="border border-gray-300 p-2 rounded-full aspect-square text-gray-700 transition-all duration-500 hover:text-indigo-600 hover:border-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 focus-within:border-indigo-600">
                            <WhatsAppIcon size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
