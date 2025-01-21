import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { mission } from '../../../assets/images';

export const MissionSection = () => {
    return (
        <section className='flex flex-col lg:flex-row items-center lg:h-128'>
            <div className='lg:w-1/2 w-full h-full order-1 lg:order-none'>
                <LazyLoadImage
                    src={mission}
                    alt="mision"
                    className='w-full h-full object-cover'
                    effect="blur"
                    wrapperClassName='w-full h-full object-cover'

                />
            </div>
            <div className='lg:w-1/2 w-full bg-gray-100 flex items-center justify-center h-full order-2 lg:order-none'>
                <div className='p-8 md:p-16 text-center'>
                    <h1 className='font-bold text-3xl mb-4'>Nuestra misión</h1>
                    <p className='text-lg leading-relaxed'>
                        En Fastap, nos dedicamos a brindar una experiencia de compra con acceso rápido a la
                        última tecnología en productos para celulares y electrónicos. Garantizamos la
                        satisfacción mediante entregas rápidas y productos de calidad.
                    </p>
                </div>
            </div>
        </section>
    );
}
