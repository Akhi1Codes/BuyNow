import {useState, useEffect} from "react";

const useIsSmallScreen = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    if (isSmallScreen === null) {
        return null;
    }
    return isSmallScreen;
};

export default useIsSmallScreen;
