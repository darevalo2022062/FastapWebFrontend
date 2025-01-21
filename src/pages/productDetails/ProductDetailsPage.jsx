import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "../../services/productApi";
import { Navbar } from "../../components/layout";
import { Swiper, SwiperSlide } from 'swiper/react';
import useWhatsApp from "../../utils/useWhatsApp";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetProductByIdQuery(id);
    const [selectedModelIndex, setSelectedModelIndex] = useState(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [colors, setColors] = useState([]); // Colores originales
    const [filteredColors, setFilteredColors] = useState([]); // Colores filtrados
    const { sendMessage } = useWhatsApp('50241722381');

    useEffect(() => {
        if (data?.product?.color) {
            setColors(data.product.color); // Guardamos los colores originales
            setFilteredColors(data.product.color); // Inicialmente mostramos todos
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (error || !data) return <p>Error loading product.</p>;

    const { product } = data;

    const handleColorClick = (index) => {
        setSelectedColorIndex(index);
    };

    const handleModelClick = (index) => {
        setSelectedModelIndex(index);
        const selectedModel = product?.model?.[index]?.name; // Obtener el modelo seleccionado
        console.log("INDEX ", index);
        console.log("MODEL NAME ", selectedModel);

        if (!selectedModel) {
            console.error("El modelo seleccionado es undefined o no existe.");
            return; // Si no hay modelo seleccionado, salir de la función
        }

        console.log("Modelo seleccionado:", selectedModel);

        // Mapa de modelos y sus respectivos códigos
        const modelMap = {
            '11 Normal': '11N',
            '11 Pro': '11P',
            '11 Pro Max': '11PM',
            '12 Normal': '12N',
            '12 Pro': '12P',
            '12 Pro Max': '12PM',
            '13 Normal': '13N',
            '13 Pro': '13P',
            '13 Pro Max': '13PM',
            '14 Normal': '14N',
            '14 Pro': '14P',
            '14 Pro Max': '14PM',
            '15 Normal': '15N',
            '15 Pro': '15P',
            '15 Pro Max': '15PM',
        };

        const modelKey = Object.keys(modelMap).find((key) =>
            selectedModel.includes(key)
        );

        if (!modelKey) {
            console.error("No se pudo determinar el modelo clave (modelKey). Se mantiene el estado actual.");
            return;
        }

        const selectedModelCode = modelMap[modelKey];

        console.log("Código del modelo seleccionado (modelKey):", selectedModelCode);

        const newFilteredColors = colors.filter((color) => {
            return color?.colorCode?.includes(selectedModelCode);
        });

        if (newFilteredColors.length === 0) {
            console.warn("No se encontraron colores para el modelo seleccionado. Se mantiene el estado actual.");
            return;
        }

        setFilteredColors(newFilteredColors);
        setSelectedColorIndex(0);
    };



    console.log("Product", product);
    return (
        <>
            <Navbar />
            <section className="text-gray-700 body-font overflow-auto bg-white">
                <div className="container px-5 py-20 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                className="rounded-3xl border bg-picton-blue border-gray-200"
                            >
                                {filteredColors.length > 0 && (
                                    <SwiperSlide>
                                        <img
                                            alt={`Product image for color ${selectedColorIndex + 1}`}
                                            src={filteredColors[selectedColorIndex]?.image}
                                            style={{ aspectRatio: '1 / 1' }}
                                            className="object-cover object-center w-full h-full"
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl title-font font-bold mb-1">{product?.name}</h1>
                            <p className="leading-relaxed text-gray-600">
                                {product?.description}
                            </p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div className="flex items-center">
                                    <span className="mr-3 text-gray-700 font-medium">Modelos</span>
                                    <div className="flex space-x-2">
                                        {product?.model?.map((model, index) => (
                                            <button
                                                key={index}
                                                className={`border-2 border-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none transition-all duration-300 
                                                    ${index === selectedModelIndex ? 'ring-2 ring-green-500 bg-green-100 text-green-800' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                                onClick={() => handleModelClick(index)}
                                            >
                                                {model.name}
                                            </button>

                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div className="flex">
                                    <span className="mr-3 text-gray-700 font-medium">Color</span>
                                    {filteredColors.map((color, index) => (
                                        <button
                                            key={index}
                                            className={`border-2 mx-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none ${index === selectedColorIndex ? 'ring-2 ring-green-500' : ''}`}
                                            style={{ backgroundColor: color.colorHex }}
                                            onClick={() => handleColorClick(index)}
                                        ></button>
                                    ))}
                                </div>
                            </div>

                            {product?.specification?.length > 0 && (
                                <div className="mb-5">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Especificaciones:</h2>
                                    <ul>
                                        {product.specification.map((spec, index) => (
                                            <li key={index} className="mb-1 text-gray-600">
                                                <strong className="text-gray-700">{spec.title}:</strong> {spec.detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">{`Q${product?.price.toFixed(2)}`}</span>
                                <button
                                    className={`flex ml-auto text-white bg-picton-blue border-0 py-2 px-6 focus:outline-none hover:brightness-95 rounded ${!product ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!product}
                                    onClick={() => product && sendMessage(product.name)}
                                >
                                    Pedir
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetailsPage;
