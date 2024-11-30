import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/authSlice";
import { searchProducts } from "../redux/productSlice";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { MdShoppingCart, MdOutlineSearch } from "react-icons/md";
import { IconContext } from "react-icons/lib";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { isAuthenticated, data } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    dispatch(searchProducts(keyword));
  };

  const handleopenSearch = () => {
    const searchBar = searchRef.current;
    searchBar.classList.toggle("hidden");
  };

  const logOut = () => {
    dispatch(userLogout());
    navigate("/");
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
                  <button onClick={handleSearch}>Search</button>
                </div>
                <div className="flex gap-2 items-center ">
                  <div className="flex items-center">
                    <MdShoppingCart />
                    <p className="bg-[#f2cc8f] px-2 rounded-sm text-black flex font-semibold">
                      0
                    </p>
                  </div>
                  <div className="md:hidden" onClick={handleopenSearch}>
                    <MdOutlineSearch />
                  </div>
                </div>
                <div className="px-2 flex justify-center items-center ">
                  {isAuthenticated && data?.success ? (
                    <img
                      width={35}
                      className="rounded-full h-[35px]"
                      src={data?.user.avatar.url}
                      alt={data?.user.name}
                      onClick={() => setToggle(!toggle)}
                    />
                  ) : (
                    <Link to="/login">
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
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </nav>
          <div>
            {isAuthenticated && data && toggle ? (
              <ul className="bg-[#0d0e14] w-fit p-4 absolute right-0 top-12 cursor-pointer z-50">
                {/* set !toggle to close the menu on selecting an item(auto close) */}
                <Link to="me" onClick={() => setToggle(!toggle)}>
                  <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                    Profile
                  </li>
                </Link>
                <Link to="orders" onClick={() => setToggle(!toggle)}>
                  <li className="p-4 px-8 border-b-2  border-[#1a1b25]">
                    Orders
                  </li>
                </Link>
                <li className="p-4 px-8 " onClick={() => logOut()}>
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
