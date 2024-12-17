import { Link } from "react-router-dom";
import { useUserOrdersQuery } from "../../redux/api/orderApi";
import Loader from "../../components/Loader";

const Orders = () => {
  const { data, isLoading, error } = useUserOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {data?.length === 0 ? (
        <div className="flex justify-center p-2 mb-4">
          <div className="md:w-[50%]">
            <p className="font-bold text-3xl text-center m-4">Your Orders</p>
            <div className="text-center py-8">
              <p className="text-lg font-semibold">
                You have not placed any orders
              </p>
              <p className="text-sm text-gray-600">
                Oops! No orders yet—let's change that!
              </p>
              <Link to={"/"}>
                <p>Let's shop!</p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
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
                          <p className="text-xs font-light pl-2">{item.name}</p>
                        ))}
                      </div>
                      <p className="font-bold">${order.totalPrice}</p>
                    </div>
                    <button className="bg-[#f2cc8f] text-black rounded-md mt-auto">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
