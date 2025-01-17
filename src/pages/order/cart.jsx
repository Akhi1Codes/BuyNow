import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import OrderStatus from "../../components/order/orderStatus";

const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartSlice);
  const { isAuthenticated } = useSelector((state) => state.authSlice);
  const products = data.cart;
  return (
    <>
      <div className="flex justify-center items-center ">
        <OrderStatus currentStep={1} />
      </div>
      <div className="flex justify-center  p-2 mb-4 ">
        <div className="md:w-[50%]">
          <p className="font-bold text-3xl text-center mb-6">Your Cart</p>
          {products?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg font-semibold">Your cart is empty</p>
              <p className="text-sm text-gray-600">
                Looks like you haven't added anything to your cart yet. Go ahead
                and
              </p>
              <Link to={"/"}>
                <p>continue shopping!</p>
              </Link>
            </div>
          ) : (
            products?.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center mb-4 border-b border-gray-500 pb-4"
              >
                <div className="flex items-center w-[60%]">
                  <div className="w-20">
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs">{product.seller}</p>
                    <p className="font-semibold">${product.price}</p>
                  </div>
                </div>
                <div className="flex items-center ">
                  <select
                    className="p-1 px-4 border rounded w-full"
                    value={product.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: product._id,
                          quantity: parseInt(e.target.value),
                        })
                      )
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => dispatch(removeFromCart({ id: product._id }))}
                >
                  <MdDeleteForever />
                </div>
              </div>
            ))
          )}
          {products?.length > 0 && (
            <Link to={isAuthenticated ? "/shipping" : "/login"}>
              <button className="bg-[#f2cc8f] text-black py-2 px-6 rounded-md float-right">
                Proceed
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
