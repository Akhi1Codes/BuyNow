import OrderStatus from "../../components/order/orderStatus";

const ConfirmOrder = () => {
  return (
    <div>
      <div className="flex justify-center items-center ">
        <OrderStatus currentStep={2} />
      </div>
      <div>ConfirmOrder</div>
    </div>
  );
};

export default ConfirmOrder;
