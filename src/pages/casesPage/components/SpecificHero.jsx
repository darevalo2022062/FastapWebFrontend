import { LazyLoadImage } from "react-lazy-load-image-component"

export const SpecificHero = () => {
    return (
        <>
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center filter z-0"
                    style={{ backgroundImage: "url('https://i.ibb.co/BTWbjqw/image.png')" }}
                ></div>

                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative flex items-center justify-center">
                    <LazyLoadImage
                        src="https://i.ibb.co/YNMJqh5/Mesa-de-trabajo-1-Fas-Tap-LOGO-Original-PNG.png"
                        alt="hero"
                        className="w-40 h-40 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
                    />
                </div>
            </div>
        </>
    )
}