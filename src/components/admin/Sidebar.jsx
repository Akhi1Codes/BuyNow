import {Link} from "react-router-dom";
import {MdShoppingBag} from "react-icons/md";
import {IconContext} from "react-icons/lib";
import {useSidebar} from "../../context/SidebarContext.jsx";
import {MdOutlineClose} from "react-icons/md";
import {FaUserAlt} from "react-icons/fa";
import useIsSmallScreen from "../../hooks/useIsSmallScreen.jsx";

const Sidebar = () => {
    const {isOpen, toggleSidebar} = useSidebar();
    const isSmallScreen = useIsSmallScreen();
    return (
        isOpen ? (
            <IconContext.Provider value={{color: "white", size: "1.1em"}}>
                <div
                    className="px-6 w-full md:w-[25%] h-[100vh] bg-[#0d0e14] top-0 bottom-0 z-20 md:z-0 fixed md:sticky left-0">
                    <div className="flex justify-between items-center w-full">
                        <Link to="/">
                            <h1 className="text-2xl md:text-3xl font-mono font-bold my-6 text-white mr-auto">
                                BuyNow
                            </h1>
                        </Link>
                        <div className="md:hidden">
                            <MdOutlineClose onClick={toggleSidebar}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center py-8">
                        <Link to="/admin">
                            <div className="flex items-center">
                                <MdShoppingBag/>
                                <p className="ml-2">Products</p>
                            </div>
                        </Link>
                        <Link to="/admin/customers">
                            <div className="flex items-center">
                                <FaUserAlt/>
                                <p className="ml-2">Customers</p>
                            </div>
                        </Link>
                        <Link to="/admin/orders">
                            <div className="flex items-center">
                                <FaUserAlt/>
                                <p className="ml-2">Orders</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </IconContext.Provider>
        ) : null
    );
};

export default Sidebar;
