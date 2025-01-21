import React from 'react';
import LazyLoad from 'react-lazyload';
import { GymSection, CasesSection, JewelSection, GallerySection } from './components';
import { Navbar, Footer } from '../../components/layout';
import useDocumentTitle from '../../utils/useDocumentTitle';

const HomePage = () => {
    useDocumentTitle("FasTap | Todo al alcance de un Tap ");

    return (
        <>
            <Navbar />
            <GallerySection />
            <h1 className='py-6 text-center font-bold text-3xl sm:text-4xl md:text-4xl tracking-wide transition-all duration-500 ease-in-out'>
                Nuestros productos
            </h1>
            <CasesSection />
            <LazyLoad height={200} offset={100}>
                <GymSection />
            </LazyLoad>
            <LazyLoad height={200} offset={100}>
                <JewelSection />
            </LazyLoad>
            <Footer />
        </>
    )
}

export default HomePage;
