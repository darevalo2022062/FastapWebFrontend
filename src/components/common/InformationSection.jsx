import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"


export const InformationSection = ({ srcImg, desc, txt1, txt2 }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    // Manejar el scroll de la página
    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Determinar el color de fondo y la opacidad del gradiente basado en la posición de desplazamiento
    const bgColor = scrollPosition > 550 ? 'bg-gradient-to-b from-blue-50 to-blue-200' : 'bg-blue-100';
    const gradientOpacity = scrollPosition > 550 ? 'opacity-70' : 'opacity-40';

    return (
        <div
            className={`relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-1000 ${bgColor} text-gray-900`}
        >
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${gradientOpacity} bg-gradient-to-r from-gray-100 via-white to-gray-100`}
            ></div>

            <div className="max-w-screen-lg mx-auto flex flex-col-reverse lg:flex-row items-center gap-8 relative ">
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <LazyLoadImage
                        src={srcImg}
                        alt={desc}
                        
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">{desc}</h2>
                    <p className="mb-4 text-lg text-gray-700">
                        {txt1}
                    </p>
                    <p className="mb-4 text-lg text-gray-700">
                        {txt2}
                    </p>
                </div>
            </div>
        </div>
    );

}