import React from 'react';
import {MdDelete} from "react-icons/md";
import {useGetAllUserQuery, useDeleteUserMutation} from "../../redux/api/authApi.js";

const Customers = () => {
    const {data, refetch} = useGetAllUserQuery();
    const [deleteUser] = useDeleteUserMutation()
    let users = data?.users;

    const handleDelete = async (_id) => {
        try {
            await deleteUser(_id).unwrap();
            refetch()
            console.log('Deleted Product:', _id);
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="m-4 border-[1px] border-white/15 rounded-lg">
            <div className="flex justify-between items-center p-2">
                <p className="text-xl font-semibold">Customer List</p>
            </div>
            <div
                className="grid grid-cols-5 gap-4 p-2 text-sm font-extralight border-y-[1px] items-center justify-items-center">
                <p>Customer Name</p>
                <p>Email</p>
                <p>Role</p>
                <p>Customer Details</p>
                <p>Remove</p>
            </div>
            {
                users && users.map((user) => (
                    <div
                        className="grid grid-cols-5 gap-4 p-2 items-center justify-items-center border-b-[1px] border-white/15"
                        key={user._id}>
                        <div className="flex justify-between items-center gap-2 w-full">
                            <img src={user.avatar.url} alt={user.name}
                                 className="w-[30%] h-[30%] hidden md:block"/>
                            <p className="text-sm md:text-base w-full max-w-[200px] truncate">{user.name}</p>
                        </div>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px] truncate">{user.email}</p>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px] truncate">{user.role}</p>
                        <p className=" cursor-pointer">Details</p>
                        <MdDelete className="text-red-500 cursor-pointer" onClick={() => handleDelete(user._id)}/>
                    </div>
                ))
            }
        </div>
    );
};

export default Customers;