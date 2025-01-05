import {useState, useLayoutEffect} from "react";

const useIsSmallScreen = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Check if screen width is less than 768px
        };

        handleResize(); // Check screen size on initial load
        window.addEventListener("resize", handleResize); // Add resize event listener

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isSmallScreen;
};

export default useIsSmallScreen;
