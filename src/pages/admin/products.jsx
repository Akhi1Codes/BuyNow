import {useGetAllProductQuery, useDeleteProductMutation} from "../../redux/api/productApi.js";
import ProductModal from "../../components/admin/NewProductModel.jsx";
import {MdDelete} from "react-icons/md";
import {useState} from "react";

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data, refetch} = useGetAllProductQuery("");
    const [deleteProduct] = useDeleteProductMutation()
    let products = data?.products;

    const handleDelete = async (_id) => {
        try {
            await deleteProduct(_id).unwrap();
            refetch()
            console.log('Deleted Product:', _id);
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="m-4 border-[1px] border-white/15 rounded-lg">
            <div>
                <div className="flex justify-between items-center p-2">
                    <p className="text-xl font-semibold">Product List</p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => setIsModalOpen(!isModalOpen)}>{isModalOpen ? "Close" : "New Product"}
                    </button>
                </div>
                {isModalOpen &&
                    <ProductModal close={closeModal}/>}
            </div>

            <div
                className="grid grid-cols-5 gap-4 p-2 text-sm font-extralight border-y-[1px] items-center justify-items-center">
                <p>Product Name</p>
                <p>Stock</p>
                <p>Price</p>
                <p>Product Details</p>
                <p>Delete</p>
            </div>
            {
                products && products.map((product) => (
                    <div
                        className="grid grid-cols-5 gap-4 p-2 items-center justify-items-center border-b-[1px] border-white/15"
                        key={product._id}>
                        <div className="flex justify-between items-center gap-2 w-full">
                            <img src={product.images[0].url} alt={product.name}
                                 className="w-[30%] h-[30%] hidden md:block"/>
                            <p className="text-sm md:text-base w-full max-w-[200px] truncate">{product.name}</p>
                        </div>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px] truncate">{product.stock}</p>
                        <p className="text-sm md:text-base text-center w-full max-w-[150px] truncate">{product.price}</p>
                        <p className=" cursor-pointer">Details</p>
                        <MdDelete className="text-red-500 cursor-pointer" onClick={() => handleDelete(product._id)}/>
                    </div>
                ))
            }
        </div>
    );
};

export default Products;
