import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/authSlice";
import {
  searchProducts,
  filterProducts,
  getAllProducts,
} from "../redux/productSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgComponents, CgGames } from "react-icons/cg";
import {
  MdElectricalServices,
  MdOutlineFastfood,
  MdBusinessCenter,
  MdFitnessCenter,
  MdOutlineSports,
  MdShoppingCart,
} from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { GiClothes, GiAutoRepair } from "react-icons/gi";
import { FaKitchenSet } from "react-icons/fa6";
import { RiBrushFill } from "react-icons/ri";
import { IconContext } from "react-icons/lib";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, data } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    dispatch(searchProducts(keyword));
  };

  const logOut = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <IconContext.Provider value={{ color: "white", size: "2.5em " }}>
      <div className="sticky top-0 z-50 bg-[#0d0e14]">
        <div className="flex justify-center">
          <nav className="  grid grid-cols-[1fr_min-content_max-content] gap-3  grid-rows-2 p-3 w-full md:flex md:w-[90%]">
            <Link to="/">
              <h1 className="text-3xl font-mono font-bold pr-4 text-white col-start-3">
                BuyNow
              </h1>
            </Link>
            <div className=" flex row-start-2 col-span-3 md:col-start-2 grow">
              <input
                type="text"
                placeholder="Search for products..."
                className="p-1 rounded-md grow "
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              ></input>
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="flex px-2 items-center ">
              <h6 className="px-1">Cart</h6>
              <p className="bg-[#f2cc8f] px-2 rounded-sm text-black flex">0</p>
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
        <div className="lg:flex lg:justify-center scroll p-2 flex gap-6 whitespace-nowrap overflow-x-scroll font-light text-sm">
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(getAllProducts())}
          >
            <CgComponents />
            <p>All Products</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("Electronics"))}
          >
            <MdElectricalServices />
            <p>Electronics</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("Food"))}
          >
            <MdOutlineFastfood />
            <p>Food</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("ClothingandAccessories"))}
          >
            <GiClothes />
            <p>Clothing</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("HomeandKitchen"))}
          >
            <FaKitchenSet />
            <p>Kitchen</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("BeautyandPersonal Care"))}
          >
            <RiBrushFill />
            <p>Beauty Care</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("SportsandOutdoors"))}
          >
            <MdOutlineSports />
            <p>Sports</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("ToysandGames"))}
          >
            <CgGames />
            <p>Toys & Games</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("Books"))}
          >
            <ImBooks />
            <p>Books</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("Automotive"))}
          >
            <GiAutoRepair />
            <p>Automotive</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("HealthandWellness"))}
          >
            <MdFitnessCenter />
            <p>Fitness</p>
          </div>
          <div
            className="flex flex-col items-center justify-center cursor-pointer w-20"
            onClick={() => dispatch(filterProducts("Office Supplies"))}
          >
            <MdBusinessCenter />
            <p>Office Supplies</p>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Header;
