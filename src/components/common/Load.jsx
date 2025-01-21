import Lottie from 'lottie-react';
import loading from '../../assets/LoadingAnimate.json';

export const Load = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-96 xl:h-96">
                <Lottie animationData={loading} loop={true} />
            </div>
        </div>
    );
};

