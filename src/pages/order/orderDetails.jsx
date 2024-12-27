import { useLoaderData } from "react-router-dom";
import { useUserOrderDetailsQuery } from "../../redux/api/orderApi";
import { useProductReviewMutation } from "../../redux/api/productApi";
import Loader from "../../components/Loader";
import { useState } from "react";

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

const OrderDetails = () => {
  const { id } = useLoaderData();
  const { data, isLoading, refetch } = useUserOrderDetailsQuery(id);
  const [review] = useProductReviewMutation();
  const [reviewStates, setReviewStates] = useState({}); // State for all reviews

  const order = data?.order;
  const orderItems = data?.order.orderItems;

  const stepMap = {
    "Order Confirmed": 1,
    Pending: 2,
    Delivered: 3,
  };

  const currentStep = stepMap[order?.orderStatus];

  const getStepStyle = (step) =>
    step <= currentStep
      ? "text-[#f2cc8f] font-semibold"
      : "text-gray-500 font-semibold";

  const getLineStyle = (step) =>
    step < currentStep ? "bg-[#f2cc8f]" : "bg-gray-500";

  const handleReviewChange = (id, field, value) => {
    setReviewStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const submitReview = async (id) => {
    const productReview = reviewStates[id];
    if (!productReview?.rating || !productReview?.comment) {
      alert("Please provide a rating and a comment.");
      return;
    }

    const results = await review({
      rating: productReview.rating,
      comment: productReview.comment,
      productId: id,
    });
    if (results?.data.success) {
      refetch();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="md:flex md:mx-10 my-4 mx-2">
      <div className="grow">
        <p className="font-bold text-xl">Items Ordered & Delivery Details</p>
        <div className="flex justify-between items-center gap-4 m-5 md:m-12">
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
            const productReview = reviewStates[item.product] || {
              rating: 1,
              comment: "",
            };
            return (
              <div
                key={item._id}
                className="p-3 border-dotted border m-2 rounded-md"
              >
                <div className="flex gap-6">
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
                    {order?.orderStatus === "Delivered" && (
                      <>
                        <p className="text-xs">Rate the product:</p>
                        <div className="flex gap-2 py-2">
                          <select
                            className="text-xs"
                            value={productReview.rating}
                            onChange={(e) =>
                              handleReviewChange(
                                item.product,
                                "rating",
                                Number(e.target.value)
                              )
                            }
                          >
                            {[1, 2, 3, 4, 5].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Review the product"
                            className="text-xs border p-1"
                            value={productReview.comment || ""}
                            onChange={(e) =>
                              handleReviewChange(
                                item.product,
                                "comment",
                                e.target.value
                              )
                            }
                          />
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                            onClick={() => submitReview(item.product)}
                          >
                            Submit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:pl-6 md:w-[30%]">
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
                <div className="flex justify-between p-1" key={item.product}>
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
                <p className="font-extralight text-sm">
                  ${Math.round(order?.taxPrice)}
                </p>
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
              <p>${Math.round(order?.totalPrice)}.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
