import { useState } from "react";
import MetaData from "../../utils/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const token = params.token;
  return { token };
}

const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useLoaderData();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, { data, isLoading, error }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await userData({
        token,
        password: password,
        confirmPassword: confirmPassword,
      }).unwrap();
      console.log(response);
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div>
      <MetaData title="Password Reset Page" content="Password Reset" />
      <div
        id="passwordReset-popup"
        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="relative p-4 w-full max-w-md md:h-auto">
          <div className="relative bg-[#1a1b25] rounded-lg shadow">
            <Link to="/login">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="#c6c7c7"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
                <span className="sr-only">Close popup</span>
              </button>
            </Link>

            <div className="p-5">
              <h3 className="text-2xl mb-0.5 font-medium"></h3>
              <p className="mb-4 text-sm font-normal text-white"></p>

              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-white">
                  Reset Password
                </p>
              </div>

              <form className="w-full py-6" onSubmit={submitHandler}>
                <label htmlFor="password" className="sr-only">
                  Enter new password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required=""
                  className="block w-full my-4  rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirm-password" className="sr-only">
                  Enter new password
                </label>
                <input
                  name="confirm-password"
                  type="password"
                  required=""
                  className="block w-full my-4 rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/* <p className="text-xs text-green-600 font-semibold">
                  {data?.message}
                </p>
                {error && (
                  <p className="text-xs text-red-600 font-semibold">
                    {error?.data?.error}
                  </p>
                )}
                  */}

                <button
                  type="submit"
                  className="my-2  rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                  // disabled={isLoading}
                >
                  Verify --&gt;
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
