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
import electronic from "../assets/electronics.png";
import clothesandshoes from "../assets/clothesandshoes.png";
import homeandkitchen from "../assets/homeandkitchen.png";
import beautyandcare from "../assets/beautyandcare.png";
import sports from "../assets/sports.png";
import toysandgames from "../assets/toysandgames.png";
import books from "../assets/book.png";
import automotive from "../assets/automotive.png";
import healthandwellness from "../assets/healthandwellness.png";
import officesupplies from "../assets/officesupplies.png";
import food from "../assets/food.png";
import all from "../assets/all.png";
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
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(getAllProducts())}
        >
          <img src={all} />
          <p>All Products</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("Electronics"))}
        >
          <img src={electronic} />
          <p>Electronics</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("Food"))}
        >
          <img src={food} />
          <p>Food</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("ClothingandAccessories"))}
        >
          <img src={clothesandshoes} />
          <p>Clothing & Accessories</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("HomeandKitchen"))}
        >
          <img src={homeandkitchen} />
          <p>Home & Kitchen</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("BeautyandPersonal Care"))}
        >
          <img src={beautyandcare} />
          <p>Beauty & Personal Care</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("SportsandOutdoors"))}
        >
          <img src={sports} />
          <p>Sports & Outdoors</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("ToysandGames"))}
        >
          <img src={toysandgames} />
          <p>Toys & Games</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("Books"))}
        >
          <img src={books} />
          <p>Books</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("Automotive"))}
        >
          <img src={automotive} />
          <p>Automotive</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("HealthandWellness"))}
        >
          <img src={healthandwellness} />
          <p>Health & Wellness</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => dispatch(filterProducts("Office Supplies"))}
        >
          <img src={officesupplies} />
          <p>Office Supplies</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
