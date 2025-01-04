import React, { createContext, useState, useContext, useEffect } from "react";
import useIsSmallScreen from "../hooks/useIsSmallScreen.jsx"; // Import the custom hook

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const isSmallScreen = useIsSmallScreen(); // Use the custom hook to get screen size info
    const [isOpen, setIsOpen] = useState(isSmallScreen); // Set initial state based on screen size

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    // Update the sidebar state when screen size changes
    useEffect(() => {
        if (!isSmallScreen) {
            setIsOpen(true); // Ensure sidebar is open on large screens
        } else {
            setIsOpen(false); // Ensure sidebar is closed on small screens
        }
    }, [isSmallScreen]);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
