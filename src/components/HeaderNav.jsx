import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const HeaderNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All Products");

  function handleClick(category) {
    setActiveTab(category || "All Products");
    navigate("/");
    dispatch(setCategory(category));
    dispatch(clearSearched());
  }
  return (
    <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
      <div className="lg:flex lg:justify-center scroll p-2 flex gap-6 whitespace-nowrap overflow-x-scroll font-light text-sm">
        {[
          { label: "All Products", icon: <CgComponents />, category: null },
          {
            label: "Electronics",
            icon: <MdElectricalServices />,
            category: "Electronics",
          },
          { label: "Food", icon: <MdOutlineFastfood />, category: "Food" },
          { label: "Clothing", icon: <GiClothes />, category: "Clothing" },
          { label: "Kitchen", icon: <FaKitchenSet />, category: "Kitchen" },
          { label: "Beauty Care", icon: <RiBrushFill />, category: "Beauty" },
          { label: "Sports", icon: <MdOutlineSports />, category: "Sports" },
          {
            label: "Toys & Games",
            icon: <CgGames />,
            category: "ToysandGames",
          },
          { label: "Books", icon: <ImBooks />, category: "Books" },
          {
            label: "Automotive",
            icon: <GiAutoRepair />,
            category: "Automotive",
          },
          { label: "Fitness", icon: <MdFitnessCenter />, category: "Fitness" },
          {
            label: "Office Supplies",
            icon: <MdBusinessCenter />,
            category: "OfficeSupplies",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center cursor-pointer w-20 ${
              activeTab === item.label
                ? "text-[#f2cc8f] font-semibold"
                : "text-white"
            }`}
            onClick={() => handleClick(item.category)}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </IconContext.Provider>
  );
};

export default HeaderNav;
