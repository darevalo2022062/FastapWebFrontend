import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ProductCard2 = ({ imageSrc, title, price, description }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg hover:border-transparent hover:shadow-blue-200">
            {/* max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden 
            */}
            <div className="relative">
                <LazyLoadImage
                    src={imageSrc}
                    alt={title}
                    //sm:h-40 md:h-40 lg:h-40
                    className="w-full h-30  object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                <span className="text-md font-semibold text-blue-600">{price}</span>
            </div>
        </div>
    );
};

