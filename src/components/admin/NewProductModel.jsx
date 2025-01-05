import React, {useState} from 'react';

const ProductModal = () => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        images: [],
        category: '',
        seller: '',
        stock: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.name === "images") {
            const files = e.target.files;
            const updatedImages = Array.from(files).map((file) => {
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            resolve(reader.result);
                        }
                    };
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(updatedImages).then((imagePreviews) => {
                setProductData({
                    ...productData,
                    images: [...productData.images, ...imagePreviews],
                });
            });
        }
    };


    const handleRemoveImage = (index) => {
        const newImages = productData.images.filter((_, imgIndex) => imgIndex !== index); // Remove the image at the specified index
        setProductData({
            ...productData,
            images: newImages,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would typically handle the product submission to your API
        console.log('Submitting Product:', productData);
    };

    // List of categories for dropdown
    const categories = [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Books",
        "Beauty",
        "Sports",
        "Toys",
        "Automotive",
    ];

    return (
        <div className="bg-opacity-50 ">
            <div className="px-4 mb-6 rounded-lg">
                <form onSubmit={handleSubmit}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                    <div className="mb-2 flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            className="p-1 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            className="p-1 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            className="p-1 border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={productData.stock}
                            onChange={handleChange}
                            className="p-1 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="seller">Seller</label>
                        <input
                            type="text"
                            id="seller"
                            name="seller"
                            value={productData.seller}
                            onChange={handleChange}
                            className="p-1 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            className="p-1 border rounded"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="images">Upload Product Images</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            className="p-1 border rounded"
                        />
                    </div>

                    {productData.images.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium mb-2">Image Preview:</h3>
                            <div className="flex space-x-2">
                                {productData.images.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={img}
                                            alt={`Uploaded Image ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs p-1"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center mt-5">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded w-auto"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
