import { Link, useNavigate } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { useState, useRef } from "react";
import { MdShoppingCart, MdOutlineSearch } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { setSearched } from "../redux/slices/searchSlice";
import { useLogoutUserMutation } from "../redux/api/authApi";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authSlice);
  const data = useSelector((state) => state.cartSlice);
  const [logoutQuery] = useLogoutUserMutation();
  const searchRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleopenSearch = () => {
    const searchBar = searchRef.current;
    searchBar.classList.toggle("hidden");
  };

  function handleSearch() {
    dispatch(setSearched(keyword));
  }

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await logoutQuery().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <IconContext.Provider value={{ color: "white", size: "1.5em " }}>
      <div className="sticky top-0 z-50 bg-[#0d0e14]">
        <div className="flex justify-center">
          <nav className="p-3 flex w-full  md:w-[90%] gap-2 md:gap-3 justify-between flex-col">
            <div className="flex justify-between md:w-full md:gap-1">
              <Link to="/">
                <h1 className="text-3xl font-mono font-bold pr-4 text-white mr-auto">
                  BuyNow
                </h1>
              </Link>
              <div className="flex md:w-full md:gap-3">
                <div className="hidden md:flex m-0 grow ">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="p-1 rounded-md grow"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  ></input>
                  <button onClick={() => handleSearch()}>Search</button>
                </div>
                <div className="flex gap-2 items-center ">
                  <div className="flex items-center">
                    <MdShoppingCart />
                    <p className="bg-[#f2cc8f] px-2 rounded-sm text-black flex font-semibold">
                      {data.NoOfProducts}
                    </p>
                  </div>
                  <div
                    className="md:hidden cursor-pointer"
                    onClick={handleopenSearch}
                  >
                    <MdOutlineSearch />
                  </div>
                </div>
                <div className="px-2 flex justify-center items-center ">
                  {userData.isAuthenticated ? (
                    <img
                      width={35}
                      className="rounded-full h-[35px] cursor-pointer"
                      src={userData?.user.avatar.url}
                      alt={userData?.user.name}
                      onClick={() => setToggle(!toggle)}
                    />
                  ) : (
                    <Link to={"/login"}>
                      <button className="text-white">Login</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:hidden m-0 " ref={searchRef}>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="p-1 rounded-md grow"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                ></input>
                <button onClick={() => handleSearch()}>Search</button>
              </div>
            </div>
          </nav>
          <div>
            {userData.isAuthenticated && toggle ? (
              <ul className="bg-[#0d0e14] w-fit p-4  absolute right-0 top-12 cursor-pointer z-50">
                {/* set !toggle to close the menu on selecting an item(auto close) */}
                <Link to="me" onClick={() => setToggle(!toggle)}>
                  <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                    Profile
                  </li>
                </Link>
                <Link to="orders" onClick={() => setToggle(!toggle)}>
                  <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                    Cart
                  </li>
                </Link>
                {userData.user.role == "admin" && (
                  <Link to="adminportal" onClick={() => setToggle(!toggle)}>
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
        </div>
        <HeaderNav />
      </div>
    </IconContext.Provider>
  );
};

export default Header;
