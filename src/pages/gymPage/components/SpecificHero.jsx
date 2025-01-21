import { LazyLoadImage } from "react-lazy-load-image-component"

export const SpecificHero = () => {
    return (
        <>
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center filter z-0"
                    style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/01/09/11/30/dumbbell-1966247_1280.jpg')" }}
                ></div>

                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative flex items-center justify-center">
                    <LazyLoadImage
                        src="https://cdn-icons-png.flaticon.com/512/952/952816.png"
                        alt="hero"
                        className="w-40 h-40 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
                    />
                </div>
            </div>
        </>
    )
}