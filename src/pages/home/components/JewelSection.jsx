import Carousel from '../../../components/layout/Carousel';
import { useGetProductByCategoryQuery } from '../../../services/productApi';

export const JewelSection = () => {
    const { data, error, isLoading } = useGetProductByCategoryQuery({ categoryName: 'Joyeria' });

    const renderContent = () => {
        if (isLoading) return <p>Loading...</p>;
        if (error) return (<p className='text-center min-h-72 flex justify-center items-center'>{error?.error || error?.data?.message || error?.message}</p>);
        if (!data || !Array.isArray(data.products)) return <p>No products found.</p>;

        const { products } = data;
        return <Carousel data={products} />;
    };

    return (
        <>
            <section id='jewel' className="h-96 text-white text-center grid bg-cover bg-jewelry relative">
                <div className="col-start-1 row-start-1 bg-black bg-opacity-50 w-full h-full"></div>
                <div className="col-start-1 row-start-1 max-w-4xl mx-auto my-auto">
                    <h1 className="font-bold text-3xl">Joyeria</h1>
                    <p className='text-lg'>
                        Descubre nuestra exclusiva colección de collares con medallas estilo "Coin Gray".
                        Estos collares están diseñados para combinar elegancia y un toque moderno, convirtiéndose
                        en el complemento perfecto para cualquier atuendo. Cada medalla está elaborada con precisión
                        y disponible en diferentes acabados, incluyendo oro, plata y negro, para adaptarse a tus
                        preferencias personales.
                    </p>
                </div>
            </section>
            <div className="w-full max-w-screen-2xl mx-auto my-5 px-10">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-full max-w-4xl flex items-center justify-between">
                        <div className="flex-grow border-t-2 border-cyber-yellow"></div>
                        <span className="mx-10 text-lg font-semibold text-gray-800">Productos</span>
                        <div className="flex-grow border-t-2 border-han-purple"></div>
                    </div>
                </div>
                {renderContent()}
            </div>
        </>
    );
}