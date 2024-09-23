import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ name, price, id, image, seller }) => {
  const randomNumber = Math.round(Math.random() * 70) + 1;
  return (
    <div>
      <div className="w-[170px] bg-[#0d0e14] shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Link to={`product/${id}`}>
          <img
            src={image[0].url}
            alt="Product"
            className="h-36 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-[170px]">
            <p className="text-gray-400 mr-3 uppercase text-xs truncate">
              {seller}
            </p>
            <p className="text-lg font-bold text-white truncate block capitalize">
              {name}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-white cursor-auto my-3">
                ${price}
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  ${price + randomNumber}
                </p>
              </del>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
