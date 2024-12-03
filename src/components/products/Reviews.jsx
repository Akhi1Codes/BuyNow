import React from "react";
import star from "../../assets/star.png";

const Reviews = (reviews) => {
  let datas = reviews?.reviews;
  return (
    <div>
      <div>
        <p className="font-bold text-gray-700 dark:text-gray-300 underline">
          Reviews
        </p>
        {datas?.map((data) => (
          <div className="flex justify-between ">
            <div className="px-2 py-1" key={data._id}>
              <p className="font-semibold ">{data.name}</p>
              <p className="font-light italic px-2">{data.comment}</p>
            </div>
            <div className="flex">
              {[...Array(data.rating)].map((index) => (
                <img className="h-3" src={star} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
