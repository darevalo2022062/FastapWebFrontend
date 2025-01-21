import React from 'react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../../../components/icons';

export const SocialMediaLinks = () => {
    const phoneNumber = "50250600091"; // Número de Guatemala en formato internacional
    const message = "Hola, me gustaría ponerme en contacto."; // Reemplaza con el mensaje que desees

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="flex justify-around mt-6">
            <a href="https://www.facebook.com/FasTapFB/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                <FacebookIcon size={32} />
            </a>
            <a href="https://www.instagram.com/fastap.ig/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                <InstagramIcon size={30} />
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-green-600">
                <WhatsAppIcon size={30} />
            </a>
        </div>
    );
};
