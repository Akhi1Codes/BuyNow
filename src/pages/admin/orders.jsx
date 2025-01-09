import React from 'react';
import {useGetAllOrdersQuery} from "../../redux/api/orderApi.js";
import {useGetUserByIDQuery} from "../../redux/api/authApi.js";

const AllOrders = () => {
    const {data, refetch} = useGetAllOrdersQuery();
    const orders = data?.orders
    console.log(orders)

    // const getName = (id) => {
    //     const {userData} = useGetUserByIDQuery(id);
    //     console.log(userData)
    // }

    return (
        <div className="m-4 border-[1px] border-white/15 rounded-lg">
            <div className="flex justify-between items-center p-2">
                <p className="text-xl font-semibold">Customer List</p>
            </div>
            <div
                className="grid grid-cols-5 gap-4 p-2 text-sm font-extralight border-y-[1px] items-center justify-items-center">
                <p>Order Id</p>
                <p>Name</p>
                <p>Items</p>
                <p>Payment</p>
                <p>Order Status</p>
            </div>
            {
                orders && orders.map((order) => (
                    <div
                        className="grid grid-cols-5 gap-4 p-2 items-center justify-items-center border-b-[1px] border-white/15"
                        key={order._id}>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px] truncate">{order._id}</p>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px] truncate">{order.userName}</p>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px]">{order.paymentInfo.status}</p>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px]">{order.orderStatus}</p>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px]">Details</p>
                    </div>
                ))
            }
        </div>
    );
};

export default AllOrders;