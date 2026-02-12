import Lottie from 'lottie-react';
import LoaderAnimation from '../assets/images/IsometricLoader.json';

const Loader = () => {
    return (
        <Lottie animationData={LoaderAnimation}
            loop
            style={{ width: 80, height: 80 }}
        />
    );
};

export default Loader;