import OrderStatus from "../../components/order/orderStatus";
import { useState } from "react";

const Shipping = () => {
  const countriesData = {
    "United States": { tax: 10, shipping: 20 },
    Canada: { tax: 12, shipping: 25 },
    "United Kingdom": { tax: 15, shipping: 30 },
    Australia: { tax: 10, shipping: 35 },
    India: { tax: 5, shipping: 15 },
    Germany: { tax: 18, shipping: 28 },
    France: { tax: 15, shipping: 26 },
    China: { tax: 8, shipping: 20 },
    Japan: { tax: 10, shipping: 25 },
    Brazil: { tax: 20, shipping: 40 },
    // Add more countries as needed
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [taxAndShipping, setTaxAndShipping] = useState({ tax: 0, shipping: 0 });

  const handleSelect = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setTaxAndShipping(countriesData[country] || { tax: 0, shipping: 0 });
  };

  return (
    <div>
      <div className="flex justify-center items-center ">
        <OrderStatus currentStep={2} />
      </div>
      <div className="flex justify-center  p-2 mb-4 ">
        <div className="md:w-[50%]">
          <p className="font-bold text-3xl text-center mb-6">
            Shipping Address
          </p>
          <form className="flex flex-col gap-4">
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
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

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
                value={selectedCountry}
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
                className="w-full bg-[#f2cc8f] text-white py-2 px-6 rounded-md"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
