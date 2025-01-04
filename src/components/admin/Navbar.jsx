import React, {useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Link,useNavigate} from "react-router-dom";
import {logout} from "../../redux/slices/authSlice.js";
import {authApi} from "../../redux/api/authApi.js";
import { useLogoutUserMutation } from "../../redux/api/authApi.js";
import { RiMenu3Line } from "react-icons/ri";
import {useSidebar} from "../../context/SidebarContext.jsx";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const { toggleSidebar } = useSidebar();
    const userData = useSelector((state) => state.authSlice);
    const [logoutQuery] = useLogoutUserMutation();
    const handleLogout = async () => {
        try {
            dispatch(logout());
            await logoutQuery().unwrap();
            dispatch(authApi.util.resetApiState());
            navigate("/");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="flex justify-between p-4 bg-[#0d0e14] sticky top-0">
            <div className="flex items-center justify-between gap-2" >
                <RiMenu3Line onClick={toggleSidebar} className="md:hidden"/>
            <div className="text-xl md:text-2xl font-bold">Products</div>
            </div>
            <div className="pl-2 flex justify-center items-center">
                <img
                    width={35}
                    className="rounded-full h-[35px] cursor-pointer relative"
                    src={userData?.user.avatar.url}
                    alt={userData?.user.name}
                    onClick={() => setToggle(!toggle)}
                />
            </div>
            {userData.isAuthenticated && toggle ? (
                <ul className="bg-[#0d0e14] w-fit p-4  absolute right-0 top-14 cursor-pointer z-50">
                    {/* set !toggle to close the menu on selecting an item(auto close) */}
                    <Link to="/me" onClick={() => setToggle(!toggle)}>
                        <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                            Profile
                        </li>
                    </Link>
                    <Link to="/cart" onClick={() => setToggle(!toggle)}>
                        <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                            Cart
                        </li>
                    </Link>
                    <Link to="/orders" onClick={() => setToggle(!toggle)}>
                        <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                            Orders
                        </li>
                    </Link>
                    {userData.user.role === "admin" && (
                        <Link to="/admin" onClick={() => setToggle(!toggle)}>
                            <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                                Admin Portal
                            </li>
                        </Link>
                    )}
                    <li className="p-4 px-8 " onClick={() => handleLogout()}>
                        Logout
                    </li>
                </ul>
            ) : (
                ""
            )}
        </div>
    );
}

export default Navbar;