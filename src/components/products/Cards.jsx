import React from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart, MdCheck } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const Cards = ({ name, price, id, image, seller, product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);

  const isProductInCart = cart.some((item) => item._id === product._id);
  return (
    <IconContext.Provider value={{ color: "white", size: "1.2em " }}>
      <div>
        <div className="w-[170px] md:w-[200px] bg-[#0d0e14] shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <Link to={`product/${id}`}>
            <img
              src={image[0].url}
              alt="Product"
              className="h-36 w-72 object-cover rounded-t-xl"
            />
          </Link>
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
              <div
                className={`cursor-pointer ${
                  !isProductInCart ? "text-gray-500" : "text-white"
                }`}
                onClick={() => {
                  if (!isProductInCart) {
                    dispatch(addToCart(product));
                  }
                }}
              >
                {isProductInCart ? <MdCheck /> : <MdAddShoppingCart />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Cards;
