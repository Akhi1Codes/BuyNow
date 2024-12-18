import { useLoaderData } from "react-router-dom";
import { useUserOrderDetailsQuery } from "../../redux/api/orderApi";
import Loader from "../../components/Loader";

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

const orderDetails = () => {
  const { id } = useLoaderData();
  const { data, isLoading } = useUserOrderDetailsQuery(id);
  const order = data?.order;
  const orderItems = data?.order.orderItems;
  let currentStep = 2;
  const getStepStyle = (step) => {
    return step <= currentStep
      ? "text-[#f2cc8f] font-semibold"
      : "text-gray-500 font-semibold";
  };

  const getLineStyle = (step) => {
    return step < currentStep ? "bg-[#f2cc8f]" : "bg-gray-500";
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="md:flex my-4 mx-2">
      <div className="grow">
        <p className="font-bold text-xl">Items Ordered & Delivery Details</p>
        <div className="flex justify-between items-center gap-4 m-12 ">
          <p className={`${getStepStyle(1)} text-nowrap text-sm`}>
            Order Confirmed
          </p>
          <div className={`flex-1 w-10 h-1 ${getLineStyle(1)}`}></div>
          <p className={`${getStepStyle(2)} text-sm`}>Pending</p>
          <div className={`flex-1 w-10 h-1 ${getLineStyle(2)}`}></div>
          <p className={`${getStepStyle(3)} text-nowrap text-sm`}>Delivered</p>
        </div>
        <div>
          {orderItems?.map((item) => {
            return (
              <div
                key={item._id}
                className="p-3 border-dotted border m-2 rounded-md"
              >
                <div className="flex gap-2">
                  <div className="w-20">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-light">{item?.name}</p>
                    <p className="font-extralight">
                      Qty :
                      <span className="font-semibold">{item?.quantity}</span>
                    </p>
                    <p className="font-semibold">
                      ${item?.price * item?.quantity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:pl-6">
        <div>
          <p className="font-bold text-xl">Delivery Address</p>
          <div className="p-4 border border-dotted rounded-md my-4">
            <div className="text-sm font-semibold">
              <p>{order?.shippingInfo.address}</p>
              <p>
                {order?.shippingInfo.city}, {order?.shippingInfo.postalCode}
              </p>
              <p>{order?.shippingInfo.country}</p>
            </div>

            <p>PH : {order?.shippingInfo.phoneNo}</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl">Payment Details</p>
          <div className="m-2">
            {order?.orderItems?.map((item) => {
              return (
                <div className="flex justify-between p-1" key={item._id}>
                  <p className="font-extralight text-sm">{item?.name}</p>
                  <p className="font-extralight text-sm">
                    ${item?.price * item?.quantity}
                  </p>
                </div>
              );
            })}
            <div>
              <div className="flex justify-between p-1">
                <p className="font-extralight text-sm">Tax : </p>
                <p className="font-extralight text-sm">${order?.taxPrice}</p>
              </div>
              <div className="flex justify-between p-1">
                <p className="font-extralight text-sm">Shipping : </p>
                <p className="font-extralight text-sm">
                  ${order?.shippingPrice}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-1 border-t border-dotted">
              <p>Total</p>
              <p>${order?.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderDetails;
