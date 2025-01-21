import { LazyLoadImage } from "react-lazy-load-image-component"
import { placeHolder } from "../../assets/images"

export const ProductCard1 = ({ imageSrc, title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
            <div className="aspect-w-1 aspect-h-1 w-full">
                <LazyLoadImage placeholderSrc={placeHolder} src={imageSrc} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex flex-col items-center">
                <h2 className="font-poppins text-lg font-semibold text-gray-800">{title}</h2>
                <p className="font-poppins text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    )
}