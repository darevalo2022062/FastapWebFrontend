import Carousel from '../../../components/layout/Carousel';
import { useGetProductByCategoryQuery } from '../../../services/productApi';

export const CasesSection = () => {
    const { data, error, isLoading } = useGetProductByCategoryQuery({ categoryName: 'Cases' });

    const renderContent = () => {
        if (isLoading) return <p>Loading...</p>;
        if (error) return (<p className='text-center min-h-72 flex justify-center items-center'>{error?.error || error?.data?.message || error?.message}</p>);
        if (!data || !Array.isArray(data.products)) return <p>No products found.</p>;

        const { products } = data;
        return <Carousel data={products} />;
    };

    return (
        <>
            <section id='cases' className="h-96 text-white text-center grid bg-cover bg-cases relative">
                <div className="col-start-1 row-start-1 bg-black bg-opacity-50 w-full h-full"></div>
                <div className="col-start-1 row-start-1 max-w-4xl mx-auto my-auto">
                    <h1 className="font-bold text-3xl mb-4">Iphone Cases</h1>
                    <p className='text-lg'>
                        Protege y personaliza tu iPhone con nuestra exclusiva colección de fundas. Disponibles en una variedad de diseños elegantes y colores vibrantes,
                        nuestras fundas están hechas para brindar una protección robusta contra caídas y arañazos, sin comprometer el estilo.
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