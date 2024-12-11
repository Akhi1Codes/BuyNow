const OrderStatus = ({ currentStep }) => {
  const getStepStyle = (step) => {
    return step <= currentStep
      ? "text-[#f2cc8f] font-semibold"
      : "text-gray-500 font-semibold";
  };

  const getLineStyle = (step) => {
    return step < currentStep ? "bg-[#f2cc8f]" : "bg-gray-500";
  };

  return (
    <div className="flex justify-between items-center gap-4 m-5">
      <p className={`${getStepStyle(1)} text-nowrap text-sm`}>Your Cart</p>
      <div className={`flex-1 w-10 h-1 ${getLineStyle(1)}`}></div>
      <p className={`${getStepStyle(2)} text-sm`}>Shipping</p>
      <div className={`flex-1 w-10 h-1 ${getLineStyle(2)}`}></div>
      <p className={`${getStepStyle(3)} text-nowrap text-sm`}>Confirm Order</p>
    </div>
  );
};

export default OrderStatus;
