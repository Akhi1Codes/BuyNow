import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNewOrderMutation } from "../../redux/api/orderApi";
import { GiShoppingBag } from "react-icons/gi";
import { IconContext } from "react-icons/lib";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const { user, userDetails, orderDetails } = useSelector(
    (state) => state.authSlice
  );
  const cartporducts = useSelector((state) => state.cartSlice);
  const products = cartporducts.cart;
  const [order, { data, isLoading }] = useNewOrderMutation();
  const id = data?.order._id;
  console.log(data);

  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = (userDetails?.taxAndShipping.tax / 100) * subtotal; // Assuming tax is a percentage
  const shippingPrice = userDetails?.taxAndShipping.shipping || 0;
  const totalPrice = subtotal + tax + shippingPrice;

  useEffect(() => {
    const currentDateTime = new Date().toISOString();
    if (products.length > 0) {
      const orderInfo = {
        shippingInfo: {
          address: userDetails?.details.address,
          city: userDetails?.details.city,
          phoneNo: userDetails?.details.phNumber,
          postalCode: userDetails?.details.postalCode,
          country: userDetails?.selectedCountry,
        },
        orderItems: products.map((item) => ({
          name: item?.name,
          quantity: item?.quantity,
          image: item?.images[0].url,
          price: item?.price,
          product: item?._id,
        })),
        paymentInfo: {
          id: orderDetails?.sessionId,
          status: "Paid",
        },
        paidAt: currentDateTime,
        taxPrice: tax,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        orderStatus: "Order Confirmed",
        deliveredAt: null, // Not yet delivered
        createdAt: currentDateTime,
      };

      order(orderInfo)
        .unwrap()
        .then(() => {
          dispatch(clearCart());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [order, dispatch, products, user]);
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
            <p className="text-sm md:w-[50ch] text-center">
              Thank you for your purchase. We’re excited to let you know that
              your order is being processed and will soon be on its way!
            </p>
          </div>
          <div className="my-6 flex justify-around w-full">
            <Link to={`/order-details/${id}`}>
              <button className="  text-[#f2cc8f] bg-black rounded-md ">
                View Order
              </button>
            </Link>
            <Link to={"/"}>
              <button className=" bg-[#f2cc8f] text-black rounded-md ">
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
