import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { placeHolder } from '../../assets/images';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

export const Card = ({ data }) => {
    console.log("Data", data);
    return (
        <Link to={`/detalle-de-producto/${data?._id}`} className="block rounded-md overflow-visible border min-h-[350px]">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 10000 }}
                modules={[Autoplay]}
            >
                {data?.color?.map((element, index) => (
                    <SwiperSlide key={index}>
                        <LazyLoadImage
                            placeholderSrc={placeHolder}
                            className="w-full h-80 object-cover rounded-t-md"
                            src={element.image}
                            alt={`Product Image ${index + 1}`}
                            wrapperClassName='w-full h-80 object-cover rounded-t-md'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="p-3 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-lg font-bold mb-2">{data?.name}</h3>
                    <p className="text-gray-600 truncate">
                        {data?.description}
                    </p>
                    <p className="text-blue-500 block">
                        Ver más
                    </p>
                    <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-gray-900">{`Q${data?.price.toFixed(2)}`}</span>

                    <span className={`shrink-0 rounded-full ${data?.status === 'DISPONIBLE' ? 'bg-green-500' : 'bg-red-500'} px-3 font-mono text-sm font-medium tracking-tight text-white`}>
                        {data?.status}
                    </span>
                </div>
                </div>
                
            </div>
        </Link>
    );
};
