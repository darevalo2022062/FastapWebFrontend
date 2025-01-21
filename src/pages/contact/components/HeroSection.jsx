import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Button, Modal } from '../../../components/common';
import { SocialMediaLinks } from './SocialMediaLinks';
import { contact } from '../../../assets/images'


export const HeroSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative h-[calc(100vh-84px)] lg:h-[calc(100vh-100px)] w-full">
            <LazyLoadImage
                src={contact}
                alt="contact-hero-image"
                className="absolute inset-0 w-full h-full object-cover"
                effect="opacity"
                wrapperClassName="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h1 className="text-5xl text-white font-bold mb-4">Ponte en contacto</h1>
                <p className="text-2xl text-white mb-4">
                    ¡Nos encantaría saber de ti! Contáctanos para cualquier pregunta o comentario.
                </p>
                <div>
                    <Button onClick={openModal} size='large' variant='light' text={'Contáctanos'} />
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        maxWidth="max-w-md w-full"
                    >
                        <div className='px-5 py-10 text-center'>
                            <h1 className="text-2xl font-bold mb-6">Síguenos en redes sociales</h1>
                            <SocialMediaLinks />
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
