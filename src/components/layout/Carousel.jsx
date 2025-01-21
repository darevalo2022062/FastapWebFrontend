import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { Card } from '../common/Card';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';

const Carousel = ({ data }) => {
    return (
        <Swiper
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation, A11y]}
        >
            {data.map((element, index) => (
                <SwiperSlide key={index}>
                    <Card data={element} />
                </SwiperSlide>
            ))}
            <div className="swiper-button-next hidden lg:block" />
            <div className="swiper-button-prev hidden lg:block" />
        </Swiper>
    );
};

export default Carousel;