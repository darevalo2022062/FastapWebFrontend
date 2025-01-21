import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import icon from '../../../assets/images/icons/fastap1.png';
import { Link } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';

export const GallerySection = () => {
    return (
        <>
            <div id='section' className='hidden lg:flex gallery-container'>
                <div className="bg-gym gallery-item bg-center bg-cover group">
                    <div className="hidden group-hover:flex flex-col h-full justify-center items-center ">
                        <Link to='/fastap-gym'>
                            <LazyLoadImage
                                src='https://cdn-icons-png.flaticon.com/512/952/952816.png'
                                alt="Fitness Icon"
                                effect="blur"
                                className='h-40'
                            />
                        </Link>
                    </div>
                </div>
                <div className="bg-cases-gallery gallery-item bg-center bg-cover group ">
                    <div className="hidden group-hover:flex flex-col h-full justify-center items-center ">
                        <Link to='/fastap-cases'>
                            <LazyLoadImage
                                src={icon}
                                alt="Fastap Icon"
                                effect="blur"
                                className='h-40'
                            />
                        </Link>
                    </div>
                </div>

                <div className="bg-jewelry gallery-item bg-center bg-cover group">
                    <div className="hidden group-hover:flex flex-col h-full justify-center items-center ">
                        <Link to='/fastap-joyas'>
                            <LazyLoadImage
                                src='https://i.ibb.co/12LVYmc/Kinales.png'
                                alt="Diamond Icon"
                                effect="blur"
                                className='h-40'
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='lg:hidden transition-all duration-300 ease-in-out'>
                <Swiper className='h-80'>
                    <SwiperSlide className='relative bg-gym bg-center bg-cover'>
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className='flex justify-center items-center h-full'>
                            <Link to='https://www.joyeriasvilleda.com/'>
                                <LazyLoadImage
                                    src='https://www.zarla.com/images/zarla-buen-quilate-1x1-2400x2400-20210603-ttv7yqgg8tmxj87cg7j9.png?crop=1:1,smart&width=250&dpr=2'
                                    alt="Diamond Icon"
                                    effect="blur"
                                    className='h-32'
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='relative bg-cases-gallery bg-center bg-cover'>
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className='flex justify-center items-center h-full'>
                            <Link to='/some-other-link'>
                                <LazyLoadImage
                                    src='https://www.zarla.com/images/zarla-buen-quilate-1x1-2400x2400-20210603-ttv7yqgg8tmxj87cg7j9.png?crop=1:1,smart&width=250&dpr=2'
                                    alt="Diamond Icon"
                                    effect="blur"
                                    className='h-32'
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='relative bg-jewelry bg-center bg-cover'>
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className='flex justify-center items-center h-full'>
                            <Link to='/another-link'>
                                <LazyLoadImage
                                    src='https://www.zarla.com/images/zarla-buen-quilate-1x1-2400x2400-20210603-ttv7yqgg8tmxj87cg7j9.png?crop=1:1,smart&width=250&dpr=2'
                                    alt="Diamond Icon"
                                    effect="blur"
                                    className='h-32'
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};
