import React, {useState} from "react";
import MetaData from "../../utils/MetaData";
import Loader from "../../components/Loader";
import star from "../../assets/star.png";
import Reviews from "../../components/products/Reviews";
import {useLoaderData, ScrollRestoration} from "react-router-dom";
import {useGetProductQuery} from "../../redux/api/productApi";

export async function loader({params}) {
    const id = params.id;
    return {id};
}

function ProductDetails() {
    const [instock, setInstock] = useState(false);
    const {id} = useLoaderData();
    const {data, isLoading} = useGetProductQuery(id);
    const productdetails = data?.product;
    const rating = Math.floor(productdetails?.ratings);
    const stock = Number(productdetails?.stock);
    if (stock <= 0) {
        setInstock(true);
    }
    return (
        <div>
            <MetaData
                title={`${productdetails?.name}`}
                content={`${productdetails?.description}`}
            />
            {isLoading ? (
                <Loader/>
            ) : (
                <div className="bg-gray-100 dark:bg-[#1a1b25] py-8 ">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[400px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={productdetails?.images[0].url}
                                        alt="Product Image"
                                    />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    <button
                                        className="w-full  text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                                        disabled={instock}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                    {productdetails?.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Brand : {productdetails?.seller}
                                </p>
                                <div className="flex items-center gap-1">
                                    {productdetails &&
                                        [...Array(rating)].map((_, index) => (
                                            <img
                                                className="h-4"
                                                src={star}
                                                key={`${index}-${rating}`}
                                            />
                                        ))}

                                    <p className="font-light italic px-2">
                                        - &#40;{productdetails?.ratings}&#41; rating
                                    </p>
                                </div>
                                <div className="flex mb-4">
                                    <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price:
                    </span>
                                        <span className="text-gray-600 dark:text-gray-300">
                      ${productdetails?.price}
                    </span>
                                    </div>
                                    <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:
                    </span>
                                        <span className="text-gray-600 dark:text-gray-300">
                      {productdetails && stock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                    </span>
                                    </div>
                                </div>
                                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Product Description:
                  </span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {productdetails?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Reviews reviews={productdetails?.reviews}/>
                    </div>
                </div>
            )}
            <ScrollRestoration/>
        </div>
    );
}

export default ProductDetails;
