import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import OrderStatus from "../../components/order/orderStatus";

const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartSlice);
  const products = data.cart;
  const calculateTotal = (products) => {
    return products
      .reduce((total, product) => {
        return total + product.price * (product.quantity || 1);
      }, 0)
      .toFixed(2);
  };
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
                and shop!
              </p>
            </div>
          ) : (
            products?.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center mb-4 border-b pb-4"
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
            <div className="flex justify-between items-center mt-6">
              <div className="font-semibold">
                <p className="text-2xl">
                  Total:{" "}
                  <span className="px-1">${calculateTotal(products)}</span>
                </p>
              </div>
              <Link to="/shipping">
                <button className="bg-[#f2cc8f] text-white py-2 px-6 rounded-md">
                  Proceed
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
