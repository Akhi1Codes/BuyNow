import React, {createContext, useState, useContext, useEffect} from "react";
import useIsSmallScreen from "../hooks/useIsSmallScreen.jsx";

const SidebarContext = createContext();

export const SidebarProvider = ({children}) => {
    const isSmallScreen = useIsSmallScreen();
    const [isOpen, setIsOpen] = useState(isSmallScreen);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!isSmallScreen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [isSmallScreen]);

    return (
        <SidebarContext.Provider value={{isOpen, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
