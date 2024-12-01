import { CgComponents, CgGames } from "react-icons/cg";
import {
  MdElectricalServices,
  MdOutlineFastfood,
  MdBusinessCenter,
  MdFitnessCenter,
  MdOutlineSports,
} from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { GiClothes, GiAutoRepair } from "react-icons/gi";
import { FaKitchenSet } from "react-icons/fa6";
import { RiBrushFill } from "react-icons/ri";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/categorySlice";
import { clearSearched } from "../redux/slices/searchSlice";

const HeaderNav = () => {
  const dispatch = useDispatch();
  function handleClick(category) {
    dispatch(setCategory(category));
    dispatch(clearSearched());
  }
  return (
    <IconContext.Provider value={{ color: "white", size: "2.5em " }}>
      <div className="lg:flex lg:justify-center scroll p-2 flex gap-6 whitespace-nowrap overflow-x-scroll font-light text-sm">
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick()}
        >
          <CgComponents />
          <p>All Products</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Electronics")}
        >
          <MdElectricalServices />
          <p>Electronics</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Food")}
        >
          <MdOutlineFastfood />
          <p>Food</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Clothing")}
        >
          <GiClothes />
          <p>Clothing</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Kitchen")}
        >
          <FaKitchenSet />
          <p>Kitchen</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Beauty")}
        >
          <RiBrushFill />
          <p>Beauty Care</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Sports")}
        >
          <MdOutlineSports />
          <p>Sports</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("ToysandGames")}
        >
          <CgGames />
          <p>Toys & Games</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Books")}
        >
          <ImBooks />
          <p>Books</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Automotive")}
        >
          <GiAutoRepair />
          <p>Automotive</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("Fitness")}
        >
          <MdFitnessCenter />
          <p>Fitness</p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-20"
          onClick={() => handleClick("OfficeSupplies")}
        >
          <MdBusinessCenter />
          <p>Office Supplies</p>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default HeaderNav;
