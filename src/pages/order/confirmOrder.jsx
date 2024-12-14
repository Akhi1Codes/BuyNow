import OrderStatus from "../../components/order/orderStatus";
import { useDispatch, useSelector } from "react-redux";
import { useUserCheckoutMutation } from "../../redux/api/orderApi";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { user, userDetails } = useSelector((state) => state.authSlice);
  const data = useSelector((state) => state.cartSlice);
  const products = data.cart;
  const [userCheckout, { isLoading }] = useUserCheckoutMutation();

  const shippingCost = Number(userDetails?.taxAndShipping?.shipping || 0);
  const tax = Number(userDetails?.taxAndShipping?.tax || 0);

  const subtotalPrice = (products) => {
    return products
      .reduce((total, product) => {
        return total + product.price * (product.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  const totalPrice = () => {
    const subtotal = Number(subtotalPrice(products));
    return parseFloat((subtotal + shippingCost + tax).toFixed(2));
  };

  const checkout = async () => {
    try {
      const orderData = {
        line_items: products.map((product) => ({
          product_name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
        })),
        shipping: {
          shippingAmount: shippingCost,
        },
        tax: {
          amount: tax,
        },
      };
      const response = await userCheckout(orderData).unwrap();
      const { paymentUrl } = response;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
      console.log("Order successful");
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  const productAmount = () => {};
  return (
    <div>
      <div className="flex justify-center items-center ">
        <OrderStatus currentStep={3} />
      </div>
      <div className="md:flex justify-evenly">
        <div className="p-4">
          <div>
            <p className="text-2xl font-bold py-2 ">Shipping Info</p>
            <div className="py-4 px-2">
              <p className="font-semibold">Name : {user?.name}</p>
              <p className="font-semibold">
                Phone : {userDetails?.details.phNumber}
              </p>
              <p className="font-semibold">
                Address : {userDetails?.details.address},
                {userDetails?.details.city},{userDetails?.details.postalCode},
                {userDetails?.selectedCountry}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-500">
            <p className="text-2xl font-bold py-4">Your Cart items:</p>
          </div>
          {products?.map((product) => (
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
                  <p className="text-sm">{product.name}</p>
                </div>
              </div>
              <div className="flex">
                <p>{product.quantity} x &nbsp;</p>
                <p> ${product.price} = &nbsp;</p>
                <p className="font-semibold">
                  ${product.quantity * product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="p-4 px-8 m-2 border rounded-lg  border-gray-500">
            <div className="border-b border-gray-500">
              <p className="text-2xl font-bold py-4">Order Summary</p>
            </div>
            <div className="py-4">
              <div className="flex justify-between">
                <p className="font-semibold">Subtotal : </p>
                <p>${subtotalPrice(products)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Shipping :</p>
                <p>${userDetails?.taxAndShipping.shipping}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Tax :</p>
                <p>${userDetails?.taxAndShipping.tax}</p>
              </div>
            </div>
            <div className="flex justify-between border-y py-2 border-gray-500">
              <p className="font-semibold">Total : </p>
              <p>${totalPrice()}</p>
            </div>
            <div>
              <button
                className="my-4 w-full  bg-[#f2cc8f] text-black rounded-md "
                onClick={checkout}
                disabled={isLoading}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
