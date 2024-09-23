import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="flex space-x-2 justify-center items-center bg-[#1a1b25] h-screen ">
        <span className="sr-only">Loading...</span>
        <div className="h-6 w-6 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-6 w-6 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-6 w-6 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
