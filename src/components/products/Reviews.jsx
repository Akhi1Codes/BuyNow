import React from "react";
import star from "../../assets/star.png";

const Reviews = (reviews) => {
  const datas = reviews?.reviews;
  return (
    <div>
      <div>
        <p className="font-bold text-gray-700 dark:text-gray-300 underline">
          Reviews
        </p>

        {datas?.length === 0 || !datas ? (
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          datas.map((data) => (
            <div className="md:flex md:justify-between" key={data._id}>
              <div className="px-2 py-1">
                <p className="font-semibold">{data.name}</p>
                <p className="font-light italic px-1 text-sm text-wrap">
                  {data.comment}
                </p>
              </div>
              <div className="flex px-2 py-2">
                {[...Array(data.rating)].map((_, index) => (
                  <img
                    className="h-3"
                    src={star}
                    key={index}
                    alt="rating star"
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
