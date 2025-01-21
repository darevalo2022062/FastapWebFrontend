import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../../../components/icons';
import { about } from '../../../assets/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const HeroSection = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="lg:pr-10">
                    <span className="mb-5 inline-block bg-gray-100 rounded-full px-3 py-2 text-sm font-semibold text-gray-600">Nosotros</span>

                    <h5 className="mb-4 text-picton-blue text-4xl font-extrabold leading-none">
                        ¿Quienes Somos?
                    </h5>
                    <p className="mb-6 text-gray-900">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit class velit, nibh ut aliquet
                        tristique orci mus vel habitant taciti lacinia, dictumst congue quisque malesuada
                        ornare viverra massa potenti. Hac penatibus donec feugiat curae laoreet dapibus,
                        convallis porta varius ante habitasse, ac non felis torquent praesent.
                    </p>
                    <hr className="mb-5 border-gray-300" />
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://www.instagram.com/fastap.ig/"
                            target='_blank'
                            className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <InstagramIcon size={24} />
                        </a>
                        <a
                            href="https://www.facebook.com/FasTapFB"
                            target='_blank'
                            className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <FacebookIcon size={26} />
                        </a>
                        <a
                            href="https://api.whatsapp.com/send?phone=50241722381&text=Hola,%20vi%20su%20p%C3%A1gina%20en%20internet%20y%20estoy%20interesado%20en%20un%20producto."
                            target='_blank'
                            className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <WhatsAppIcon size={26} />
                        </a>
                    </div>
                </div>
                <div>
                    <LazyLoadImage
                        className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
                        src={about}
                        alt="hero-section"
                        effect="blur"
                        wrapperClassName="object-cover w-full h-56 rounded shadow-lg sm:h-96"
                    />
                </div>
            </div>
        </div>
    );
}
