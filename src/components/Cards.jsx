import React from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons/lib";

const Cards = ({ name, price, id, image, seller }) => {
  return (
    <IconContext.Provider value={{ color: "white", size: "1.2em " }}>
      <div>
        <div className="w-[200px] bg-[#0d0e14] shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <Link to={`product/${id}`}>
            <img
              src={image[0].url}
              alt="Product"
              className="h-36 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 ">
              <p className="text-gray-400 mr-3 uppercase text-xs truncate">
                {seller}
              </p>
              <p className="text-lg font-bold text-white truncate block capitalize">
                {name}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-white cursor-auto my-3">
                  ${price}
                </p>
                <MdAddShoppingCart />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Cards;
