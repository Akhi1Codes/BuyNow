import { filterProducts, getAllProducts } from "../redux/productSlice";
import { useDispatch } from "react-redux";
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

const HeaderNav = () => {
  const dispatch = useDispatch();
  return (
    <IconContext.Provider value={{ color: "white", size: "2.5em " }}>
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
    </IconContext.Provider>
  );
};

export default HeaderNav;
