import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { GiShoppingBag } from "react-icons/gi";
import { IconContext } from "react-icons/lib";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  useEffect(() => {
    dispatch(clearCart());
  }, []);
  return (
    <IconContext.Provider value={{ color: "#f2cc8f", size: "5em " }}>
      <div>
        <div className="flex justify-center items-center flex-col m-6">
          <div className="m-6">
            <GiShoppingBag />
          </div>
          <div>
            <p className="text-center">Hey, {user?.name}</p>
            <p className="font-bold text-2xl text-center">
              Your Order is Confirmed!
            </p>
            <p className="text-sm w-[50ch] text-center">
              Thank you for your purchase. We’re excited to let you know that
              your order is being processed and will soon be on its way!
            </p>
          </div>
          <div className="m-6">
            <button className="mx-4  text-[#f2cc8f] bg-black rounded-md ">
              View Order
            </button>
            <Link to={"/"}>
              <button className="mx-4  bg-[#f2cc8f] text-black rounded-md ">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default OrderSuccess;
