import OrderStatus from "../../components/order/orderStatus";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAddress } from "../../redux/slices/authSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.authSlice);

  const [formState, setFormState] = useState({
    details: {
      address: userDetails.details.address || "",
      city: userDetails.details.city || "",
      postalCode: userDetails.details.postalCode || "",
      country: userDetails.details.country || "",
      phNumber: userDetails.details.phNumber || "",
    },
    selectedCountry: userDetails.details.selectedCountry || "",
    taxAndShipping: { tax: 0, shipping: 0 },
  });

  const countriesData = {
    "United States": { tax: 10, shipping: 20 },
    Canada: { tax: 12, shipping: 25 },
    India: { tax: 5, shipping: 15 },
    // Add more countries as needed
  };

  // Generic change handler for all input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      details: {
        ...prevState.details,
        [name]: value, // Update specific detail dynamically
      },
    }));
  };

  // Handler for country selection
  const handleSelect = (event) => {
    const country = event.target.value;
    setFormState((prevState) => ({
      ...prevState,
      selectedCountry: country,
      details: {
        ...prevState.details,
        country, // Update the country in details
      },
      taxAndShipping: countriesData[country] || { tax: 0, shipping: 0 },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setAddress(formState));
    navigate("/confirm-order");
  };

  return (
    <div>
      <div className="flex justify-center items-center ">
        <OrderStatus currentStep={2} />
      </div>
      <div className="flex justify-center  p-2 mb-4 ">
        <div>
          <p className="font-bold text-3xl text-center mb-6">
            Shipping Address
          </p>
          <form
            className="flex flex-col md:flex-row gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-white"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    name="address"
                    autoComplete="address"
                    value={formState.details.address}
                    onChange={handleChange}
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-white"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    name="city"
                    autoComplete="city"
                    value={formState.details.city}
                    onChange={handleChange}
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-white"
                >
                  PostalCode
                </label>
                <div className="mt-1">
                  <input
                    name="postalCode"
                    type="number"
                    autoComplete="postal-code"
                    value={formState.details.postalCode}
                    onChange={handleChange}
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="phNumber"
                  className="block text-sm font-medium text-white"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    name="phNumber"
                    type="number"
                    value={formState.details.phNumber}
                    onChange={handleChange}
                    autoComplete="mobile tel-national"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-white"
                >
                  Select a Country
                </label>
                <select
                  id="country"
                  value={formState.selectedCountry}
                  onChange={handleSelect}
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose a country
                  </option>
                  {Object.keys(countriesData).map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#f2cc8f] text-black py-2 px-6 rounded-md mt-6"
                >
                  Proceed
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
