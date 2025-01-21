import { LazyLoadComponent } from "react-lazy-load-image-component"
import { ProductCard1 } from "../../../components/common/index.js";
import { useGetProductByCategoryQuery } from "../../../services/productApi.js";

const Placeholder = () => (
    <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
        Cargando...
    </div>
);

export const MostSeledCases = () => {
    const { data, error, isLoading } = useGetProductByCategoryQuery('cases')
    if (isLoading) return <h1 className="text-center">Cargando...</h1>

    return (
        <>
            <div className="relative bg-gradient-to-b from-[#fff] to-[#fff] py-16 px-4 sm:px-6 lg:px-8">
                {/* Fondo de la sección */}
                <div className="absolute inset-0 bg-blue-100 opacity-30"></div>
                <div className="relative max-w-screen-xl mx-auto">
                    <h1 className="font-poppins text-3xl font-bold text-gray-900 text-center mb-12">
                        Lo más Vendido
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <LazyLoadComponent placeholder={<Placeholder />}>
                            <ProductCard1
                                imageSrc="https://i.ibb.co/gJBD1zS/Card-Prueba-4.jpg"
                                title="Silver Case"
                                description="Iphone 14 Pro Max"
                            />
                        </LazyLoadComponent>

                    </div>
                </div>
            </div>
        </>
    );
}