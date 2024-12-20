import { Link } from "react-router-dom";
import { useUserOrdersQuery } from "../../redux/api/orderApi";
import Loader from "../../components/Loader";

const Orders = () => {
  const { data, isLoading } = useUserOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center p-2 mb-4">
      <div className="md:w-[50%]">
        <p className="font-bold text-3xl text-center m-4">Your Orders</p>
        <div className="py-4">
          {data?.orders.map((order) => (
            <div key={order._id} className="p-4 border rounded-lg mb-2">
              <div className="flex justify-between">
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="p-1 text-[#f2cc8f] rounded-lg text-sm font-semibold">
                  {order.orderStatus}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="my-1">
                    <p className="text-sm">Items:</p>
                    {order?.orderItems.map((item) => (
                      <p key={item._id} className="text-xs font-light pl-2">
                        {item.name}
                      </p>
                    ))}
                  </div>
                  <p className="font-bold">${order.totalPrice}</p>
                </div>
                <Link to={`/order-details/${order._id}`}>
                  <button className="bg-[#f2cc8f] text-black rounded-md mt-auto">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
