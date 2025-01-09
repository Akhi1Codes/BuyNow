import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {RiMenu3Line} from "react-icons/ri";
import {useSidebar} from "../../context/SidebarContext.jsx";

function Navbar() {
    const [toggle, setToggle] = useState(false);
    const {toggleSidebar} = useSidebar();
    const userData = useSelector((state) => state.authSlice);


    return (
        <div className="flex justify-between p-4 bg-[#0d0e14] sticky top-0">
            <div className="flex items-center justify-between gap-2">
                <RiMenu3Line onClick={toggleSidebar} className="md:hidden"/>
                <div className="text-xl md:text-2xl font-bold">Products</div>
            </div>
            <div className="pl-2 flex justify-center items-center">
                <img
                    width={35}
                    className="rounded-full h-[35px] cursor-pointer relative"
                    src={userData ? userData.user.avatar.url : null}
                    alt={userData ? userData.user.name : null}
                    onClick={() => setToggle(!toggle)}
                />
            </div>
            {userData.isAuthenticated && toggle ? (
                <ul className="bg-[#0d0e14] w-fit p-4  absolute right-0 top-14 cursor-pointer z-50">
                    <Link to="/" onClick={() => setToggle(!toggle)}>
                        <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                            Home
                        </li>
                    </Link>
                    <Link to="/me" onClick={() => setToggle(!toggle)}>
                        <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                            Profile
                        </li>
                    </Link>
                    {userData.user.role === "admin" && (
                        <Link to="/admin" onClick={() => setToggle(!toggle)}>
                            <li className="p-4 px-8  border-[#1a1b25]">
                                Admin Portal
                            </li>
                        </Link>
                    )}
                </ul>
            ) : (
                ""
            )}
        </div>
    );
}

export default Navbar;