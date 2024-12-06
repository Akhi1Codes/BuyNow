import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ProductDetails, {
  loader as productLoader,
} from "./pages/product/ProductDetails";
import Root from "./pages/root";
import Login from "./pages/user/Login";
import Register from "./pages/user/register";
import PasswordForgot from "./pages/user/passwordForgot";
// import PasswordReset, {
//   loader as passwordResetLoader,
// } from "./pages/user/passwordReset";
import Profile from "./pages/user/profile";
import Cart from "./pages/user/cart";
// import AdminPortal from "./pages/admin/adminPortal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        loader: productLoader,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <PasswordForgot />,
  },
  // {
  //   path: "/password/reset/:token",
  //   element: <PasswordReset />,
  //   loader: passwordResetLoader,
  // },
  // {
  //   path: "/adminportal",
  //   element: <AdminPortal />,
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
