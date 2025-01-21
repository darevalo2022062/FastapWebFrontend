import { ProductCard2 } from "../common/ProductCard2";
import { Card } from "../common/Card";
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useState } from 'react';
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useGetProductByCategoryQuery } from '../../services/productApi';
const Placeholder = () => (
    <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
        Cargando comentarios...
    </div>
);

export const ProductCatalog = () => {
    const { data: dataProducts, error, isLoading } = useGetProductByCategoryQuery({ categoryName: 'cases' });
    const [products, setProducts] = useState([]);
    const [initialProducts, setInitialProducts] = useState([]); // Almacena los productos solo una vez
    const [modelsP, setModelsP] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({ triggerOnce: false });

    // Cargar productos iniciales cuando se obtienen datos
    useEffect(() => {
        if (!isLoading && dataProducts?.products) {
            const mappedProducts = dataProducts?.products.map((product) => ({
                _id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                status: product.status,
                color: product?.color
            }));
            setInitialProducts(mappedProducts); // Guardar solo una vez los productos mapeados
            console.log("Array Original", dataProducts.products);
            console.log("mappedProducts ", mappedProducts);
        }

    }, [isLoading, dataProducts]);

    const loadMoreProducts = useCallback(() => {
        if (loading || !hasMore || !initialProducts.length) return;

        setLoading(true);
        const start = (page - 1) * 10;
        const end = page * 10;
        const newProducts = initialProducts.slice(start, end);

        if (newProducts.length === 0) {
            setHasMore(false);
        } else {
            setProducts((prevProducts) => [...prevProducts, ...newProducts]);
            setPage((prevPage) => prevPage + 1);
        }

        setLoading(false);
    }, [loading, page, hasMore, initialProducts]);

    useEffect(() => {
        if (initialProducts.length > 0) {
            loadMoreProducts();
        }
    }, [initialProducts, loadMoreProducts]);

    useEffect(() => {
        if (inView && hasMore) {
            loadMoreProducts();
        }
    }, [inView, loadMoreProducts, hasMore]);

    if (isLoading) return <p>Cargando...</p>;

    return (
        <div className="px-4 py-16 bg-gray-50 sm:px-8 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
                <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">
                    Catálogo de Productos
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product, index) => (
                        <LazyLoadComponent placeholder={<Placeholder />} key={index}>
                            <Card
                                data={product}
                            />
                        </LazyLoadComponent>
                    ))}
                </div>

                {loading && (
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center">
                            <div className="flex space-x-2 animate-pulse">
                                <div className="bg-gray-400 h-2.5 w-2.5 rounded-full"></div>
                                <div className="bg-gray-400 h-2.5 w-2.5 rounded-full"></div>
                                <div className="bg-gray-400 h-2.5 w-2.5 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                )}

                {!hasMore && <p className="mt-4 text-center">FasTap💙🚀</p>}

            </div>
        </div>
    );
};
