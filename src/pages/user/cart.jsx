import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart } from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartSlice);
  const products = data.cart;
  return (
    <div>
      <div>
        <div>
          <div className="flex justify-between">
            <p className="font-bold text-3xl">Your Cart</p>
            <Link to={"/"}>
              <p className="underline text-sm">Back to shoping</p>
            </Link>
          </div>
          {products?.map((product) => (
            <div className="flex m-4" key={product._id}>
              <div className=" w-20">
                <img
                  src={product.images[0].url}
                  className=" object-cover"
                ></img>
              </div>
              <div className="flex justify-between content-center w-full px-2">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-xs">{product.seller}</p>
                  <p className="font-semibold">${product.price}</p>
                </div>
                <div>
                  <select className="p-1 px-2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div
                  onClick={() => dispatch(removeFromCart({ id: product._id }))}
                >
                  <MdDeleteForever />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Cart;
