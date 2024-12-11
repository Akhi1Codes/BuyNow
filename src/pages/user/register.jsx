import { useState } from "react";
import MetaData from "../../utils/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../../redux/api/authApi";
import image from "../../assets/defaultimage.png";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(image);

  const [register, { isLoading, error }] = useUserRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        name: username,
        email,
        password,
        avatar,
      }).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <MetaData title="Registration Page" content="Register" />
      <div className=" bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-[#1a1b25] shadow-md rounded-md p-6 relative">
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
            <h2 className="my-3 text-center text-2xl md:text-3xl font-bold tracking-tight text-white">
              Sign up for an account
            </h2>

            <form onSubmit={submitHandler} className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-white"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    name="username"
                    value={username}
                    onChange={onChange}
                    type="username"
                    autoComplete="name"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="email-address"
                    value={email}
                    onChange={onChange}
                    autoComplete="email"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="my-2">
                <label
                  htmlFor="avatar_upload"
                  className="block text-sm font-medium text-white"
                >
                  Avatar
                </label>
                <div className="flex justify-around items-center flex-col md:flex-row">
                  <div>
                    <figure>
                      <img
                        src={avatarPreview}
                        alt="Avatar_preview"
                        width={60}
                        className="rounded-full h-[65px] "
                      />
                    </figure>
                  </div>
                  <div className="customFile">
                    <input
                      type="file"
                      name="avatar"
                      id="customFile"
                      accept="images/*"
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
              </div>
              {error ? (
                <p className="text-red-600 text-sm">Please choose an image</p>
              ) : (
                ""
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                  disabled={isLoading}
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
